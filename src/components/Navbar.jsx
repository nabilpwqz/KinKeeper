import { ChartPie, Clock3, House, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-xl.png";

const links = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/timeline", label: "Timeline", icon: Clock3 },
  { to: "/stats", label: "Stats", icon: ChartPie },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <img src={logo} alt="KeenKeeper logo" className="h-9 w-auto object-contain" />
            <span className="truncate text-lg font-extrabold text-emerald-700">KeenKeeper</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="hidden items-center gap-2 rounded-full bg-slate-100/80 p-1 md:flex">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
                      : "text-slate-700 hover:bg-white hover:text-emerald-700"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-3 grid grid-cols-1 gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm md:hidden">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100 hover:text-emerald-700"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
