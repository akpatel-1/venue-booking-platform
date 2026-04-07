import { CircleCheck, CircleX, Clock3 } from 'lucide-react';

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const APPLICATION_COLUMN_CONFIG = {
  pending: [
    { key: 'pan_name', label: 'PAN Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' },
    { key: 'pincode', label: 'Pincode' },
    { key: 'district', label: 'District' },
    { key: 'state', label: 'State' },
    { key: 'pan_number', label: 'PAN Number' },
    { key: 'submitted_at', label: 'Submitted', formatter: formatDate },
    { key: 'pan_document_url', label: 'Document', type: 'document' },
  ],
  approved: [
    { key: 'pan_name', label: 'PAN Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' },
    { key: 'pincode', label: 'Pincode' },
    { key: 'district', label: 'District' },
    { key: 'state', label: 'State' },
    { key: 'pan_number', label: 'PAN Number' },
    { key: 'submitted_at', label: 'Submitted', formatter: formatDate },
    { key: 'reviewed_at', label: 'Reviewed At', formatter: formatDate },
    { key: 'pan_document_url', label: 'Document', type: 'document' },
  ],
  rejected: [
    { key: 'pan_name', label: 'PAN Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' },
    { key: 'pincode', label: 'Pincode' },
    { key: 'district', label: 'District' },
    { key: 'state', label: 'State' },
    { key: 'pan_number', label: 'PAN Number' },
    { key: 'submitted_at', label: 'Submitted', formatter: formatDate },
    { key: 'reviewed_at', label: 'Reviewed At', formatter: formatDate },
    { key: 'pan_document_url', label: 'Document', type: 'document' },
  ],
};

export const TABLE_VARIANT_CONFIG = {
  pending: {
    icon: Clock3,
    iconColor: 'text-amber-500',
    headerBg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
  },
  approved: {
    icon: CircleCheck,
    iconColor: 'text-emerald-500',
    headerBg: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
  },
  rejected: {
    icon: CircleX,
    iconColor: 'text-red-500',
    headerBg: 'bg-red-50',
    borderColor: 'border-red-200',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
  },
};
