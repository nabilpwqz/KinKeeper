import { Archive, CalendarClock, Clock3, Mail, Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFriends } from "../store/FriendsContext";
import { useTimeline } from "../store/TimelineContext";
import { formatDate, statusStyles } from "../utils/helpers";
import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";

const checkInButtons = [
  { type: "Call", asset: callIcon },
  { type: "Text", asset: textIcon },
  { type: "Video", asset: videoIcon },
];

export default function FriendDetailsPage() {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();
  const { friends, loading: isLoading, error, updateGoal, snoozeTwoWeeks, archiveFriend, deleteFriend } = useFriends();
  const friend = useMemo(() => friends.find((item) => item.id === Number(friendId)), [friends, friendId]);

  useEffect(() => {
    if (!isLoading && !error && (!friend || friend.archived)) {
      navigate("/not-found", { replace: true });
    }
  }, [isLoading, error, friend, navigate]);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">{error}</div>
      </section>
    );
  }

  if (!friend || friend.archived) {
    return null;
  }

  const handleCheckIn = (type) => {
    addEntry({ type, friendName: friend.name });
    toast.success(`${type} logged for ${friend.name}`);
  };

  const handleSnooze = () => {
    snoozeTwoWeeks(friend.id);
    toast.success(`${friend.name} snoozed for 2 weeks.`);
  };

  const handleArchive = () => {
    archiveFriend(friend.id);
    toast.success(`${friend.name} archived.`);
    navigate("/", { replace: true });
  };

  const handleDelete = () => {
    const confirmed = window.confirm(`Delete ${friend.name} permanently?`);
    if (!confirmed) return;
    deleteFriend(friend.id);
    toast.success(`${friend.name} deleted.`);
    navigate("/", { replace: true });
  };

  const handleEditGoal = () => {
    const nextGoalInput = window.prompt("Set a new contact goal in days:", String(friend.goal));
    if (!nextGoalInput) return;
    const parsed = Number(nextGoalInput);
    if (!Number.isInteger(parsed) || parsed < 1) {
      toast.error("Please enter a valid number of days.");
      return;
    }
    updateGoal(friend.id, parsed);
    toast.success(`Goal updated to every ${parsed} days.`);
  };

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 lg:grid-cols-3">
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
        <img src={friend.picture} alt={friend.name} className="h-24 w-24 rounded-full border-4 border-emerald-50 object-cover" />
        <h1 className="mt-4 text-2xl font-extrabold">{friend.name}</h1>
        <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${statusStyles[friend.status]}`}>
          {friend.status}
        </span>
        <div className="mt-4 flex flex-wrap gap-2">
          {friend.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">{friend.bio}</p>
        <p className="mt-3 flex items-start gap-2 break-all text-sm text-slate-700">
          <Mail className="h-4 w-4 shrink-0" />
          Preferred: {friend.email}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-2">
          <button
            onClick={handleSnooze}
            className="rounded-lg border border-slate-200 px-3 py-2 text-left text-sm font-semibold transition hover:bg-slate-50"
          >
            <Clock3 className="mr-2 inline h-4 w-4" />
            Snooze 2 Weeks
          </button>
          <button
            onClick={handleArchive}
            className="rounded-lg border border-slate-200 px-3 py-2 text-left text-sm font-semibold transition hover:bg-slate-50"
          >
            <Archive className="mr-2 inline h-4 w-4" />
            Archive
          </button>
          <button
            onClick={handleDelete}
            className="rounded-lg border border-red-200 px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <Trash2 className="mr-2 inline h-4 w-4" />
            Delete
          </button>
        </div>
      </article>

      <div className="space-y-4 lg:col-span-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Days Since Contact</p>
            <p className="mt-1 text-2xl font-extrabold">{friend.days_since_contact}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Goal (Days)</p>
            <p className="mt-1 text-2xl font-extrabold">{friend.goal}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Next Due</p>
            <p className="mt-1 text-lg font-extrabold">{formatDate(friend.next_due_date)}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Relationship Goal</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-extrabold">Connect every {friend.goal} days</h2>
            <button
              onClick={handleEditGoal}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold transition hover:bg-slate-50"
            >
              <Pencil className="mr-1 inline h-4 w-4" />
              Edit
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Quick Check-In</h2>
          <p className="mt-1 text-sm text-slate-500">Log an interaction and keep your timeline updated instantly.</p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {checkInButtons.map(({ type, asset }) => (
              <button
                key={type}
                onClick={() => handleCheckIn(type)}
                className="rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:from-emerald-700 hover:to-teal-700"
              >
                <img src={asset} alt={`${type} icon`} className="mr-2 inline h-4 w-4" />
                {type}
              </button>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <CalendarClock className="h-4 w-4" />
            Logs interaction using today&apos;s date.
          </p>
        </div>
      </div>
    </section>
  );
}
