import { PlusCircle, Users, AlertTriangle, Clock3, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { useMemo } from "react";
import FriendCard from "../components/FriendCard";
import { useFriends } from "../store/FriendsContext";
import { useTimeline } from "../store/TimelineContext";

export default function HomePage() {
  const { friends, loading, error, addFriend } = useFriends();
  const { entries } = useTimeline();

  const visibleFriends = useMemo(() => friends.filter((friend) => !friend.archived), [friends]);

  const summary = useMemo(() => {
    const overdue = visibleFriends.filter((f) => f.status === "overdue").length;
    const almostDue = visibleFriends.filter((f) => f.status === "almost due").length;
    const onTrack = visibleFriends.filter((f) => f.status === "on-track").length;
    const interactionsThisMonth = entries.filter((entry) => {
      const now = new Date();
      const date = new Date(entry.date);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    return [
      { title: "Total Friends", value: visibleFriends.length, icon: Users, color: "text-emerald-600" },
      { title: "On Track", value: onTrack, icon: CheckCircle2, color: "text-emerald-600" },
      { title: "Need Attention", value: overdue + almostDue, icon: AlertTriangle, color: "text-rose-600" },
      { title: "Interactions This Month", value: interactionsThisMonth, icon: Clock3, color: "text-teal-600" },
    ];
  }, [visibleFriends, entries]);

  const handleAddFriend = () => {
    const name = window.prompt("Friend name:");
    if (!name) return;

    const email = window.prompt("Friend email:");
    if (!email) return;

    const tagsInput = window.prompt("Tags (comma separated):", "new friend");
    const tags = tagsInput
      ? tagsInput
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : ["new friend"];

    addFriend({ name: name.trim(), email: email.trim(), tags });
    toast.success(`${name.trim()} added to your friends list.`);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-3xl bg-linear-to-br from-emerald-700 via-teal-700 to-green-700 px-6 py-12 text-center text-white shadow-xl md:px-10">
        <h1 className="text-3xl font-extrabold md:text-5xl">Friends to keep close in your life</h1>
        <p className="mx-auto mt-3 max-w-2xl text-emerald-100">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button
          onClick={handleAddFriend}
          className="mx-auto mt-6 flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-semibold text-emerald-700 shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-50"
        >
          <PlusCircle className="h-4 w-4" />
          Add a Friend
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map(({ title, value, icon: Icon, color }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm text-slate-500">{title}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-2xl font-extrabold">{value}</span>
              <Icon className={`h-6 w-6 ${color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Your Friends</h2>
        {loading ? (
          <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white shadow-sm">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 shadow-sm">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {visibleFriends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
