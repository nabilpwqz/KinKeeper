import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FriendsContext = createContext(null);
const STORAGE_KEY = "keenkeeper-friends";

const computeStatus = (daysSinceContact, goal) => {
  if (daysSinceContact > goal) return "overdue";
  if (daysSinceContact >= Math.max(goal - 3, 1)) return "almost due";
  return "on-track";
};

const toDateInputValue = (date) => date.toISOString().split("T")[0];

export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFriends(JSON.parse(stored));
          return;
        }

        const response = await fetch("/data/friends.json");
        if (!response.ok) {
          throw new Error("Could not fetch friends data.");
        }
        const data = await response.json();
        const initial = data.map((friend) => ({ ...friend, archived: false }));
        setFriends(initial);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      } catch {
        setError("Unable to load friends right now. Please refresh and try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const updateAndPersist = (updater) => {
    setFriends((prev) => {
      const next = updater(prev);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const addFriend = ({ name, email, tags }) => {
    const now = new Date();
    const newFriend = {
      id: Date.now(),
      name,
      picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=d1fae5&color=065f46&size=256`,
      email,
      days_since_contact: 0,
      status: "on-track",
      tags,
      bio: "New friend added from your dashboard.",
      goal: 14,
      next_due_date: toDateInputValue(new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)),
      archived: false,
    };

    updateAndPersist((prev) => [newFriend, ...prev]);
    return newFriend;
  };

  const updateGoal = (friendId, nextGoal) => {
    updateAndPersist((prev) =>
      prev.map((friend) =>
        friend.id !== friendId
          ? friend
          : {
              ...friend,
              goal: nextGoal,
              status: computeStatus(friend.days_since_contact, nextGoal),
            }
      )
    );
  };

  const snoozeTwoWeeks = (friendId) => {
    updateAndPersist((prev) =>
      prev.map((friend) => {
        if (friend.id !== friendId) return friend;
        const now = new Date();
        const nextDue = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
        return {
          ...friend,
          days_since_contact: 0,
          next_due_date: toDateInputValue(nextDue),
          status: computeStatus(0, friend.goal),
        };
      })
    );
  };

  const archiveFriend = (friendId) => {
    updateAndPersist((prev) => prev.map((friend) => (friend.id === friendId ? { ...friend, archived: true } : friend)));
  };

  const deleteFriend = (friendId) => {
    updateAndPersist((prev) => prev.filter((friend) => friend.id !== friendId));
  };

  const value = useMemo(
    () => ({ friends, loading, error, addFriend, updateGoal, snoozeTwoWeeks, archiveFriend, deleteFriend }),
    [friends, loading, error]
  );

  return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
};

export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error("useFriends must be used inside FriendsProvider");
  }
  return context;
};
