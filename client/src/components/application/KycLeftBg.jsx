import logo from '../../assets/logo.svg';

export default function KycLeftBg() {
  return (
    <div className="hidden lg:flex flex-col justify-between w-180 shrink-0 bg-linear-to-b from-[#fff2db] to-[#ffe8c4] text-[#2b241a] p-10 relative overflow-hidden border-r border-[#ecd8ba]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20px 20px, rgba(255,175,82,.22) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ffaf52] rounded-full opacity-25 translate-x-20 translate-y-20" />
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#ff8f3a] rounded-full opacity-20 -translate-x-10 -translate-y-10" />

      <div className="relative z-10">
        <img src={logo} alt="Venuez logo" className="mb-8 h-10 w-auto" />
        <span className="inline-flex rounded-full border border-[#f0c992] bg-[#fff7e8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6a5435]">
          Partner onboarding
        </span>
        <h1 className="mt-4 text-4xl font-black uppercase italic leading-tight tracking-tight text-[#2b241a]">
          Partner
          <br />
          with Us
        </h1>
        <p className="text-sm text-[#7b6d59] mt-3 leading-relaxed max-w-sm">
          Join our growing network of verified venues and unlock a new stream of
          customers.
        </p>
      </div>

      <div className="relative z-10 space-y-5">
        {[
          {
            num: '01',
            title: 'Submit Application',
            desc: 'Fill your business details',
          },
          {
            num: '02',
            title: 'Verification',
            desc: 'We review within 48 hrs',
          },
          { num: '03', title: 'Go Live', desc: 'Start receiving bookings' },
        ].map((step) => (
          <div
            key={step.num}
            className="flex items-start gap-4 rounded-xl border border-[#f0dcc0] bg-white/60 px-3 py-2"
          >
            <span className="text-[#ff8f3a] font-black text-xs mt-0.5 shrink-0">
              {step.num}
            </span>
            <div>
              <p className="text-xs font-bold text-[#2b241a]">{step.title}</p>
              <p className="text-[11px] text-[#7b6d59]">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="relative z-10 text-[10px] text-[#8b7a62] uppercase tracking-widest">
        © 2025 Venuz · Built for local venues
      </p>
    </div>
  );
}
