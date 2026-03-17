import logo from '../../assets/logo.svg';

export default function KycLeftBg() {
  return (
    <>
      {/* LEFT — Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between w-160 shrink-0 bg-[#0d0d0d] text-white p-10 relative overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20px 20px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ff4d1c] rounded-full opacity-10 translate-x-20 translate-y-20" />
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#ff4d1c] rounded-full opacity-5 -translate-x-10 -translate-y-10" />

        <div className="relative z-10">
          <img src={logo} alt="Venuez logo" className="mb-8 h-10 w-auto" />
          <h1 className="text-3xl font-black uppercase italic leading-tight tracking-tight">
            Partner
            <br />
            with Us
          </h1>
          <p className="text-sm text-white/50 mt-3 leading-relaxed">
            Join our growing network of verified venues and unlock a new stream
            of customers.
          </p>
        </div>

        <div className="relative z-10 space-y-5 ">
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
            <div key={step.num} className="flex items-start gap-4">
              <span className="text-[#ff4d1c] font-black text-xs mt-0.5 shrink-0">
                {step.num}
              </span>
              <div>
                <p className="text-xs font-bold text-white">{step.title}</p>
                <p className="text-[11px] text-white/40">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="relative z-10 text-[10px] text-white/25 uppercase tracking-widest">
          © 2025 Venuz - Book your venues now
        </p>
      </div>
    </>
  );
}
