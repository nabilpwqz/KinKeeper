import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">404</p>
      <h1 className="mt-2 text-4xl font-extrabold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-500">This route does not exist. Head back to Home and continue tracking your friends.</p>
      <Link to="/" className="mt-6 rounded-full bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5">
        Go Home
      </Link>
    </section>
  );
}
