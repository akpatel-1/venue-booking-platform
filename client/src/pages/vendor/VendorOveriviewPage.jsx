import { ArrowUpRight, Calendar, DollarSign, Users } from 'lucide-react';

export default function VendorOverviewPage() {
  // Placeholder stats - can be connected to API later
  const stats = [
    {
      label: 'Total Earnings',
      value: '₹45,230',
      change: '+12%',
      icon: DollarSign,
      bg: '#dcfce7',
      color: '#22c55e',
    },
    {
      label: 'Total Bookings',
      value: '124',
      change: '+8%',
      icon: Calendar,
      bg: '#fef3c7',
      color: '#f59e0b',
    },
    {
      label: 'Active Venues',
      value: '3',
      change: '0%',
      icon: Users,
      bg: '#cffafe',
      color: '#06b6d4',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[#2b241a]">Welcome back!</h1>
        <p className="text-[#7b6d59] mt-1">
          Here's your venue performance overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#ead9c2] bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: stat.bg, color: stat.color }}
                >
                  <Icon size={20} />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                  <ArrowUpRight size={14} />
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-[#7b6d59] mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-[#2b241a]">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-[#ead9c2] bg-white p-6">
        <h2 className="text-lg font-black text-[#2b241a] mb-4">
          Recent Bookings
        </h2>
        <div className="space-y-3">
          {[
            {
              venue: 'The Glass Pavilion',
              date: 'Today at 2:30 PM',
              amount: '₹5,000',
            },
            {
              venue: 'Horizon Rooftop',
              date: 'Yesterday at 6:00 PM',
              amount: '₹3,500',
            },
            {
              venue: 'The Ivory Suite',
              date: '2 days ago',
              amount: '₹2,800',
            },
          ].map((booking, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl bg-[#fffdf8] border border-[#f0e2ce]"
            >
              <div>
                <p className="text-sm font-semibold text-[#2b241a]">
                  {booking.venue}
                </p>
                <p className="text-xs text-[#7b6d59]">{booking.date}</p>
              </div>
              <p className="font-semibold text-[#ffaf52]">{booking.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
