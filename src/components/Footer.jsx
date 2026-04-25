const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M21.58 7.19a2.98 2.98 0 0 0-2.1-2.1C17.63 4.5 12 4.5 12 4.5s-5.63 0-7.48.59a2.98 2.98 0 0 0-2.1 2.1c-.59 1.85-.59 5.71-.59 5.71s0 3.86.59 5.71a2.98 2.98 0 0 0 2.1 2.1c1.85.59 7.48.59 7.48.59s5.63 0 7.48-.59a2.98 2.98 0 0 0 2.1-2.1c.59-1.85.59-5.71.59-5.71s0-3.86-.59-5.71ZM10.2 15.66V10.14L15 12.9l-4.8 2.76Z" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.75c0-.93.26-1.56 1.59-1.56H16.9V4.32c-.32-.04-1.42-.12-2.7-.12-2.67 0-4.5 1.63-4.5 4.62v1.98H6.9V14h2.8v8h3.8Z" />
  </svg>
);

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.9 2H22l-6.77 7.74L23 22h-6.2l-4.86-6.35L6.4 22H3.3l7.24-8.28L1 2h6.35l4.4 5.9L18.9 2Zm-1.08 18h1.72L6.41 3.9H4.57L17.82 20Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="mt-16 bg-emerald-950 text-emerald-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">KeenKeeper</h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-emerald-200">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <span className="text-xl font-medium text-emerald-50/95">Social Links</span>
          <div className="flex items-center justify-center gap-3">
            <a
              href="#"
              aria-label="Youtube"
              className="rounded-full bg-red-600 p-2 text-slate-700 transition hover:scale-105 hover:bg-slate-100 hover:text-slate-800"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full bg-blue-600  p-2 text-slate-700 transition hover:scale-105 hover:bg-slate-100 hover:text-slate-800"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="X"
              className="rounded-full bg-black p-2 text-slate-700 transition hover:scale-105 hover:bg-slate-100 hover:text-slate-800"
            >
              <XIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-9 border-t border-emerald-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-emerald-300 sm:flex-row sm:text-sm">
            <p>© {new Date().getFullYear()} KeenKeeper. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="transition hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="transition hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
