import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaChevronDown } from 'react-icons/fa';

const REJECTION_REASONS = [
  'Invalid business information',
  'Document not clear',
  'Incomplete documentation',
  'Duplicate request',
  'Failed verification',
  'Other',
];

const DROPDOWN_WIDTH = 320;
const VIEWPORT_GUTTER = 12;
const DROPDOWN_OFFSET = 8;
const DROPDOWN_ESTIMATED_HEIGHT = 360;

export default function RejectModal({
  onConfirm,
  onCancel,
  disabled = false,
  isDarkMode = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    width: DROPDOWN_WIDTH,
  });
  const isOtherReason = selectedReason === 'Other';
  const submitReason = isOtherReason ? customReason.trim() : selectedReason;

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      const target = event.target;
      if (buttonRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updateMenuPosition = () => {
      const rect = buttonRef.current.getBoundingClientRect();
      const maxWidth = Math.min(
        DROPDOWN_WIDTH,
        window.innerWidth - VIEWPORT_GUTTER * 2
      );
      let left = rect.right - maxWidth;
      left = Math.max(
        VIEWPORT_GUTTER,
        Math.min(left, window.innerWidth - maxWidth - VIEWPORT_GUTTER)
      );

      let top = rect.bottom + DROPDOWN_OFFSET;
      const wouldOverflowBottom =
        top + DROPDOWN_ESTIMATED_HEIGHT > window.innerHeight - VIEWPORT_GUTTER;

      if (wouldOverflowBottom) {
        top = Math.max(
          VIEWPORT_GUTTER,
          rect.top - DROPDOWN_ESTIMATED_HEIGHT - DROPDOWN_OFFSET
        );
      }

      setMenuPosition({ top, left, width: maxWidth });
    };

    updateMenuPosition();

    window.addEventListener('resize', updateMenuPosition);
    window.addEventListener('scroll', updateMenuPosition, true);

    return () => {
      window.removeEventListener('resize', updateMenuPosition);
      window.removeEventListener('scroll', updateMenuPosition, true);
    };
  }, [isOpen, isOtherReason]);

  const handleSubmit = () => {
    if (!submitReason) return;
    onConfirm?.(submitReason);
    setIsOpen(false);
    setSelectedReason('');
    setCustomReason('');
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedReason('');
    setCustomReason('');
    onCancel?.();
  };

  return (
    <div
      className="inline-block text-left"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          if (disabled) return;
          setIsOpen((value) => !value);
        }}
        disabled={disabled}
        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center gap-2 disabled:opacity-50"
      >
        Reject
        <FaChevronDown
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className={`z-50 rounded-lg border shadow-lg ${
              isDarkMode
                ? 'border-slate-700 bg-slate-900'
                : 'border-gray-200 bg-white'
            }`}
            style={{
              position: 'fixed',
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              width: `${menuPosition.width}px`,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className={`border-b px-4 py-3 ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              }`}
            >
              <h3
                className={`text-sm font-semibold ${
                  isDarkMode ? 'text-slate-100' : 'text-gray-900'
                }`}
              >
                Select rejection reason
              </h3>
            </div>

            <div className="p-4 space-y-3">
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {REJECTION_REASONS.map((reason) => (
                  <label
                    key={reason}
                    className={`flex cursor-pointer items-center gap-2 text-sm ${
                      isDarkMode ? 'text-slate-300' : 'text-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="rejectionReason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={(event) =>
                        setSelectedReason(event.target.value)
                      }
                      className="h-4 w-4 text-red-600"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>

              {isOtherReason && (
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Please specify the reason for rejection..."
                  autoFocus
                  className={`w-full resize-none rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    isDarkMode
                      ? 'border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500'
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                  rows="3"
                />
              )}
            </div>

            <div
              className={`flex justify-end gap-2 border-t px-4 py-3 ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              }`}
            >
              <button
                type="button"
                onClick={handleCancel}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                  isDarkMode
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-800'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!submitReason}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium text-white transition-colors ${
                  submitReason
                    ? 'bg-red-500 hover:bg-red-600'
                    : isDarkMode
                      ? 'bg-slate-700'
                      : 'bg-gray-300'
                }`}
              >
                Submit
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
