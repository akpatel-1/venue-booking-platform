import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ArrowRight, MapPin, User } from 'lucide-react';

import { vendorApi } from '../../api/vendor.api';
import AuthForm from '../../components/auth/AuthForm';
import {
  BENEFITS,
  STATS,
  STEPS,
  TICKER,
  VENUES,
} from '../../components/landing/Constants';
import DashMockup from '../../components/landing/DashMockup';
import FadeSection from '../../components/landing/FadeSection';
import '../../index.css';
import { userAuthStore } from '../../store/user/user.auth.store';

const TICKER_DOUBLED = [...TICKER, ...TICKER];

/* ── tiny helpers ── */
const SectionLabel = ({ children }) => (
  <div className="text-xs font-semibold uppercase tracking-[.12em] text-[#8b7a62] mb-3">
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

const JoinBtn = ({ label = 'Join as a Partner', onClick, loading = false }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={loading}
    className="btn-pop inline-flex items-center gap-3 rounded-lg border border-[#f0c992] bg-[#ffaf52] px-8 py-4 font-display text-base font-bold text-[#2b241a] hover:bg-[#ffa73f] disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none"
  >
    {loading ? 'Loading...' : label}
    <ArrowRight size={18} />
  </button>
);

/* ── Page ── */
export default function VendorLandingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAuthenticated = userAuthStore((state) => state.isAuthenticated);
  const isChecking = userAuthStore((state) => state.isChecking);
  const checkSessionCache = userAuthStore((state) => state.checkSessionCache);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const authRequired = searchParams.get('auth') === '1';
  const postLoginRedirect =
    searchParams.get('redirect') || '/partners/application/status';

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!authRequired) return;

    checkSessionCache();
  }, [authRequired, checkSessionCache]);

  useEffect(() => {
    if (authRequired && !isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [authRequired, isAuthenticated]);

  const closeAuthModal = () => {
    setShowAuthModal(false);
    if (!authRequired) return;
    navigate('/partners/landing', { replace: true });
  };

  const handleCheckStatus = async () => {
    if (isNavigating || isChecking) return;

    if (!isAuthenticated) {
      const isVerified = await checkSessionCache();

      if (isVerified) {
        navigate('/partners/application/status');
        return;
      }

      setShowAuthModal(true);
      return;
    }

    setIsNavigating(true);
    try {
      await vendorApi.getApplicationStatus({ skipAuthRedirect: true });
      navigate('/partners/application/status');
    } catch (err) {
      const status = err.response?.status;

      if (status === 401) {
        setShowAuthModal(true);
        return;
      }

      if (!err.response || status >= 500) {
        navigate('/error/500');
      }
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div className="overflow-x-hidden bg-linear-to-b from-[#fff7ec] to-[#fffdf8]">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-md flex items-center justify-between px-6 md:px-12 py-2 border-b border-[#f1e2cf] transition-shadow shadow-sm">
        <a
          href="#"
          className="font-display font-extrabold text-xl tracking-tight"
        >
          Vyra<span className="text-[#ff4d1c]">.</span>
        </a>
        {!isAuthenticated && !isChecking && (
          <button
            type="button"
            onClick={handleCheckStatus}
            disabled={isNavigating}
            className="flex items-center gap-2 rounded-full border border-[#ecdac3] bg-[#fff8eb] px-3 py-2.5 text-sm font-medium text-[#5f4a2d] transition-colors hover:bg-[#ffedd1] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <User size={15} /> {isNavigating ? 'Loading...' : 'Partner Login'}
          </button>
        )}
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-28 pb-12 relative overflow-hidden">
        <div className="font-display font-extrabold text-[18vw] leading-none text-[#3f2f1d]/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none">
          PARTNER
        </div>

        <span className="animate-fadeup inline-flex items-center gap-2 bg-[#ffe3b5] text-[#5f4a2d] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8 w-fit border border-[#f0d6a8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" /> For Venue
          Owners
        </span>

        <h1 className="animate-fadeup delay-1 font-display font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.04] tracking-tight max-w-4xl relative z-10">
          Your venue.
          <br />
          <span className="text-[#ff8f3a] relative inline-block">
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
                stroke="#ff8f3a"
                strokeWidth="2.5"
                strokeOpacity=".35"
                fill="none"
              />
            </svg>
          </span>{' '}
          in minutes.
        </h1>

        <p className="animate-fadeup delay-2 font-light text-lg md:text-xl text-[#7b6d59] max-w-lg mt-6 mb-10">
          No website, no tech team, no problem. List your water park, turf,
          gaming zone or play area and start selling tickets today.
        </p>

        <div className="animate-fadeup delay-3 flex items-center gap-4 flex-wrap">
          <JoinBtn onClick={handleCheckStatus} loading={isNavigating} />
          <p className="text-sm text-[#8b7a62]">
            Free to start · No credit card
          </p>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-[#ffe6bf] border-y border-[#efd8b4] py-3 overflow-hidden">
        <div className="animate-ticker flex w-max">
          {TICKER_DOUBLED.map((item, i) => (
            <span
              key={i}
              className="font-display font-bold text-[#6a5435] text-sm uppercase tracking-widest mx-8 whitespace-nowrap flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6a5435]/60" />{' '}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <FadeSection className="grid grid-cols-2 md:grid-cols-4 border-b border-[#ead9c2] bg-[#fffaf1]">
        {STATS.map(([num, label], i) => (
          <div
            key={i}
            className={`px-8 py-8 ${i < 3 ? 'border-r' : ''} border-[#ead9c2] ${i < 2 ? 'border-b md:border-b-0' : ''}`}
          >
            <div className="font-display font-extrabold text-4xl tracking-tight text-[#ff8f3a] mb-1">
              {num}
            </div>
            <div className="text-sm text-[#8b7a62]">{label}</div>
          </div>
        ))}
      </FadeSection>

      {/* VENUE TYPES */}
      <section className="px-6 md:px-16 py-24 bg-[#fffdf8]">
        <FadeSection>
          <SectionLabel>Who it's for</SectionLabel>
          <H2>Built for every kind of fun venue</H2>
        </FadeSection>
        <FadeSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border border-[#ead9c2] rounded-xl overflow-hidden">
          {VENUES.map((v, i) => (
            <div
              key={i}
              className={`group bg-white hover:bg-[#fff1de] p-8 transition-all duration-200 hover:-translate-y-1 cursor-default
              ${i % 3 !== 2 ? 'md:border-r' : ''} ${i < 3 ? 'border-b' : ''} border-[#ead9c2]`}
            >
              <div className="w-11 h-11 rounded-xl bg-[#fff5e6] group-hover:bg-[#ffaf52] text-[#ff8f3a] group-hover:text-[#2b241a] flex items-center justify-center mb-5 transition-colors">
                {v.icon}
              </div>
              <div className="font-display font-bold text-lg mb-1 text-[#2b241a]">
                {v.name}
              </div>
              <div className="text-sm font-light text-[#7a7267] transition-colors">
                {v.desc}
              </div>
            </div>
          ))}
        </FadeSection>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#fff4e5] text-[#2b241a] px-6 md:px-16 py-24">
        <FadeSection>
          <SectionLabel>
            <span className="text-[#8e7a5f]">How it works</span>
          </SectionLabel>
          <H2>Go live in 4 steps</H2>
        </FadeSection>
        <FadeSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-[#ecd9bd] rounded-t-xl overflow-hidden">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`p-8 hover:bg-[#ffe9c6] transition-colors ${i < 3 ? 'md:border-r' : ''} border-b md:border-b-0 border-[#ecd9bd]`}
            >
              <div className="font-display font-extrabold text-6xl text-[#ff8f3a]/30 leading-none mb-6">
                {s.n}
              </div>
              <div className="font-display font-bold text-lg mb-2">
                {s.title}
              </div>
              <div className="text-sm font-light text-[#7f6f59] leading-relaxed">
                {s.desc}
              </div>
            </div>
          ))}
        </FadeSection>
      </section>

      {/* BENEFITS */}
      <section className="px-6 md:px-16 py-24 grid md:grid-cols-2 gap-16 items-center bg-[#fffdf8]">
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
                  <div className="text-sm font-light text-[#7f6f59] leading-relaxed">
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
      <section className="px-6 md:px-16 py-28 text-center relative overflow-hidden bg-[#fff8ed]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,175,82,.2) 0%, transparent 70%)',
          }}
        />
        <FadeSection>
          <div className="flex items-center justify-center gap-2 mb-6 text-sm text-[#8b7a62]">
            <MapPin className="text-[#ff4d1c]" /> Already live in 50+ cities
            across India
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight leading-tight max-w-2xl mx-auto mb-5">
            Ready to fill your venue every day?
          </h2>
          <p className="font-light text-lg text-[#8b7a62] mb-10">
            Join hundreds of local venues already growing with Venuez.
          </p>
          <JoinBtn
            label="Get Started — It's Free"
            onClick={handleCheckStatus}
            loading={isNavigating}
          />
        </FadeSection>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#ead9c2] bg-[#fffdf8] px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <a
          href="#"
          className="font-display font-extrabold text-xl tracking-tight"
        >
          {/* Vyra<span className="text-[#ff4d1c]">z</span> */}
        </a>
        <p className="text-sm text-[#8b7a62]">
          © 2025 Vyra · Discover and book local experience
        </p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Support'].map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm text-[#8b7a62] hover:text-[#2b241a] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </footer>

      {showAuthModal && (
        <AuthForm
          isModal
          onClose={closeAuthModal}
          onSuccess={() => {
            setShowAuthModal(false);
            navigate(postLoginRedirect);
          }}
        />
      )}
    </div>
  );
}
