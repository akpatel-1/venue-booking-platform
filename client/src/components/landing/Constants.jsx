import {
  BarChart2,
  CircleCheck,
  DollarSign,
  Dumbbell,
  Flag,
  Gamepad2,
  Goal,
  Smartphone,
  Volleyball,
  Waves,
} from 'lucide-react';

export const VENUES = [
  {
    icon: <Waves size={24} />,
    name: 'Water Parks',
    desc: 'Slot-based entry & seasonal pricing',
  },
  {
    icon: <Goal size={24} />,
    name: 'Turf Grounds',
    desc: 'Hourly slots & advance reservations',
  },
  {
    icon: <Dumbbell size={24} />,
    name: 'Trampoline Parks',
    desc: 'Age-based tickets & capacity limits',
  },
  {
    icon: <Volleyball size={24} />,
    name: 'Rebound Arenas',
    desc: 'Multi-court & tournament scheduling',
  },
  {
    icon: <Gamepad2 size={24} />,
    name: 'Gaming Zones',
    desc: 'Session passes & combo packages',
  },
  {
    icon: <Flag size={24} />,
    name: 'Play Zones',
    desc: 'Kids tickets & parent bundles',
  },
];

export const STEPS = [
  {
    n: '01',
    title: 'Create account',
    desc: 'Sign up with your phone — no approvals, no paperwork.',
  },
  {
    n: '02',
    title: 'List your venue',
    desc: 'Add photos, location, hours, and a short description.',
  },
  {
    n: '03',
    title: 'Set slots & pricing',
    desc: 'Create ticket types, time slots and availability caps.',
  },
  {
    n: '04',
    title: 'Start earning',
    desc: 'Customers book online. Payments settle to your bank.',
  },
];

export const BENEFITS = [
  {
    icon: <BarChart2 />,
    title: 'Live dashboard',
    desc: 'Track bookings, revenue and slot fill-rate in real time.',
  },
  {
    icon: <DollarSign />,
    title: 'Instant digital payments',
    desc: 'UPI, cards, wallets — customers pay online, you settle fast.',
  },
  {
    icon: <Smartphone />,
    title: 'Zero tech skills needed',
    desc: 'If you can use WhatsApp, you can run your VenueOS account.',
  },
  {
    icon: <CircleCheck />,
    title: 'Auto confirmations',
    desc: 'Customers get digital tickets. No more counter queues.',
  },
];

export const STATS = [
  ['0%', 'Commission first 3 months'],
  ['5 min', 'Average time to go live'],
  ['24/7', 'Bookings while you sleep'],
  ['₹0', 'Setup cost, ever'],
];

export const TICKER = [
  'Water Parks',
  'Turf Grounds',
  'Trampoline Parks',
  'Gaming Zones',
  'Play Zones',
  'Rebound Arenas',
  'Adventure Parks',
  'Sports Arenas',
];
