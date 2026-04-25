import { MessageSquare, Phone, Video } from "lucide-react";
import { useMemo, useState } from "react";
import { useTimeline } from "../store/TimelineContext";
import { formatDate } from "../utils/helpers";

const iconMap = {
  Call: Phone,
  Text: MessageSquare,
  Video: Video,
};

const filters = ["All", "Call", "Text", "Video"];

export default function TimelinePage() {
  const { entries } = useTimeline();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEntries = useMemo(() => {
    if (activeFilter === "All") return entries;
    return entries.filter((entry) => entry.type === activeFilter);
  }, [entries, activeFilter]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Timeline</h1>
      <p className="mt-2 text-sm font-semibold text-slate-500">Filter timeline</p>
      <div className="mt-4 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeFilter === filter
                ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {filteredEntries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500 shadow-sm">
            No interactions yet. Use Quick Check-In from a friend details page.
          </div>
        ) : (
          filteredEntries.map((entry) => {
            const Icon = iconMap[entry.type];
            return (
              <article key={entry.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-lg font-bold text-slate-900">
                    <Icon className="mr-2 inline h-5 w-5 text-emerald-600" />
                    {entry.title}
                  </p>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">{entry.type}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-500">{formatDate(entry.date)}</p>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
