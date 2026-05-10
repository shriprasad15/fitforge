import {
  doc, setDoc, getDoc, collection, query, onSnapshot, orderBy,
  Unsubscribe
} from 'firebase/firestore';
import { getFirebaseDb } from './config';
import { GymSession, SwimLog, HIITSession, DailyMealLog, DailyHealthLog, WeighIn, UserProfile } from '../types';

function userDoc(uid: string, ...path: string[]) {
  return doc(getFirebaseDb(), 'users', uid, ...path);
}

function userCollection(uid: string, ...path: string[]) {
  return collection(getFirebaseDb(), 'users', uid, ...path);
}

export async function saveProfile(uid: string, profile: Partial<UserProfile>): Promise<void> {
  await setDoc(userDoc(uid, 'profile', 'main'), profile, { merge: true });
}

export async function getProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(userDoc(uid, 'profile', 'main'));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function saveGymSession(uid: string, session: GymSession): Promise<void> {
  await setDoc(userDoc(uid, 'sessions', session.date, 'gym', 'data'), session);
}

export async function saveSwimLog(uid: string, log: SwimLog): Promise<void> {
  await setDoc(userDoc(uid, 'sessions', log.date, 'swim', 'data'), log);
}

export async function saveHIITSession(uid: string, session: HIITSession): Promise<void> {
  await setDoc(userDoc(uid, 'sessions', session.date, 'hiit', 'data'), session);
}

export async function saveDailyMealLog(uid: string, log: DailyMealLog): Promise<void> {
  await setDoc(userDoc(uid, 'dailyLog', log.date, 'meals', 'data'), log);
}

export async function saveDailyHealthLog(uid: string, log: DailyHealthLog): Promise<void> {
  await setDoc(userDoc(uid, 'dailyLog', log.date, 'health', 'data'), log);
}

export async function saveWeighIn(uid: string, weighIn: WeighIn): Promise<void> {
  await setDoc(userDoc(uid, 'progress', 'weighIns', 'entries', weighIn.date), weighIn);
}

export function subscribeToGymSession(uid: string, date: string, callback: (session: GymSession | null) => void): Unsubscribe {
  return onSnapshot(userDoc(uid, 'sessions', date, 'gym', 'data'), (snap) => {
    callback(snap.exists() ? (snap.data() as GymSession) : null);
  });
}

export function subscribeToProgress(uid: string, callback: (weighIns: WeighIn[]) => void): Unsubscribe {
  const q = query(userCollection(uid, 'progress', 'weighIns', 'entries'), orderBy('date', 'asc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => d.data() as WeighIn));
  });
}

export function subscribeToDailyHealth(uid: string, date: string, callback: (log: DailyHealthLog | null) => void): Unsubscribe {
  return onSnapshot(userDoc(uid, 'dailyLog', date, 'health', 'data'), (snap) => {
    callback(snap.exists() ? (snap.data() as DailyHealthLog) : null);
  });
}
