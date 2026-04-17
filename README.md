# 🏟️ Venuz

> A venue booking platform connecting customers with vendors — currently in active development.

> ⚠️ **Status: Work in Progress** — Core auth and admin infrastructure are functional. Booking and vendor onboarding flows are still being built.

---

## 📖 Overview

**Venuz** is a full-stack venue booking platform with three distinct roles:

- **Customers** — Browse and book venues
- **Vendors** — List and manage their venues after KYC approval
- **Admins** — Review vendor applications, manage users, and oversee the platform

---

## ✨ Features (Current)

### 🔐 Auth
- Customer/Vendor login via **email OTP** (Google OAuth ready)
- JWT-based auth with **refresh token rotation**
- Admin login via **email + password** with **Redis session**
- Account status checks (active / banned) on protected routes

### 🛂 Admin Portal
- Review vendor KYC applications (approve / reject with reason)
- List applications filtered by status
- Application count by status
- Session-protected routes throughout

### 🏪 Vendor Onboarding
- Vendors submit a KYC application with PAN details and document upload (S3)
- PAN number validated against format (`AAAAA9999A`)
- One active application enforced per user via partial unique index
- Approved vendors get a `vendor_profile` created automatically

### 👤 Customer
- OTP request, verify, resend
- JWT refresh and logout
- `/auth/me` for session hydration

---

## 🛠️ Tech Stack

### Frontend (`client/`)
| Category | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Routing | React Router DOM v7 |
| State Management | Zustand v5 |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |

### Backend (`server/`)
| Category | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Framework | Express v5 |
| Database | PostgreSQL (`pg`) + Supabase |
| Cache / Sessions | Upstash Redis |
| Auth — User | Email OTP + JWT + Refresh Tokens |
| Auth — Admin | Email + Password + Redis Session |
| Password Hashing | Argon2 |
| Email / OTP | Resend |
| File Uploads | Multer + Cloudflare R2 |
| Validation | Zod v4 |

---

## 📁 Project Structure

```
venuz/
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── modules/            # Feature modules (auth, vendor, admin)
│   │   ├── components/         # Shared UI components
│   │   ├── store/              # Zustand state stores
│   │   ├── api/                # Axios instances & API functions
│   │   └── routes/             # React Router config
│   └── package.json
│
└── server/                     # Express backend
    ├── src/
    │   ├── modules/            # Route handlers per role
    │   │   ├── admin/          # Admin auth, application review
    │   │   ├── user/           # Customer OTP auth, profile
    │   │   └── vendor/         # Vendor dashboard
    │   ├── infrastructure/     # DB, Redis, S3, mailer setup
    │   ├── middleware/         # Auth, validation, role guards
    │   ├── app.js              # Express app setup
    │   ├── server.js           # HTTP server
    │   └── index.js            # Entry point
    └── package.json
```

---

## 🗄️ Database Schema

### Tables
| Table | Purpose |
|---|---|
| `admins` | Admin accounts (email + hashed password) |
| `users` | Customers and vendors (role: `customer` \| `vendor`) |
| `user_auth_methods` | Supports OTP and Google OAuth per user |
| `refresh_tokens` | JWT refresh token store with expiry and revocation |
| `vendor_profiles` | Approved vendor details (name, location, suspension) |
| `vendor_applications` | KYC submissions with PAN, documents, review status |

### Key Constraints
- `users.status` — `active` or `banned`
- `users.role` — `customer` or `vendor`
- `vendor_applications.status` — `pending`, `approved`, or `rejected`
- `pan_format_check` — enforces `AAAAA9999A` format
- Partial unique index on `vendor_applications` — one pending/approved application per user at a time
- Rejected applications require a `rejection_reason`
- Suspended vendors require a `suspension_reason`

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL (or Supabase project)
- Upstash Redis
- Cloudflare R2 bucket (for PAN document uploads)
- Resend account (for OTP emails)

### 1. Clone the repo

```bash
git clone https://github.com/akpatel-1/venue-booking-platform.git
cd venuz
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

DATABASE_URL=postgresql://postgres:@aws-1-ap-south-1.pooler.supabase.com:6543/postgres

UPSTASH_REDIS_REST_URL=https://.upstash.io
UPSTASH_REDIS_REST_TOKEN=

ACCESS_SECRET=
OTP_SECRET=

EMAIL_API=

R2_ENDPOINT=https://.r2.cloudflarestorage.com
R2_ACCESS_KEY=
R2_SECRET_KEY=
R2_BUCKET=
R2_PUBLIC_URL=https://pub-.r2.dev

```

### 3. Setup the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:5000/
```

```bash
npm run dev
```

---

## 🔐 Auth Flows

### Customer / Vendor — OTP + JWT
1. User enters email → server sends OTP via Resend
2. User submits OTP → server validates → issues JWT + refresh token
3. JWT sent with every request; refresh token rotated on expiry
4. Google OAuth supported as a second auth provider

### Admin — Email + Password + Session
1. Admin submits credentials → verified with Argon2
2. Session created in Redis; cookie sent to client
3. All admin routes protected by `validateSession` middleware

---

## 🗂️ API Reference

### Admin Routes
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/admin/auth/login` | Admin login |
| `POST` | `/admin/auth/logout` | Admin logout |
| `GET` | `/admin/auth/me` | Admin session check |
| `GET` | `/admin/application` | List applications (filter by status) |
| `PATCH` | `/admin/application/:id` | Approve or reject application |
| `GET` | `/admin/application/:status` | Application count by status |

### User Routes
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/user/auth/otp/request` | Send OTP to email |
| `POST` | `/user/auth/otp/verify` | Verify OTP and issue JWT |
| `POST` | `/user/auth/otp/resend` | Resend OTP |
| `GET` | `/user/auth/me` | Get current user |
| `POST` | `/user/auth/refresh` | Rotate refresh token |
| `POST` | `/user/auth/logout` | Logout and revoke token |

### Vendor Routes
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/vendor/profile` | Get vendor profile |

---

## 📜 Scripts

### Frontend
```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
npm run format    # Prettier format
```

### Backend
```bash
npm run dev       # Start with nodemon (hot reload)
npm start         # Start with node
npm run format    # Prettier format
```

---

## 🔭 Roadmap

- [ ] Venue listing and search
- [ ] Booking flow (slot selection, payment)
- [ ] Vendor dashboard (manage listings, view bookings)
- [ ] Customer booking history
- [ ] Admin analytics and reporting
- [ ] Google OAuth integration
- [ ] Notifications (email / in-app)

---
