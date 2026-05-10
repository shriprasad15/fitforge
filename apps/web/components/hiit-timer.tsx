'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { HIITProtocol, TimerState, HIITInterval } from '@fitforge/shared';

interface HIITTimerProps {
  protocol: HIITProtocol;
  rounds: number;
}

type TimerPhase = 'warmup' | 'interval' | 'cooldown';

export function HIITTimer({ protocol, rounds }: HIITTimerProps) {
  const [state, setState] = useState<TimerState>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [intervalIndex, setIntervalIndex] = useState(0);
  const [phase, setPhase] = useState<TimerPhase>('warmup');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const playBeep = useCallback((freq: number, duration: number) => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.value = 0.3;
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not available
    }
  }, [getAudioContext]);

  const getCurrentIntervalLabel = (): string => {
    if (phase === 'warmup') return 'Warm Up';
    if (phase === 'cooldown') return 'Cool Down';
    return protocol.intervals[intervalIndex]?.name || '';
  };

  const getCurrentIntervalType = (): 'work' | 'rest' | null => {
    if (phase === 'warmup' || phase === 'cooldown') return null;
    return protocol.intervals[intervalIndex]?.type || null;
  };

  const start = () => {
    setState('running');
    setPhase('warmup');
    setTimeLeft(protocol.warmup);
    setCurrentRound(1);
    setIntervalIndex(0);
  };

  const pause = () => setState('paused');
  const resume = () => setState('running');

  const reset = () => {
    setState('idle');
    setTimeLeft(0);
    setCurrentRound(1);
    setIntervalIndex(0);
    setPhase('warmup');
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const advancePhase = useCallback(() => {
    if (phase === 'warmup') {
      // Move to first interval
      setPhase('interval');
      setIntervalIndex(0);
      setTimeLeft(protocol.intervals[0].duration);
      return;
    }

    if (phase === 'interval') {
      const nextIdx = intervalIndex + 1;
      if (nextIdx < protocol.intervals.length) {
        // Next interval in current round
        setIntervalIndex(nextIdx);
        setTimeLeft(protocol.intervals[nextIdx].duration);
      } else {
        // Round finished
        if (currentRound < rounds) {
          // Next round
          setCurrentRound((r) => r + 1);
          setIntervalIndex(0);
          setTimeLeft(protocol.intervals[0].duration);
        } else {
          // All rounds done, cooldown
          setPhase('cooldown');
          setTimeLeft(protocol.cooldown);
        }
      }
      return;
    }

    if (phase === 'cooldown') {
      setState('completed');
    }
  }, [phase, intervalIndex, currentRound, rounds, protocol]);

  useEffect(() => {
    if (state !== 'running') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          advancePhase();
          return 0;
        }
        // Countdown beeps
        if (prev === 4 || prev === 3 || prev === 2) {
          playBeep(660, 0.15);
        }
        if (prev === 1) {
          playBeep(880, 0.3);
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state, advancePhase, playBeep]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const intervalType = getCurrentIntervalType();

  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="text-center">
        <p className="text-text-muted text-xs uppercase tracking-wider">
          {state === 'idle' && 'Ready'}
          {state === 'running' && getCurrentIntervalLabel()}
          {state === 'paused' && 'Paused'}
          {state === 'completed' && 'Complete!'}
        </p>
        {state === 'running' && intervalType && (
          <p className={`text-xs mt-1 font-medium ${intervalType === 'work' ? 'text-accent-coral' : 'text-accent-teal'}`}>
            {intervalType === 'work' ? 'WORK' : 'REST'}
          </p>
        )}
      </div>

      {/* Timer Display */}
      <div className="text-center">
        <p className={`text-7xl font-bold font-mono tabular-nums ${
          state === 'completed' ? 'text-success' :
          intervalType === 'work' ? 'text-accent-coral' :
          intervalType === 'rest' ? 'text-accent-teal' :
          'text-text-primary'
        }`}>
          {formatTime(timeLeft)}
        </p>
      </div>

      {/* Round Counter */}
      {state !== 'idle' && state !== 'completed' && (
        <div className="text-center">
          <p className="text-text-secondary text-sm">
            Round <span className="text-text-primary font-bold">{currentRound}</span> / {rounds}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {state === 'idle' && (
          <button
            onClick={start}
            className="bg-accent-coral hover:bg-accent-coral/90 text-white font-medium py-3 px-8 rounded-xl transition-colors"
          >
            Start
          </button>
        )}
        {state === 'running' && (
          <button
            onClick={pause}
            className="bg-accent-gold hover:bg-accent-gold/90 text-bg-primary font-medium py-3 px-8 rounded-xl transition-colors"
          >
            Pause
          </button>
        )}
        {state === 'paused' && (
          <>
            <button
              onClick={resume}
              className="bg-accent-teal hover:bg-accent-teal/90 text-bg-primary font-medium py-3 px-8 rounded-xl transition-colors"
            >
              Resume
            </button>
            <button
              onClick={reset}
              className="bg-bg-elevated hover:bg-bg-elevated/80 text-text-secondary font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Reset
            </button>
          </>
        )}
        {state === 'completed' && (
          <button
            onClick={reset}
            className="bg-bg-elevated hover:bg-bg-elevated/80 text-text-secondary font-medium py-3 px-8 rounded-xl transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
