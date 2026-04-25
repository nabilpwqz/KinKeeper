import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useTimeline } from "../store/TimelineContext";

const colors = ["#10b981", "#14b8a6", "#84cc16"];

export default function StatsPage() {
  const { entries } = useTimeline();

  const data = [
    { name: "Call", value: entries.filter((entry) => entry.type === "Call").length },
    { name: "Text", value: entries.filter((entry) => entry.type === "Text").length },
    { name: "Video", value: entries.filter((entry) => entry.type === "Video").length },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Friendship Analytics</h1>
      <p className="mt-2 text-sm font-semibold text-slate-500">By Interaction Type</p>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {data.map((item, index) => (
            <span
              key={item.name}
              className="rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              {item.name}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid content-center gap-3">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                  <span className="font-semibold text-slate-800">{item.name}</span>
                </div>
                <span className="text-lg font-extrabold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
