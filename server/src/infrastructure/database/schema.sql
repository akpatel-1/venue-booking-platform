CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email CITEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO admins (email, password_hash)
VALUES (
  'akashpatel522004@gmail.com',
  '$argon2id$v=19$m=65536,t=3,p=4$wQABii2YaeRJe+/LR0S0Vg$l1cbtWWhPVsdfoQuwU0M+1WC2UbuG1uL5FMo2Q5641E'
)
ON CONFLICT (email) DO NOTHING;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email CITEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT users_status_check CHECK (status IN ('active', 'banned')),
  CONSTRAINT users_role_check CHECK (role IN ('customer', 'vendor'))
);

CREATE TABLE IF NOT EXISTS user_auth_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  auth_provider TEXT NOT NULL CHECK (auth_provider IN ('otp', 'google')),
  provider_identifier TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (auth_provider, provider_identifier)
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
);

CREATE TABLE IF NOT EXISTS vendor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  vendor_name TEXT NOT NUll,
  is_suspended BOOLEAN NOT NULL DEFAULT FALSE,
  suspension_reason TEXT,
  phone TEXT,
  district TEXT,
  state TEXT,
  approved_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT vendor_suspension_reason_check CHECK (
    is_suspended = FALSE OR suspension_reason IS NOT NULL
  )
);

CREATE TABLE IF NOT EXISTS vendor_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  pan_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  pincode TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL,
  pan_number TEXT NOT NULL,
  pan_document_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  rejection_reason TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES admins (id),
  CONSTRAINT vendor_status_check CHECK (status IN ('pending', 'approved', 'rejected')),
  CONSTRAINT vendor_rejection_reason_check CHECK (
    status != 'rejected' OR rejection_reason IS NOT NULL
  ),
  CONSTRAINT pan_format_check CHECK (pan_number ~ '^[A-Z]{5}[0-9]{4}[A-Z]$')
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_pending_application
  ON vendor_applications (user_id)
  WHERE status IN ('pending', 'approved');

CREATE INDEX IF NOT EXISTS idx_vendor_status
  ON vendor_applications (status);

