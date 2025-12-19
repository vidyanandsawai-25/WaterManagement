import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { X, FileText, CheckCircle, ShieldCheck, IndianRupee, Eye } from 'lucide-react';
import { WaterRipple } from './WaterRipple';
import { VisuallyHidden } from './ui/visually-hidden';

interface SendApprovalPreviewModalProps {
  application: any;
  isOpen: boolean;
  onClose: () => void;
  onProceedToApproval: () => void;
  currentOfficerRole: string;
  approvalLevel: number;
}

export function SendApprovalPreviewModal({ 
  application, 
  isOpen, 
  onClose, 
  onProceedToApproval,
  currentOfficerRole,
  approvalLevel
}: SendApprovalPreviewModalProps) {
  if (!application) return null;

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
      <DialogContent className="w-[90vw] sm:w-[85vw] !max-w-[900px] h-auto max-h-[90vh] p-0 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 border-3 border-blue-400 shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>Send to Approval - Preview</DialogTitle>
          <DialogDescription>
            Review application details before proceeding to approval - Application No: {application.applicationNo}
          </DialogDescription>
        </VisuallyHidden>
        
        {/* Content */}
        <div className="p-3 md:p-4 lg:p-5 max-h-[90vh] overflow-y-auto">
          {/* Header Badge */}
          <div className="mb-4 p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm md:text-base" style={{ fontWeight: 800 }}>
                  <Eye className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
                  Send to Approval - Preview Screen
                </h3>
                <p className="text-xs text-amber-100">
                  Please review all details before proceeding to the approval workflow
                </p>
              </div>
              <div className="px-3 py-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                <span className="text-xs" style={{ fontWeight: 700 }}>Level {approvalLevel} Pending</span>
              </div>
            </div>
          </div>

          {/* Notice Banner */}
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-400 rounded-lg">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-blue-900 text-sm mb-1" style={{ fontWeight: 800 }}>
                  Important Notice
                </h4>
                <p className="text-xs text-blue-800 leading-relaxed">
                  This is a preview of the application that will be sent for {currentOfficerRole} approval. 
                  Please verify all the details carefully. After reviewing, click <strong>"Proceed to Approval"</strong> to 
                  open the digital approval form where you can sign and approve this application.
                </p>
              </div>
            </div>
          </div>

          {/* Application Summary Card */}
          <div className="bg-white rounded-lg shadow-xl border-3 border-blue-300 overflow-hidden mb-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 via-sky-600 to-cyan-600 text-white px-3 md:px-4 py-2 md:py-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 md:w-5 md:h-5" />
                  <div>
                    <h3 className="text-sm md:text-base" style={{ fontWeight: 800 }}>Application Summary</h3>
                    <p className="text-[10px] text-blue-100">Akola Municipal Corporation - Water Department</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-[10px] text-blue-100">Date: {getCurrentDate()}</div>
                  <div className="text-[10px] text-blue-100">Time: {getCurrentTime()}</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 md:p-4 space-y-3 bg-gradient-to-br from-white to-blue-50">
              {/* Application Details */}
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

              {/* Current Status */}
              <div className="border-2 border-purple-200 rounded-lg p-2.5 md:p-3 bg-white/80 backdrop-blur-sm">
                <h4 className="text-purple-900 mb-2 flex items-center gap-2 text-xs md:text-sm" style={{ fontWeight: 800 }}>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Current Workflow Status
                </h4>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ fontWeight: 700 }}>Application Status:</span>
                    <span className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded" style={{ fontWeight: 800 }}>
                      {application.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ fontWeight: 700 }}>Current Approval Level:</span>
                    <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded" style={{ fontWeight: 800 }}>
                      Level {approvalLevel} - {currentOfficerRole}
                    </span>
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
            </div>

            {/* Footer */}
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

          {/* Next Steps Info */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-lg p-4 mb-4">
            <h4 className="text-indigo-900 text-sm mb-2 flex items-center gap-2" style={{ fontWeight: 800 }}>
              <ShieldCheck className="w-4 h-4" />
              Next Steps
            </h4>
            <ul className="text-xs text-indigo-800 space-y-1.5 ml-6">
              <li className="list-disc">Click "Proceed to Approval" to open the digital approval form</li>
              <li className="list-disc">Enter your full name and optional remarks</li>
              <li className="list-disc">Apply your digital signature</li>
              <li className="list-disc">Click "Approve Notesheet" to complete the approval process</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4">
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

            <WaterRipple color="rgba(99, 102, 241, 0.3)">
              <Button
                onClick={onProceedToApproval}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 md:px-10 py-2.5 rounded-lg shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <CheckCircle className="w-5 h-5" />
                <span style={{ fontWeight: 800 }}>Proceed to Approval</span>
              </Button>
            </WaterRipple>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
