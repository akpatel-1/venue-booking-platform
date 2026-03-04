import { FiArrowRight, FiMapPin, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import '../../../../index.css';
import { BENEFITS, STATS, STEPS, TICKER, VENUES } from './Constants';
import DashMockup from './DashMockup';
import FadeSection from './FadeSection';

const TICKER_DOUBLED = [...TICKER, ...TICKER];

/* ── tiny helpers ── */
const SectionLabel = ({ children }) => (
  <div className="text-xs font-semibold uppercase tracking-[.12em] text-[#7a7267] mb-3">
    {children}
  </div>
);

const H2 = ({ children, light }) => (
  <h2
    className={`font-display font-extrabold text-4xl md:text-5xl tracking-tight leading-tight max-w-xl mb-12 ${light ? 'text-[#f5f1eb]' : ''}`}
  >
    {children}
  </h2>
);

const JoinBtn = ({ label = 'Join as a Partner', onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="btn-pop inline-flex items-center gap-3 bg-[#ff4d1c] text-white font-display font-bold text-base px-8 py-4 rounded-lg border-2 border-[#0d0d0d]"
  >
    {label} <FiArrowRight size={18} />
  </button>
);

/* ── Page ── */
export default function LandingPage() {
  const navigate = useNavigate();

  const handleCheckStatus = async () => {
    navigate('/partners/application/status');
  };

  return (
    <div className="overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white flex items-center justify-between px-6 md:px-12 py-2 nav-blur transition-shadow shadow-sm">
        <a
          href="#"
          className="font-display font-extrabold text-xl tracking-tight"
        >
          Venue<span className="text-[#ff4d1c]">z</span>
        </a>
        <button
          type="button"
          onClick={handleCheckStatus}
          className="flex items-center gap-2 text-sm font-medium px-2 py-2.5 border-2 border-[#0d0d0d] rounded-full hover:bg-[#0d0d0d] hover:text-[#f5f1eb] transition-colors"
        >
          <FiUser size={15} /> Partner Login
        </button>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-28 pb-12 relative overflow-hidden">
        <div className="font-display font-extrabold text-[18vw] leading-none text-[#0d0d0d]/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none">
          PARTNER
        </div>

        <span className="animate-fadeup inline-flex items-center gap-2 bg-[#ffb800] text-[#0d0d0d] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" /> For Venue
          Owners
        </span>

        <h1 className="animate-fadeup delay-1 font-display font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.04] tracking-tight max-w-4xl relative z-10">
          Your venue.
          <br />
          <span className="text-[#ff4d1c] relative inline-block">
            Online
            <svg
              className="absolute -bottom-1 left-0 w-full"
              height="6"
              viewBox="0 0 300 6"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q75 0 150 5 Q225 10 300 5"
                stroke="#ff4d1c"
                strokeWidth="2.5"
                strokeOpacity=".35"
                fill="none"
              />
            </svg>
          </span>{' '}
          in minutes.
        </h1>

        <p className="animate-fadeup delay-2 font-light text-lg md:text-xl text-[#7a7267] max-w-lg mt-6 mb-10">
          No website, no tech team, no problem. List your water park, turf,
          gaming zone or play area and start selling tickets today.
        </p>

        <div className="animate-fadeup delay-3 flex items-center gap-4 flex-wrap">
          <JoinBtn onClick={handleCheckStatus} />
          <p className="text-sm text-[#7a7267]">
            Free to start · No credit card
          </p>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-[#ff4d1c] border-y-2 border-[#0d0d0d] py-3 overflow-hidden">
        <div className="animate-ticker flex w-max">
          {TICKER_DOUBLED.map((item, i) => (
            <span
              key={i}
              className="font-display font-bold text-white text-sm uppercase tracking-widest mx-8 whitespace-nowrap flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" /> {item}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <FadeSection className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-[#0d0d0d]">
        {STATS.map(([num, label], i) => (
          <div
            key={i}
            className={`px-8 py-8 ${i < 3 ? 'border-r-2' : ''} border-[#0d0d0d] ${i < 2 ? 'border-b-2 md:border-b-0' : ''}`}
          >
            <div className="font-display font-extrabold text-4xl tracking-tight text-[#ff4d1c] mb-1">
              {num}
            </div>
            <div className="text-sm text-[#7a7267]">{label}</div>
          </div>
        ))}
      </FadeSection>

      {/* VENUE TYPES */}
      <section className="px-6 md:px-16 py-24">
        <FadeSection>
          <SectionLabel>Who it's for</SectionLabel>
          <H2>Built for every kind of fun venue</H2>
        </FadeSection>
        <FadeSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-2 border-[#0d0d0d]">
          {VENUES.map((v, i) => (
            <div
              key={i}
              className={`group bg-white hover:bg-[#0d0d0d] p-8 transition-all duration-200 hover:-translate-y-1 cursor-default
              ${i % 3 !== 2 ? 'md:border-r-2' : ''} ${i < 3 ? 'border-b-2' : ''} border-[#0d0d0d]`}
            >
              <div className="w-11 h-11 rounded-xl bg-[#f5f1eb] group-hover:bg-[#ff4d1c] text-[#ff4d1c] group-hover:text-white flex items-center justify-center mb-5 transition-colors">
                {v.icon}
              </div>
              <div className="font-display font-bold text-lg mb-1 group-hover:text-[#f5f1eb]">
                {v.name}
              </div>
              <div className="text-sm font-light text-[#7a7267] group-hover:text-[#f5f1eb]/60 transition-colors">
                {v.desc}
              </div>
            </div>
          ))}
        </FadeSection>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#0d0d0d] text-[#f5f1eb] px-6 md:px-16 py-24">
        <FadeSection>
          <SectionLabel>
            <span className="text-[#f5f1eb]/40">How it works</span>
          </SectionLabel>
          <H2 light>Go live in 4 steps</H2>
        </FadeSection>
        <FadeSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-[#f5f1eb]/10">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`p-8 hover:bg-[#1a1a1a] transition-colors ${i < 3 ? 'md:border-r' : ''} border-b md:border-b-0 border-[#f5f1eb]/10`}
            >
              <div className="font-display font-extrabold text-6xl text-[#ff4d1c]/25 leading-none mb-6">
                {s.n}
              </div>
              <div className="font-display font-bold text-lg mb-2">
                {s.title}
              </div>
              <div className="text-sm font-light text-[#f5f1eb]/50 leading-relaxed">
                {s.desc}
              </div>
            </div>
          ))}
        </FadeSection>
      </section>

      {/* BENEFITS */}
      <section className="px-6 md:px-16 py-24 grid md:grid-cols-2 gap-16 items-center">
        <FadeSection>
          <SectionLabel>Why partners choose us</SectionLabel>
          <H2>
            Everything you need,
            <br />
            nothing you don't
          </H2>
          <div className="flex flex-col gap-8">
            {BENEFITS.map((b, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-lg bg-[#ff4d1c]/10 text-[#ff4d1c] flex items-center justify-center shrink-0 text-lg">
                  {b.icon}
                </div>
                <div>
                  <div className="font-display font-bold text-base mb-1">
                    {b.title}
                  </div>
                  <div className="text-sm font-light text-[#7a7267] leading-relaxed">
                    {b.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
        <FadeSection>
          <DashMockup />
        </FadeSection>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-6 md:px-16 py-28 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,77,28,.07) 0%, transparent 70%)',
          }}
        />
        <FadeSection>
          <div className="flex items-center justify-center gap-2 mb-6 text-sm text-[#7a7267]">
            <FiMapPin className="text-[#ff4d1c]" /> Already live in 50+ cities
            across India
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight leading-tight max-w-2xl mx-auto mb-5">
            Ready to fill your venue every day?
          </h2>
          <p className="font-light text-lg text-[#7a7267] mb-10">
            Join hundreds of local venues already growing with Venuez.
          </p>
          <JoinBtn
            label="Get Started — It's Free"
            onClick={handleCheckStatus}
          />
        </FadeSection>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-[#0d0d0d] px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <a
          href="#"
          className="font-display font-extrabold text-xl tracking-tight"
        >
          {/* Venue<span className="text-[#ff4d1c]">z</span> */}
        </a>
        <p className="text-sm text-[#7a7267]">
          © 2025 Venuez · Built for local venues across India
        </p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Support'].map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm text-[#7a7267] hover:text-[#0d0d0d] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
