import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  Menu,
  Music,
  ParkingCircle,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wifi,
  Wind,
  X,
} from 'lucide-react';

const VENUES = [
  {
    id: 1,
    name: 'The Glass Pavilion',
    location: 'Bandra West, Mumbai',
    category: 'Event Hall',
    capacity: 350,
    rating: 4.9,
    reviews: 128,
    price: 45000,
    badge: 'Top Pick',
    tags: ['Wifi', 'Parking', 'AC', 'Sound'],
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80',
    color: '#e8d5b7',
  },
  {
    id: 2,
    name: 'Horizon Rooftop',
    location: 'Connaught Place, Delhi',
    category: 'Rooftop',
    capacity: 150,
    rating: 4.7,
    reviews: 94,
    price: 28000,
    badge: 'Trending',
    tags: ['Wifi', 'AC', 'Sound'],
    img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
    color: '#c9dce8',
  },
  {
    id: 3,
    name: 'The Ivory Suite',
    location: 'Koramangala, Bangalore',
    category: 'Conference',
    capacity: 80,
    rating: 4.8,
    reviews: 61,
    price: 18000,
    badge: 'New',
    tags: ['Wifi', 'Parking', 'AC'],
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    color: '#d5e8d9',
  },
  {
    id: 4,
    name: 'Saltwater Garden',
    location: 'Juhu, Mumbai',
    category: 'Outdoor',
    capacity: 500,
    rating: 4.6,
    reviews: 203,
    price: 62000,
    badge: null,
    tags: ['Parking', 'Sound'],
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
    color: '#e8d5d5',
  },
];

const CATEGORIES = [
  { label: 'All', icon: Sparkles },
  { label: 'Event Halls', icon: Music },
  { label: 'Rooftops', icon: TrendingUp },
  { label: 'Conference', icon: Shield },
  { label: 'Outdoor', icon: Wind },
];

const TAG_ICONS = {
  Wifi: Wifi,
  Parking: ParkingCircle,
  AC: Wind,
  Sound: Music,
};

const BADGE_STYLES = {
  'Top Pick': 'bg-amber-400 text-amber-900',
  Trending: 'bg-sky-400 text-sky-900',
  New: 'bg-emerald-400 text-emerald-900',
};

function VenueCard({ venue }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <img
          src={venue.img}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

        {venue.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${BADGE_STYLES[venue.badge]}`}
          >
            {venue.badge}
          </span>
        )}

        <button
          onClick={() => setLiked((l) => !l)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart
            size={14}
            className={
              liked ? 'fill-rose-500 stroke-rose-500' : 'stroke-slate-500'
            }
          />
        </button>

        <div className="absolute bottom-3 left-3">
          <span className="text-xs text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {venue.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-slate-800 text-base leading-tight">
            {venue.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <Star size={12} className="fill-amber-400 stroke-amber-400" />
            <span className="text-xs font-semibold text-slate-700">
              {venue.rating}
            </span>
            <span className="text-xs text-slate-400">({venue.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400 mb-3">
          <MapPin size={11} />
          <span className="text-xs">{venue.location}</span>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          {venue.tags.map((tag) => {
            const Icon = TAG_ICONS[tag];
            return (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"
              >
                <Icon size={10} />
                {tag}
              </span>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-400 text-xs mb-0.5">
              <Users size={11} />
              <span>Up to {venue.capacity} guests</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-slate-900 text-base">
                ₹{venue.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400">/day</span>
            </div>
          </div>

          <button className="flex items-center gap-1.5 bg-slate-900 text-white text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-slate-700 transition-colors">
            Book Now
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserHomePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchVal, setSearchVal] = useState('');
  const [guests, setGuests] = useState('');
  const [date, setDate] = useState('');

  return (
    <div className="min-h-screen bg-[#f5f3ef] font-sans">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-[#f5f3ef]/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
              <MapPin size={13} className="text-amber-400" />
            </div>
            <span className="font-black text-slate-900 text-lg tracking-tight">
              venuely
            </span>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm text-slate-600 font-medium">
            <a href="#" className="hover:text-slate-900 transition-colors">
              Explore
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              How it works
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              List your venue
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm text-slate-700 font-medium hover:text-slate-900">
              Sign in
            </button>
            <button className="text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors">
              Get started
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-5 py-4 border-t border-black/5 flex flex-col gap-4 text-sm font-medium text-slate-700 bg-[#f5f3ef]">
            <a href="#">Explore</a>
            <a href="#">How it works</a>
            <a href="#">List your venue</a>
            <a href="#">Sign in</a>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-center">
              Get started
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full mb-5">
              <Sparkles size={12} /> 1,200+ venues across India
            </span>

            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-5">
              Find the perfect
              <br />
              <span className="relative">
                venue
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 9 Q100 2 198 9"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              for every
              <br />
              occasion.
            </h1>

            <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-md">
              Discover and book unique venues for corporate events, weddings,
              parties, and more — instantly.
            </p>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              {[
                'No booking fees',
                'Instant confirmation',
                'Free cancellation',
              ].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Stacked venue preview */}
          <div className="flex-1 relative h-72 hidden lg:block">
            <div className="absolute right-0 top-0 w-64 h-48 rounded-3xl overflow-hidden shadow-xl rotate-3">
              <img
                src={VENUES[0].img}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="absolute right-24 top-10 w-56 h-40 rounded-3xl overflow-hidden shadow-lg -rotate-2 border-4 border-white">
              <img
                src={VENUES[1].img}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="absolute right-8 bottom-0 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center">
                <Star size={16} className="text-white fill-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  4.8 avg rating
                </div>
                <div className="text-[11px] text-slate-400">
                  from 3,400+ reviews
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Search Bar ── */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-3 flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center gap-3 px-3 py-2 border border-slate-100 rounded-xl">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search by venue name or city..."
              className="flex-1 text-sm text-slate-700 outline-none placeholder:text-slate-400 bg-transparent"
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-2 border border-slate-100 rounded-xl min-w-35">
            <Calendar size={15} className="text-slate-400 shrink-0" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flex-1 text-sm text-slate-700 outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-2 border border-slate-100 rounded-xl min-w-30]">
            <Users size={15} className="text-slate-400 shrink-0" />
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Guests"
              className="flex-1 text-sm text-slate-700 outline-none bg-transparent placeholder:text-slate-400 w-16"
            />
          </div>

          <button className="flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors shrink-0">
            <Search size={15} />
            Search
          </button>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="max-w-6xl mx-auto px-5 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(({ label, icon }) => {
            const Icon = icon;
            return (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shrink-0 transition-all ${
                  activeCategory === label
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Venue Grid ── */}
      <section className="max-w-6xl mx-auto px-5 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Featured Venues
            </h2>
            <p className="text-sm text-slate-400">
              Handpicked for you this week
            </p>
          </div>
          <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
            View all <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VENUES.map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-2">How venuely works</h2>
            <p className="text-slate-400 text-sm">
              Book your dream venue in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: Search,
                title: 'Search',
                desc: 'Browse thousands of verified venues by location, capacity, or type.',
              },
              {
                step: '02',
                icon: Calendar,
                title: 'Book',
                desc: 'Select your date, check availability, and confirm instantly.',
              },
              {
                step: '03',
                icon: Clock,
                title: 'Enjoy',
                desc: 'Show up and enjoy. Everything else is handled.',
              },
            ].map(({ step, icon, title, desc }) => {
              const Icon = icon;
              return (
                <div key={step} className="flex gap-5">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-amber-900" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 tracking-widest mb-1">
                      {step}
                    </div>
                    <h3 className="font-bold text-white mb-1">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-5 py-16 text-center">
        <div className="bg-amber-50 border border-amber-200 rounded-3xl px-8 py-12">
          <h2 className="text-3xl font-black text-slate-900 mb-3">
            Own a venue?
          </h2>
          <p className="text-slate-500 max-w-md mx-auto mb-6 text-sm leading-relaxed">
            List your space on venuely and reach thousands of event planners
            looking for their perfect venue.
          </p>
          <button
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors"
            onClick={() => navigate('/partners')}
          >
            List your venue <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-black/5 py-8">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-slate-900 rounded-md flex items-center justify-center">
              <MapPin size={10} className="text-amber-400" />
            </div>
            <span className="font-bold text-slate-700">venuely</span>
          </div>
          <span>© 2026 venuely. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-700 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-700 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-slate-700 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
