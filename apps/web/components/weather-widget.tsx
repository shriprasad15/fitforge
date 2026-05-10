'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  weatherCode: number;
}

function getWeatherLabel(code: number): string {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 48) return 'Fog';
  if (code <= 57) return 'Drizzle';
  if (code <= 65) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Rain showers';
  if (code <= 86) return 'Snow showers';
  return 'Thunderstorm';
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=12.99&longitude=80.23&current=temperature_2m,weather_code&timezone=Asia/Kolkata'
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temperature: data.current.temperature_2m,
          weatherCode: data.current.weather_code,
        });
      })
      .catch(() => setError(true));
  }, []);

  if (error) return null;
  if (!weather) {
    return (
      <div className="bg-bg-card rounded-xl p-3 border border-white/5 animate-pulse">
        <div className="h-4 bg-bg-elevated rounded w-24" />
      </div>
    );
  }

  const isRainy = weather.weatherCode >= 51;

  return (
    <div className="bg-bg-card rounded-xl p-3 border border-white/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-primary font-medium">{weather.temperature}°C</p>
          <p className="text-xs text-text-secondary">{getWeatherLabel(weather.weatherCode)}</p>
        </div>
        <div className={`text-xs px-2 py-1 rounded-md ${isRainy ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'}`}>
          {isRainy ? 'Indoor HIIT recommended' : 'Good for outdoor'}
        </div>
      </div>
    </div>
  );
}
