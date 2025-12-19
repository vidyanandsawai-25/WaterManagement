import { X, User, FileText, MapPin, Calendar, Clock, Tag, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WaterRipple } from './WaterRipple';

interface ApplicationViewModalProps {
  application: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationViewModal({ application, isOpen, onClose }: ApplicationViewModalProps) {
  if (!application) return null;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm" style={{ fontWeight: 600 }}>
            Pending Verified
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-sm" style={{ fontWeight: 600 }}>
            Installed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-sm" style={{ fontWeight: 600 }}>
            Rejected
          </span>
        );
      case 'under review':
        return (
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm" style={{ fontWeight: 600 }}>
            Pending Verified
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-500 to-slate-600 text-white text-sm" style={{ fontWeight: 600 }}>
            {status}
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[90vw] lg:w-full max-w-4xl bg-white rounded-xl sm:rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-400 via-sky-500 to-cyan-500 px-3 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between border-b border-blue-500 flex-shrink-0 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-white/30 to-white/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white text-sm sm:text-lg truncate" style={{ fontWeight: 700 }}>
                    Application Details
                  </h2>
                  <p className="text-white/90 text-[10px] sm:text-xs truncate" style={{ fontWeight: 500 }}>
                    View Only Mode
                  </p>
                </div>
              </div>
              <WaterRipple color="rgba(239, 68, 68, 0.3)">
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </WaterRipple>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Application Number */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                    <label className="text-gray-900 text-xs mb-2 block" style={{ fontWeight: 600 }}>
                      Ward No / Application No
                    </label>
                    <div className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-600 text-base" style={{ fontWeight: 700 }}>
                        {application.applicationNo}
                      </span>
                    </div>
                  </div>

                  {/* Consumer Number */}
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-4 rounded-xl border border-sky-200">
                    <label className="text-gray-900 text-xs mb-2 block" style={{ fontWeight: 600 }}>
                      Consumer No
                    </label>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-sky-600" />
                      <span className="text-sky-700 text-base" style={{ fontWeight: 700 }}>
                        {application.consumerNo}
                      </span>
                    </div>
                  </div>

                  {/* Applicant Name */}
                  <div className="bg-gradient-to-br from-cyan-50 to-sky-50 p-4 rounded-xl border border-cyan-200">
                    <label className="text-gray-900 text-xs mb-2 block" style={{ fontWeight: 600 }}>
                      Applicant Name
                    </label>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-cyan-600" />
                      <span className="text-slate-700 text-base" style={{ fontWeight: 600 }}>
                        {application.applicantName}
                      </span>
                    </div>
                  </div>

                  {/* Registration Date */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                    <label className="text-gray-900 text-xs mb-2 block" style={{ fontWeight: 600 }}>
                      Registration Date
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="text-slate-700 text-base" style={{ fontWeight: 600 }}>
                        {new Date(application.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Days */}
                  <div className="bg-gradient-to-br from-sky-50 to-cyan-50 p-4 rounded-xl border border-sky-200">
                    <label className="text-gray-900 text-xs mb-2 block" style={{ fontWeight: 600 }}>
                      Days Since Registration
                    </label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-sky-600" />
                      <span className="text-slate-700 text-base" style={{ fontWeight: 600 }}>
                        {application.days} days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Application Details */}
                  <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-xl border border-blue-200">
                    <label className="text-gray-900 text-xs mb-2 block" style={{ fontWeight: 600 }}>
                      Application Info / Department
                    </label>
                    <div className="flex items-start gap-2">
                      <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-base" style={{ fontWeight: 600 }}>
                        {application.details}
                      </span>
                    </div>
                  </div>

                  {/* Application Type */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200">
                    <label className="text-gray-900 text-xs mb-2 block" style={{ fontWeight: 600 }}>
                      Application Type / Stage
                    </label>
                    <div className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-cyan-600" />
                      <span className="text-slate-700 text-base" style={{ fontWeight: 600 }}>
                        {application.stage}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="bg-gradient-to-br from-sky-50 to-cyan-50 p-4 rounded-xl border border-sky-200">
                    <label className="text-gray-900 text-xs mb-2 block" style={{ fontWeight: 600 }}>
                      Current Status
                    </label>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-sky-600" />
                      {getStatusBadge(application.status)}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                    <label className="text-gray-900 text-xs mb-2 block" style={{ fontWeight: 600 }}>
                      Location / Zone
                    </label>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-base" style={{ fontWeight: 600 }}>
                        {application.location}
                      </span>
                    </div>
                  </div>

                  {/* Risk Level */}
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-4 rounded-xl border border-sky-200">
                    <label className="text-gray-900 text-xs mb-2 block" style={{ fontWeight: 600 }}>
                      Priority / Risk Level
                    </label>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-white text-sm ${
                        application.riskLevel === 'High' 
                          ? 'bg-gradient-to-r from-red-500 to-red-600' 
                          : application.riskLevel === 'Medium'
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                          : 'bg-gradient-to-r from-green-500 to-green-600'
                      }`} style={{ fontWeight: 600 }}>
                        {application.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-blue-50 px-6 py-4 border-t border-blue-200 flex items-center justify-end gap-3 flex-shrink-0">
              <WaterRipple color="rgba(59, 130, 246, 0.3)">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-md transition-all"
                  style={{ fontWeight: 600 }}
                >
                  Close
                </button>
              </WaterRipple>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}