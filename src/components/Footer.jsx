import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
        <p className="mx-auto max-w-3xl text-center text-slate-500">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>Social Links</span>
          <img src={facebook} alt="Facebook" className="h-7 w-7 rounded-full bg-slate-100 p-1" />
          <img src={instagram} alt="Instagram" className="h-7 w-7 rounded-full bg-slate-100 p-1" />
          <img src={twitter} alt="Twitter" className="h-7 w-7 rounded-full bg-slate-100 p-1" />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-center text-xs md:text-sm">
          <p>© {new Date().getFullYear()} KeenKeeper. All rights reserved.</p>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
}
