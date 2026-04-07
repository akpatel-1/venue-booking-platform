const SLOT_BARS = [
  ['10 AM', 100, '#ff4d1c'],
  ['12 PM', 80, '#ff4d1c'],
  ['2 PM', 55, '#ff4d1c'],
  ['4 PM', 30, '#ffb800'],
];

export default function DashMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden border-2 border-[#0d0d0d]"
      style={{ boxShadow: '10px 10px 0 #0d0d0d' }}
    >
      {/* title bar */}
      <div className="bg-[#0d0d0d] px-4 py-3 flex items-center gap-2">
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <span
            key={c}
            className="w-3 h-3 rounded-full"
            style={{ background: c }}
          />
        ))}
        <span className="font-body text-xs text-white/40 ml-2">
          partner/overview
        </span>
      </div>

      {/* screen */}
      <div className="bg-[#141414] p-6">
        <div className="flex justify-between items-center mb-5">
          <span className="font-display font-bold text-white text-sm">
            My Venue — Today
          </span>
          <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full">
            <span className="animate-pulse-dot w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />{' '}
            Live
          </span>
        </div>

        {/* stat chips */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            ['Bookings', '34'],
            ['Revenue', '₹8.4k'],
            ['Occupancy', '71%'],
          ].map(([l, v]) => (
            <div key={l} className="bg-white/5 rounded-lg p-3">
              <div className="text-[10px] text-white/40 mb-1">{l}</div>
              <div className="font-display font-bold text-white text-lg leading-none">
                {v}
              </div>
            </div>
          ))}
        </div>

        {/* bar chart */}
        <div className="text-[10px] text-white/30 mb-3">Slot fill rate</div>
        {SLOT_BARS.map(([label, w, color]) => (
          <div key={label} className="flex items-center gap-3 mb-2">
            <span className="text-[10px] text-white/35 w-10 shrink-0">
              {label}
            </span>
            <div className="flex-1 bg-white/5 rounded-full h-1.5">
              <div
                className="h-full rounded-full"
                style={{ width: `${w}%`, background: color }}
              />
            </div>
            <span className="text-[10px] text-white/30 w-7 text-right">
              {w}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
