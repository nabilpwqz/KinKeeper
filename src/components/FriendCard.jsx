import { Link } from "react-router-dom";
import { statusStyles } from "../utils/helpers";

export default function FriendCard({ friend }) {
  const statusLabel = friend.status === "on-track" ? "On-Track" : friend.status === "almost due" ? "Almost Due" : "Overdue";

  return (
    <Link
      to={`/friends/${friend.id}`}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
    >
      <div className="mb-4 flex items-center gap-3">
        <img src={friend.picture} alt={friend.name} className="h-14 w-14 rounded-full border-2 border-slate-100 object-cover" />
        <div>
          <h3 className="text-lg font-bold text-slate-900">{friend.name}</h3>
          <p className="text-sm text-slate-500">{friend.days_since_contact}d ago</p>
        </div>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        {friend.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
            {tag}
          </span>
        ))}
      </div>
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${statusStyles[friend.status]}`}>
        {statusLabel}
      </span>
    </Link>
  );
}
