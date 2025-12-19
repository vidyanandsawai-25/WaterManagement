import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { X, FileText, CheckCircle, Pen, ShieldCheck, Download, IndianRupee } from 'lucide-react';
import { WaterRipple } from './WaterRipple';
import { toast } from 'sonner@2.0.3';
import { motion, AnimatePresence } from 'motion/react';
import { VisuallyHidden } from './ui/visually-hidden';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface ReviewNotesheetModalProps {
  application: any;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (approvalData: { officerName: string; remarks: string }) => void;
  onReject: (rejectionData: { officerName: string; remarks: string }) => void;
  currentOfficerRole: string;
  approvalLevel: number; // 1, 2, or 3
}

export function ReviewNotesheetModal({ 
  application, 
  isOpen, 
  onClose, 
  onApprove,
  onReject,
  currentOfficerRole,
  approvalLevel
}: ReviewNotesheetModalProps) {
  const [officerName, setOfficerName] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isDigitallySigned, setIsDigitallySigned] = useState(false);

  if (!application) return null;

  const handleDigitalSign = () => {
    if (!officerName.trim()) {
      toast.error('❌ Please enter your full name first!');
      return;
    }

    // Simulate digital signing process
    setIsDigitallySigned(true);
    toast.success('✅ Digital signature applied successfully!', {
      description: 'Your signature has been recorded with timestamp.',
    });
  };

  const handleApproveClick = () => {
    if (!isDigitallySigned) {
      toast.error('❌ Please digitally sign the notesheet first!');
      return;
    }

    if (!officerName.trim()) {
      toast.error('❌ Please enter your full name!');
      return;
    }

    onApprove({
      officerName: officerName.trim(),
      remarks: remarks.trim()
    });

    // Reset form
    setOfficerName('');
    setRemarks('');
    setIsDigitallySigned(false);
  };

  const handleRejectClick = () => {
    if (!officerName.trim()) {
      toast.error('❌ Please enter your full name!');
      return;
    }

    if (!remarks.trim()) {
      toast.error('❌ Please provide remarks for rejection!');
      return;
    }

    onReject({
      officerName: officerName.trim(),
      remarks: remarks.trim()
    });

    // Reset form
    setOfficerName('');
    setRemarks('');
    setIsDigitallySigned(false);
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getCurrentTime = () => {
    const date = new Date();
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] sm:w-[85vw] !max-w-[1000px] h-auto max-h-[90vh] p-0 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 border-3 border-blue-400 shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>Review Notesheet - Level {approvalLevel} Approval</DialogTitle>
          <DialogDescription>
            Application No: {application.applicationNo} • {currentOfficerRole}
          </DialogDescription>
        </VisuallyHidden>
        
        {/* Content */}
        <div className="p-3 md:p-4 lg:p-5 max-h-[90vh] overflow-y-auto">
          {/* Header Badge */}
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm md:text-base" style={{ fontWeight: 800 }}>
                  Level {approvalLevel} Approval Required
                </h3>
                <p className="text-xs text-blue-100">
                  {currentOfficerRole} • Review and approve notesheet
                </p>
              </div>
              <div className="px-3 py-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                <span className="text-xs" style={{ fontWeight: 700 }}>Pending Your Action</span>
              </div>
            </div>
          </div>

          {/* Digital Notesheet Preview */}
          <div className="bg-white rounded-lg shadow-xl border-3 border-blue-300 overflow-hidden mb-4">
            {/* Notesheet Header */}
            <div className="bg-gradient-to-r from-blue-500 via-sky-600 to-cyan-600 text-white px-3 md:px-4 py-2 md:py-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 md:w-5 md:h-5" />
                  <div>
                    <h3 className="text-sm md:text-base" style={{ fontWeight: 800 }}>Official Notesheet</h3>
                    <p className="text-[10px] text-blue-100">Akola Municipal Corporation - Water Department</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-[10px] text-blue-100">Date: {getCurrentDate()}</div>
                  <div className="text-[10px] text-blue-100">Time: {getCurrentTime()}</div>
                </div>
              </div>
            </div>

            {/* Notesheet Content */}
            <div className="p-3 md:p-4 space-y-3 bg-gradient-to-br from-white to-blue-50">
              {/* Application Details Section */}
              <div className="border-2 border-blue-200 rounded-lg p-2.5 md:p-3 bg-white/80 backdrop-blur-sm">
                <h4 className="text-blue-900 mb-2 flex items-center gap-2 text-xs md:text-sm" style={{ fontWeight: 800 }}>
                  <FileText className="w-3.5 h-3.5" />
                  Application Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded p-2 border border-blue-200">
                    <div className="text-[10px] text-blue-600 mb-0.5" style={{ fontWeight: 700 }}>Application No</div>
                    <div className="text-blue-900 text-xs" style={{ fontWeight: 800 }}>{application.applicationNo}</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded p-2 border border-purple-200">
                    <div className="text-[10px] text-purple-600 mb-0.5" style={{ fontWeight: 700 }}>Consumer No</div>
                    <div className="text-purple-900 text-xs" style={{ fontWeight: 800 }}>{application.consumerNo}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded p-2 border border-blue-200">
                    <div className="text-[10px] text-blue-600 mb-0.5" style={{ fontWeight: 700 }}>Applicant Name</div>
                    <div className="text-blue-900 text-xs" style={{ fontWeight: 800 }}>{application.applicantName}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded p-2 border border-blue-200">
                    <div className="text-[10px] text-blue-600 mb-0.5" style={{ fontWeight: 700 }}>Application Type</div>
                    <div className="text-blue-900 text-xs" style={{ fontWeight: 800 }}>{application.applicationType || application.details}</div>
                  </div>
                </div>
              </div>

              {/* Inspection & Verification */}
              <div className="border-2 border-blue-200 rounded-lg p-2.5 md:p-3 bg-white/80 backdrop-blur-sm">
                <h4 className="text-blue-900 mb-2 flex items-center gap-2 text-xs md:text-sm" style={{ fontWeight: 800 }}>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Inspection & Verification Report
                </h4>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span style={{ fontWeight: 700 }}>Site Inspection: </span>
                      <span className="text-slate-700">Completed successfully on {getCurrentDate()}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span style={{ fontWeight: 700 }}>Document Verification: </span>
                      <span className="text-slate-700">All documents verified and found valid</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span style={{ fontWeight: 700 }}>Feasibility Check: </span>
                      <span className="text-slate-700">Connection feasible as per technical norms</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span style={{ fontWeight: 700 }}>Zone/Ward Verification: </span>
                      <span className="text-slate-700">{application.zoneNo || 'Zone A'}, Ward {application.wardNo || '5'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Details - Only for Alteration Applications */}
              {(application.applicationType === 'Alteration' || application.details === 'Alteration') && (
                <div className="border-2 border-purple-200 rounded-lg p-3 md:p-4 bg-white/80 backdrop-blur-sm">
                  <h4 className="text-purple-900 mb-3 flex items-center gap-2 text-sm md:text-base" style={{ fontWeight: 800 }}>
                    <IndianRupee className="w-4 h-4" />
                    Tax Details Summary
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {/* Pending Tax Summary */}
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 border-2 border-amber-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded bg-amber-500 text-white flex items-center justify-center">
                          <IndianRupee className="w-3.5 h-3.5" />
                        </div>
                        <h5 className="text-amber-900 text-sm" style={{ fontWeight: 800 }}>Pending Tax</h5>
                      </div>
                      <div className="text-center py-2">
                        <div className="text-2xl text-amber-700" style={{ fontWeight: 800 }}>₹1,690</div>
                      </div>
                    </div>

                    {/* Running Tax Summary */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border-2 border-blue-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded bg-blue-500 text-white flex items-center justify-center">
                          <IndianRupee className="w-3.5 h-3.5" />
                        </div>
                        <h5 className="text-blue-900 text-sm" style={{ fontWeight: 800 }}>Running Tax</h5>
                      </div>
                      <div className="text-center py-2">
                        <div className="text-2xl text-blue-700" style={{ fontWeight: 800 }}>₹16,416</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-900" style={{ fontWeight: 700 }}>
                      Total Payable Amount: <span className="text-purple-700 text-sm" style={{ fontWeight: 800 }}>₹18,106</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Previous Approvals */}
              {application.approvalData && application.approvalData.length > 0 && (
                <div className="border-2 border-green-200 rounded-lg p-3 bg-gradient-to-br from-green-50 to-green-50">
                  <h4 className="text-green-900 mb-2 flex items-center gap-2 text-xs" style={{ fontWeight: 800 }}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Previous Approvals
                  </h4>
                  <div className="space-y-2">
                    {application.approvalData
                      .filter((approval: any) => approval.status === 'approved')
                      .map((approval: any, index: number) => (
                        <div key={index} className="bg-white rounded p-2 border border-green-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <div>
                                <div className="text-xs" style={{ fontWeight: 700 }}>{approval.officerRole}</div>
                                <div className="text-[10px] text-slate-600">{approval.approvedByName}</div>
                              </div>
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {approval.actionDate && new Date(approval.actionDate).toLocaleString('en-IN')}
                            </div>
                          </div>
                          {approval.remarks && (
                            <div className="mt-1 text-[10px] text-slate-600 italic">"{approval.remarks}"</div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Recommendation */}
              <div className="border-2 border-blue-200 rounded-lg p-3 bg-gradient-to-br from-blue-50 to-blue-50">
                <h4 className="text-blue-900 mb-1.5 flex items-center gap-2 text-xs" style={{ fontWeight: 800 }}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Officer's Recommendation
                </h4>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Based on the site inspection and document verification, the application is found to be in order. 
                  All technical and administrative requirements have been fulfilled. The application is recommended for approval.
                </p>
              </div>
            </div>

            {/* Notesheet Footer */}
            <div className="bg-gradient-to-r from-slate-100 to-slate-200 px-4 md:px-6 py-3 border-t-2 border-slate-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-xs">Generated automatically by Akola Municipal CRM System</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                  <span className="text-xs">Secure & Encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Approval Action Section */}
          <div className="bg-white rounded-lg shadow-xl border-3 border-indigo-300 overflow-hidden p-4">
            <h3 className="text-indigo-900 mb-3 flex items-center gap-2" style={{ fontWeight: 800 }}>
              <Pen className="w-5 h-5" />
              Your Approval Action
            </h3>

            <div className="space-y-3">
              {/* Officer Name */}
              <div>
                <label className="block text-sm mb-1.5" style={{ fontWeight: 700, color: '#000' }}>
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  placeholder="Enter your full name"
                  className="border-2 border-blue-300 focus:border-blue-500"
                />
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm mb-1.5" style={{ fontWeight: 700, color: '#000' }}>
                  Remarks / Comments
                </label>
                <Textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Add your remarks or comments (optional for approval, required for rejection)"
                  rows={3}
                  className="border-2 border-blue-300 focus:border-blue-500"
                />
              </div>

              {/* Digital Sign Button */}
              <div>
                <WaterRipple color="rgba(99, 102, 241, 0.3)">
                  <Button
                    onClick={handleDigitalSign}
                    disabled={isDigitallySigned || !officerName.trim()}
                    className={`w-full ${
                      isDigitallySigned 
                        ? 'bg-gradient-to-r from-green-500 to-green-600' 
                        : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
                    } text-white py-2.5 rounded-lg shadow-lg`}
                  >
                    {isDigitallySigned ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Digitally Signed ✓
                      </>
                    ) : (
                      <>
                        <Pen className="w-4 h-4 mr-2" />
                        Apply Digital Signature
                      </>
                    )}
                  </Button>
                </WaterRipple>
              </div>

              {/* Digital Signature Confirmation */}
              <AnimatePresence>
                {isDigitallySigned && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="border-2 border-green-400 rounded-lg p-3 bg-gradient-to-br from-green-50 to-green-100"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <h4 className="text-green-900 text-sm" style={{ fontWeight: 800 }}>Digital Signature Applied</h4>
                    </div>
                    <div className="text-xs text-green-800 space-y-1">
                      <div><span style={{ fontWeight: 700 }}>Signed By:</span> {officerName}</div>
                      <div><span style={{ fontWeight: 700 }}>Role:</span> {currentOfficerRole}</div>
                      <div><span style={{ fontWeight: 700 }}>Timestamp:</span> {getCurrentDate()} at {getCurrentTime()}</div>
                      <div className="mt-2 pt-2 border-t border-green-300">
                        <ShieldCheck className="inline w-3 h-3 mr-1 text-green-600" />
                        <span style={{ fontWeight: 700 }}>Legally valid as per IT Act 2000</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 mt-4">
            <WaterRipple color="rgba(100, 116, 139, 0.3)">
              <Button
                onClick={onClose}
                variant="outline"
                className="border-2 border-slate-400 text-slate-700 hover:bg-slate-100 px-6 md:px-8 py-2.5 rounded-lg shadow-md w-full sm:w-auto"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </WaterRipple>

            <WaterRipple color="rgba(239, 68, 68, 0.3)">
              <Button
                onClick={handleRejectClick}
                variant="outline"
                className="border-2 border-red-500 text-red-700 hover:bg-red-50 px-6 md:px-8 py-2.5 rounded-lg shadow-md w-full sm:w-auto"
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </WaterRipple>

            <WaterRipple color="rgba(34, 197, 94, 0.3)">
              <Button
                onClick={handleApproveClick}
                disabled={!isDigitallySigned}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 md:px-10 py-2.5 rounded-lg shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-5 h-5" />
                <span style={{ fontWeight: 800 }}>Approve Notesheet</span>
              </Button>
            </WaterRipple>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
