import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Session {
  id: number;
  duration: number;
  timestamp: string; // ISO String
}

export interface DailyStat {
  date: string;       // e.g., "2026-06-09"
  lastSession: Session | null;
  bestSession: Session | null;
}

/**
 * Retrieves all raw sessions from storage
 */
export async function getSessions(): Promise<Session[]> {
  try {
    const existing = await AsyncStorage.getItem('sessions');
    return existing ? JSON.parse(existing) : [];
  } catch (error) {
    console.error('Error reading sessions:', error);
    return [];
  }
}

/**
 * Saves a new session
 */
export async function saveSession(seconds: number): Promise<void> {
  try {
    const existing = await AsyncStorage.getItem('sessions');
    const sessions: Session[] = existing ? JSON.parse(existing) : [];

    sessions.push({
      id: Date.now(),
      duration: seconds,
      timestamp: new Date().toISOString(),
    });

    await AsyncStorage.setItem('sessions', JSON.stringify(sessions));
  } catch (error) {
    console.error('Error saving session:', error);
  }
}

/**
 * Groups all sessions by date and calculates the 
 * Last Session and Best Session for each day.
 */
export async function getDailyStats(): Promise<DailyStat[]> {
  const sessions = await getSessions();
  const statsMap: { [dateStr: string]: Session[] } = {};

  sessions.forEach(session => {
    // FIX: Convert the UTC timestamp string back into a local Date object
    const d = new Date(session.timestamp);
    
    // Extract local year, month, and day instead of parsing the raw UTC string
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const localDateStr = `${year}-${month}-${day}`;
    
    if (!statsMap[localDateStr]) {
      statsMap[localDateStr] = [];
    }
    statsMap[localDateStr].push(session);
  });

  const dailyStats: DailyStat[] = Object.keys(statsMap).map(dateStr => {
    const daySessions = statsMap[dateStr];

    const lastSession = daySessions.reduce((latest, current) => 
      current.id > latest.id ? current : latest
    , daySessions[0]);

    const bestSession = daySessions.reduce((longest, current) => 
      current.duration > longest.duration ? current : longest
    , daySessions[0]);

    return {
      date: dateStr,
      lastSession,
      bestSession
    };
  });

  return dailyStats.sort((a, b) => b.date.localeCompare(a.date));
}