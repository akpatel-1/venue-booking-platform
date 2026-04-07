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
  district: z.string().min(2, 'District is required'),
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
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b7a62]">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[10px] text-red-500 mt-0.5">{error.message}</p>
      )}
    </div>
  );
}

export default function VendorAppPage() {
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
      'district',
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
      await vendorApi.postVendorApplication(formData, {
        skipAuthRedirect: true,
      });
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
    `w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#2b241a] placeholder:text-[#a2937d] bg-[#fffdf8] outline-none transition-all duration-150 ${
      err
        ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200'
        : 'border-[#ead9c2] hover:border-[#f0c992] focus:border-[#ffaf52] focus:ring-2 focus:ring-[#ffdca8]'
    }`;

  return (
    <div className="fixed inset-0 bg-linear-to-b from-[#fff7ec] to-[#fffdf8] flex overflow-hidden">
      <KycLeftBg />

      {/* RIGHT — Form Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto px-6 py-10 sm:px-10 lg:px-14">
          <div className="mx-auto w-full max-w-5xl rounded-3xl border border-[#ead9c2] bg-[#fffaf1]/95 p-6 shadow-[0_16px_40px_rgba(67,44,10,0.12)] sm:p-8 lg:p-10">
            <header className="mb-7 shrink-0 border-b border-[#f0e2ce] pb-5">
              <span className="inline-flex items-center rounded-full border border-[#f0d6a8] bg-[#ffe8c4] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6a5435]">
                Partner onboarding
              </span>
              <h2 className="mt-3 text-2xl font-black uppercase italic tracking-tight text-[#2b241a]">
                Vendor KYC Verification
              </h2>
              <p className="text-sm text-[#7a7267] mt-2 max-w-xl leading-relaxed">
                Fill in your details and upload your PAN document to continue.
              </p>
            </header>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-0"
            >
              <fieldset disabled={loading} className="flex flex-col gap-4">
                {submitError && (
                  <div className="shrink-0 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex gap-2 items-center">
                    <TriangleAlert className="shrink-0 text-lg" /> {submitError}
                  </div>
                )}

                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-3.5 shrink-0">
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
                      placeholder="Enter first name"
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
                <div className="grid grid-cols-2 gap-3.5 shrink-0">
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 shrink-0">
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
                  <Field label="District" error={errors.district}>
                    <input
                      {...register('district')}
                      placeholder="District"
                      className={inp(errors.district)}
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
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b7a62] block mb-1">
                    PAN Document
                  </label>
                  <label
                    className={`group flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-all duration-150 ${
                      fileError
                        ? 'border-red-500 bg-red-50'
                        : 'border-[#ead9c2] border-dashed bg-[#fffdf8] hover:border-[#ffaf52] hover:bg-[#fff4e3]'
                    }`}
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#fff1dd] text-[#7a7267] transition-colors duration-150 group-hover:bg-[#ffaf52] group-hover:text-[#2b241a]">
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
                    className="w-full py-3 bg-[#ffaf52] text-[#2b241a] font-bold text-sm rounded-xl border border-[#f0c992] shadow-[0_6px_0_#d78c36] active:translate-y-0.5 active:shadow-[0_3px_0_#d78c36] transition-all duration-100 hover:bg-[#ffa73f] disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-[#2b241a]"
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
                        Processing...
                      </span>
                    ) : (
                      'Submit Verification'
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
