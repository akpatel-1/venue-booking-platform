import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheck, FiUpload, FiX } from 'react-icons/fi';
import { IoWarningOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { vendorApi } from '../../api/vendor.api';
import logo from '../../assets/logo.svg';

const registrationSchema = z.object({
  business_name: z.string().min(2, 'Business name is required'),
  venue_type: z.string().min(1, 'Select a venue type'),
  gst_number: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i,
      'Invalid GST format'
    )
    .optional()
    .or(z.literal('')),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid 10-digit phone number'),
  address: z.string().min(5, 'Full address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(1, 'Select a state'),
  pincode: z.string().regex(/^\d{6}$/, 'Must be exactly 6 digits'),
});

const STATES = [
  'Maharastra',
  'Chhattisgarh',
  'Madhya Pradesh',
  'Kerala',
  'Goa',
];
const VENUE_TYPES = [
  'Sports Turf',
  'Water Park',
  'Activity Zone',
  'Gaming Zone',
  'Adventure Park',
  'Kids Play Zone',
  'Other',
];

function Field({ label, error, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7267]">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[10px] text-red-500 mt-0.5">{error.message}</p>
      )}
    </div>
  );
}

export default function ApplicationFromPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      setFileError('Max 5MB allowed');
      setFile(null);
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(f.type)) {
      setFileError('JPG, or PNG only');
      setFile(null);
      return;
    }
    setFileError('');
    setFile(f);
  };

  const onSubmit = async (data) => {
    if (!file) return setFileError('Document is required');
    setSubmitError('');
    setLoading(true);
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(
        key,
        key === 'gst_number' ? data[key]?.toUpperCase() : data[key]
      );
    });
    formData.append('document', file);
    try {
      await vendorApi.postApplication(formData);
      navigate('/partners/application/status');
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message || 'Something went wrong during submission'
      );
    } finally {
      setLoading(false);
    }
  };

  const inp = (err) =>
    `w-full px-3 py-2 rounded-lg border text-xs bg-white outline-none transition-all duration-150 ${
      err
        ? 'border-red-300 focus:border-red-400 bg-red-50'
        : 'border-[#e0dbd4] focus:border-[#0d0d0d] focus:ring-2 focus:ring-[#0d0d0d]/8'
    }`;

  return (
    <div className="fixed inset-0 bg-[#faf8f5] flex overflow-hidden">
      {/* LEFT — Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between w-120 shrink-0 bg-[#0d0d0d] text-white p-10 relative overflow-hidden">
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

      {/* RIGHT — Form Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 bg-[#ff4d1c] shrink-0" />

        <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 overflow-hidden">
          <header className="mb-5 shrink-0">
            <h2 className="text-xl font-black uppercase italic text-[#0d0d0d]">
              Register Your Business
            </h2>
            <p className="text-xs text-[#7a7267] mt-1">
              All fields marked are required unless stated optional.
            </p>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-0 flex-1 min-h-0"
          >
            <fieldset
              disabled={loading}
              className="flex flex-col gap-3 flex-1 min-h-0"
            >
              {submitError && (
                <div className="shrink-0 p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg flex gap-2 items-center">
                  <IoWarningOutline className="shrink-0" /> {submitError}
                </div>
              )}

              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-3 shrink-0">
                <Field
                  label="Business Name"
                  error={errors.business_name}
                  className="col-span-2 sm:col-span-1"
                >
                  <input
                    {...register('business_name')}
                    placeholder="Phoenix Sports Arena"
                    className={inp(errors.business_name)}
                  />
                </Field>
                <Field
                  label="Venue Type"
                  error={errors.venue_type}
                  className="col-span-2 sm:col-span-1"
                >
                  <select
                    {...register('venue_type')}
                    className={inp(errors.venue_type)}
                  >
                    <option value="">Select type</option>
                    {VENUE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-3 shrink-0">
                <Field label="Phone Number" error={errors.phone}>
                  <input
                    {...register('phone')}
                    maxLength={10}
                    placeholder="9876543210"
                    className={inp(errors.phone)}
                  />
                </Field>
                <Field label="GST Number (Optional)" error={errors.gst_number}>
                  <input
                    {...register('gst_number')}
                    placeholder="29ABCDE1234F1Z5"
                    className={`${inp(errors.gst_number)} uppercase`}
                  />
                </Field>
              </div>

              {/* Row 3 */}
              <div className="shrink-0">
                <Field label="Street Address" error={errors.address}>
                  <input
                    {...register('address')}
                    placeholder="Building, Street name, Area"
                    className={inp(errors.address)}
                  />
                </Field>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-3 gap-3 shrink-0">
                <Field label="State" error={errors.state}>
                  <select {...register('state')} className={inp(errors.state)}>
                    <option value="">State</option>
                    {STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="City" error={errors.city}>
                  <input
                    {...register('city')}
                    placeholder="City"
                    className={inp(errors.city)}
                  />
                </Field>
                <Field label="Pincode" error={errors.pincode}>
                  <input
                    {...register('pincode')}
                    maxLength={6}
                    placeholder="492001"
                    className={inp(errors.pincode)}
                  />
                </Field>
              </div>

              {/* Row 5 — Upload */}
              <div className="shrink-0">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7267] block mb-0.5">
                  Business Document (Proof)
                </label>
                <label
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border cursor-pointer hover:bg-[#fff8f5] transition-all duration-150 ${
                    fileError
                      ? 'border-red-300 bg-red-50'
                      : 'border-[#e0dbd4] border-dashed hover:border-[#ff4d1c]'
                  }`}
                >
                  <FiUpload className="text-[#7a7267] shrink-0" size={14} />
                  <span className="text-xs text-[#7a7267] truncate flex-1">
                    {file ? file.name : 'Upload PDF or Image (max 5MB)'}
                  </span>
                  {file && (
                    <FiX
                      size={14}
                      className="text-[#7a7267] hover:text-red-500 shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                    />
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFile}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
                {fileError && (
                  <p className="text-[10px] text-red-500 mt-0.5">{fileError}</p>
                )}
              </div>

              {/* Submit */}
              <div className="shrink-0 pt-1">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#ff4d1c] text-white font-bold text-sm rounded-xl border-b-4 border-[#0d0d0d] active:border-b-0 active:translate-y-1 transition-all duration-100 hover:bg-[#e8431a]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Processing…
                    </span>
                  ) : (
                    'Submit Application →'
                  )}
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
