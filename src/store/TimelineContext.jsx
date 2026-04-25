import { createContext, useContext, useMemo, useState } from "react";

const TimelineContext = createContext(null);
const STORAGE_KEY = "keenkeeper-timeline-entries";

const getInitialEntries = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const TimelineProvider = ({ children }) => {
  const [entries, setEntries] = useState(getInitialEntries);

  const addEntry = ({ type, friendName }) => {
    const now = new Date();
    const newEntry = {
      id: crypto.randomUUID(),
      type,
      friendName,
      title: `${type} with ${friendName}`,
      date: now.toISOString(),
    };
    setEntries((prev) => {
      const updated = [newEntry, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const value = useMemo(() => ({ entries, addEntry }), [entries]);
  return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>;
};

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeline must be used inside TimelineProvider");
  }
  return context;
};
