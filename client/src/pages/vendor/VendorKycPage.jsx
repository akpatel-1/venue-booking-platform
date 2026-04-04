import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { TriangleAlert, Upload, X } from 'lucide-react';
import * as z from 'zod';

import { vendorApi } from '../../api/vendor.api';
import KycLeftBg from '../../components/application/KycLeftBg';
import AuthForm from '../../components/auth/AuthForm';

const kycSchema = z.object({
  name: z
    .string()
    .min(2, 'Name is required')
    .transform((val) => val.toUpperCase()),
  surname: z
    .string()
    .min(2, 'Surname is required')
    .transform((val) => val.toUpperCase()),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid 10-digit phone number'),
  pan_number: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i, 'Invalid PAN format'),
  address: z.string().min(5, 'Full address is required'),
  state: z.string().min(1, 'Select a state'),
  city: z.string().min(2, 'City is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Must be exactly 6 digits'),
});

const STATES = [
  'Andhra Pradesh',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Tamil Nadu',
  'Telangana',
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

export default function VendorKycPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingSubmissionData, setPendingSubmissionData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(kycSchema),
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
    if (!file) {
      setFileError('PAN Document is required');
      return;
    }

    setSubmitError('');
    setLoading(true);

    const formData = new FormData();

    formData.append('pan_name', `${data.name} ${data.surname}`.toUpperCase());

    const fieldsToAppend = [
      'phone',
      'pan_number',
      'address',
      'state',
      'city',
      'pincode',
    ];
    fieldsToAppend.forEach((key) => {
      const value = data[key];
      if (key === 'pan_number') {
        formData.append(key, value?.toUpperCase());
      } else {
        formData.append(key, value);
      }
    });
    formData.append('pan_document', file);

    try {
      await vendorApi.postKycApplication(formData, { skipAuthRedirect: true });
      setPendingSubmissionData(null);
      navigate('/partners/application/status');
    } catch (err) {
      if (err.response?.status === 401) {
        setPendingSubmissionData(data);
        setShowAuthModal(true);
        return;
      }
      setSubmitError(
        err?.response?.data?.message || 'Something went wrong during submission'
      );
    } finally {
      setLoading(false);
    }
  };

  const inp = (err) =>
    `w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#1f1a16] placeholder:text-[#9b9386] bg-[#fffdfa] outline-none transition-all duration-150 ${
      err
        ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200'
        : 'border-blue-400 hover:border-blue-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
    }`;

  return (
    <div className="fixed inset-0 bg-[#faf8f5] flex overflow-hidden">
      <KycLeftBg />

      {/* RIGHT — Form Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 bg-[#ff4d1c] shrink-0" />

        <div className="flex-1 overflow-auto px-6 py-10 sm:px-10 lg:px-14">
          <div className="mx-auto w-full max-w-5xl rounded-2xl border border-[#e6dfd4] bg-[#fffaf3] p-5 shadow-[0_8px_26px_rgba(0,0,0,0.06)] sm:p-7">
            <header className="mb-5 shrink-0">
              <h2 className="text-xl font-black uppercase italic text-[#0d0d0d]">
                Vendor KYC Verification
              </h2>
              <p className="text-xs text-[#7a7267] mt-1">
                Fill in your details and upload your PAN document to continue.
              </p>
            </header>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-0"
            >
              <fieldset disabled={loading} className="flex flex-col gap-3">
                {submitError && (
                  <div className="shrink-0 p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg flex gap-2 items-center">
                    <TriangleAlert className="shrink-0 text-lg" /> {submitError}
                  </div>
                )}

                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-3 shrink-0">
                  <Field
                    label="First Name on PAN"
                    error={errors.name}
                    className="col-span-2 sm:col-span-1"
                  >
                    <input
                      {...register('name', {
                        onChange: (e) => {
                          e.target.value = e.target.value.toUpperCase();
                        },
                      })}
                      placeholder="Enter first name "
                      className={`${inp(errors.name)} uppercase`}
                    />
                  </Field>
                  <Field
                    label="Last name on PAN"
                    error={errors.surname}
                    className="col-span-2 sm:col-span-1"
                  >
                    <input
                      {...register('surname', {
                        onChange: (e) => {
                          e.target.value = e.target.value.toUpperCase();
                        },
                      })}
                      placeholder="Enter last name"
                      className={`${inp(errors.surname)} uppercase`}
                    />
                  </Field>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-3 shrink-0">
                  <Field
                    label="Phone Number"
                    error={errors.phone}
                    className="col-span-2 sm:col-span-1"
                  >
                    <input
                      {...register('phone')}
                      maxLength={10}
                      placeholder="9876543210"
                      className={inp(errors.phone)}
                    />
                  </Field>
                  <Field
                    label="PAN Number"
                    error={errors.pan_number}
                    className="col-span-2 sm:col-span-1"
                  >
                    <input
                      {...register('pan_number')}
                      maxLength={10}
                      placeholder="ABCDE1234F"
                      className={`${inp(errors.pan_number)} uppercase`}
                    />
                  </Field>
                </div>

                {/* Row 3 — Address */}
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
                    <select
                      {...register('state')}
                      className={inp(errors.state)}
                    >
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
                    PAN Document
                  </label>
                  <label
                    className={`group flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-all duration-150 ${
                      fileError
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 border-dashed bg-white hover:border-indigo-500 hover:bg-indigo-50'
                    }`}
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f6efe4] text-[#7a7267] transition-colors duration-150 group-hover:bg-[#ffe6dc] group-hover:text-[#ff4d1c]">
                      <Upload size={14} />
                    </span>
                    <span className="text-xs text-[#7a7267] truncate flex-1">
                      {file ? file.name : 'Upload JPG or PNG (max 5MB)'}
                    </span>
                    {file && (
                      <button
                        type="button"
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[#7a7267] transition-colors duration-150 hover:bg-red-50 hover:text-red-500"
                        onClick={(e) => {
                          e.preventDefault();
                          setFile(null);
                        }}
                        aria-label="Remove uploaded file"
                      >
                        <X size={14} />
                      </button>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFile}
                      accept="image/jpeg,image/png"
                    />
                  </label>
                  {fileError && (
                    <p className="text-[10px] text-red-500 mt-0.5">
                      {fileError}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="shrink-0 pt-1">
                  <button
                    type="submit"
                    disabled={loading}
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
                      'Submit Verification →'
                    )}
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      {showAuthModal && (
        <AuthForm
          isModal
          showClose
          exitType="close"
          onClose={() => setShowAuthModal(false)}
          onSuccess={async () => {
            setShowAuthModal(false);
            await onSubmit(pendingSubmissionData);
          }}
        />
      )}
    </div>
  );
}
