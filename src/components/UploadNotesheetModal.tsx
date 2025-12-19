import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Upload, X, FileText, CheckCircle, FileCheck, Pen, ShieldCheck, Download, IndianRupee, Activity } from 'lucide-react';
import { WaterRipple } from './WaterRipple';
import { toast } from 'sonner@2.0.3';
import { motion, AnimatePresence } from 'motion/react';
import { VisuallyHidden } from './ui/visually-hidden';
import { NotesheetApprovalFlow } from './NotesheetApprovalFlow';

interface UploadNotesheetModalProps {
  application: any;
  isOpen: boolean;
  onClose: () => void;
  onSendToApproval: (app: any) => void;
  currentUserRole?: string; // Add this to know which officer is logged in
}

export function UploadNotesheetModal({ 
  application, 
  isOpen, 
  onClose, 
  onSendToApproval,
  currentUserRole = 'Junior Engineer' // Default role
}: UploadNotesheetModalProps) {
  const [isDigitallySigned, setIsDigitallySigned] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showApprovalFlow, setShowApprovalFlow] = useState(false);

  if (!application) return null;

  const handleDigitalSignAndUpload = () => {
    // Simulate digital signing process
    setIsDigitallySigned(true);
    
    // Auto upload after signing
    setTimeout(() => {
      setIsUploaded(true);
      toast.success('✅ Notesheet digitally signed & uploaded successfully!', {
        description: 'Digital signature has been applied with timestamp.',
      });
    }, 800);
  };

  const handleApprove = () => {
    if (!isUploaded) {
      toast.error('❌ Please sign and upload the notesheet first!');
      return;
    }

    // Use the NEW 3-level approval flow for notesheet approval
    // After all 3 officers approve, status will change to "Pending Approval"
    // Then user clicks Approve button which opens ApprovalModal for final approval
    const useNewApprovalFlow = true; // Always use 3-level approval for notesheet
    
    if (useNewApprovalFlow) {
      // NEW FLOW: Open the multi-level approval flow modal
      setShowApprovalFlow(true);
    } else {
      // OLD FLOW: Direct to ApprovalModal (not used currently)
      onSendToApproval({
        ...application,
        status: 'Pending Approval',
        notesheetUploaded: true,
        digitallySigned: true,
        signedAt: new Date().toLocaleString()
      });
      
      toast.success('✅ Notesheet uploaded successfully!', {
        description: 'Application is now pending approval. Click the Approve button to proceed.',
      });
      
      // Reset states
      setIsDigitallySigned(false);
      setIsUploaded(false);
      
      // Close the notesheet modal
      onClose();
    }
  };

  const handleApprovalComplete = (app: any, approvalData: any) => {
    console.log('Approval completed:', app, approvalData);
    
    // Check if approval was rejected
    const isRejected = approvalData.some((level: any) => level.status === 'rejected');
    
    // Check how many levels are approved
    const approvedCount = approvalData.filter((level: any) => level.status === 'approved').length;
    
    let newStatus = 'Pending Approval';
    let toastMessage = 'Notesheet approved by all officers!';
    let toastDescription = 'Application is now pending final approval. Click the Approve button to proceed.';
    
    if (isRejected) {
      newStatus = 'Rejected';
      toastMessage = 'Application rejected!';
      toastDescription = 'The application has been rejected by an officer.';
    } else if (approvedCount === 1) {
      // Only Level 1 (Junior Engineer) approved, need Level 2 (Assistant Engineer)
      newStatus = 'Notesheet Approval Level 2';
      toastMessage = 'Notesheet uploaded successfully!';
      toastDescription = 'Forwarded to Assistant Engineer for approval.';
    } else if (approvedCount === 2) {
      // Level 1 and 2 approved, need Level 3 (Executive Engineer)
      newStatus = 'Notesheet Approval Level 3';
      toastMessage = 'Approved by Assistant Engineer!';
      toastDescription = 'Forwarded to Executive Engineer for final notesheet approval.';
    } else if (approvedCount >= 3) {
      // All 3 levels approved
      newStatus = 'Pending Approval';
      toastMessage = 'Notesheet approved by all officers!';
      toastDescription = 'Application is now pending final approval. Click the Approve button to proceed.';
    }
    
    // After all 3 officers approve the notesheet, set status to "Pending Approval"
    // This will show the green "Approve" button in the dashboard
    // Which opens ApprovalModal for final approval (payment, meter details, etc.)
    onSendToApproval({
      ...application,
      status: newStatus,
      notesheetUploaded: true,
      digitallySigned: true,
      signedAt: new Date().toLocaleString(),
      approvalData: approvalData,
      currentApprovalLevel: approvedCount === 1 ? 2 : (approvedCount === 2 ? 3 : null)
    });
    
    // Reset states
    setIsDigitallySigned(false);
    setIsUploaded(false);
    setShowApprovalFlow(false);
    
    // Close the notesheet modal
    onClose();
    
    // Show success message
    if (isRejected) {
      toast.error(`❌ ${toastMessage}`, {
        description: toastDescription,
      });
    } else {
      toast.success(`✅ ${toastMessage}`, {
        description: toastDescription,
      });
    }
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
      <DialogContent className="w-[90vw] sm:w-[85vw] !max-w-[900px] h-auto max-h-[90vh] p-0 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 border-3 border-blue-400 shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>Digital Notesheet - Online Approval</DialogTitle>
          <DialogDescription>
            Application No: {application.applicationNo} • Paperless Workflow
          </DialogDescription>
        </VisuallyHidden>
        
        {/* Content */}
        <div className="p-3 md:p-4 lg:p-5 max-h-[90vh] overflow-y-auto">
          {/* Digital Notesheet Preview */}
          <div className="bg-white rounded-lg shadow-xl border-3 border-blue-300 overflow-hidden mb-3 md:mb-4">
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
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead className="bg-amber-200">
                            <tr>
                              <th className="px-2 py-1 text-left text-amber-900" style={{ fontWeight: 700 }}>Quarter</th>
                              <th className="px-2 py-1 text-left text-amber-900" style={{ fontWeight: 700 }}>Year</th>
                              <th className="px-2 py-1 text-left text-amber-900" style={{ fontWeight: 700 }}>Total Tax</th>
                              <th className="px-2 py-1 text-left text-amber-900" style={{ fontWeight: 700 }}>Interest</th>
                              <th className="px-2 py-1 text-left text-amber-900" style={{ fontWeight: 700 }}>Payable</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr className="border-b border-amber-200">
                              <td className="px-2 py-1.5 text-xs">01/04/2025 - 31/03/2026</td>
                              <td className="px-2 py-1.5 text-xs">2025</td>
                              <td className="px-2 py-1.5 text-xs" style={{ fontWeight: 600 }}>₹1,690</td>
                              <td className="px-2 py-1.5 text-xs" style={{ fontWeight: 600 }}>₹0</td>
                              <td className="px-2 py-1.5 text-xs text-amber-700" style={{ fontWeight: 700 }}>₹1,690</td>
                            </tr>
                          </tbody>
                        </table>
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
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead className="bg-blue-200">
                            <tr>
                              <th className="px-2 py-1 text-left text-blue-900" style={{ fontWeight: 700 }}>Quarter</th>
                              <th className="px-2 py-1 text-left text-blue-900" style={{ fontWeight: 700 }}>Year</th>
                              <th className="px-2 py-1 text-left text-blue-900" style={{ fontWeight: 700 }}>Total Tax</th>
                              <th className="px-2 py-1 text-left text-blue-900" style={{ fontWeight: 700 }}>Interest</th>
                              <th className="px-2 py-1 text-left text-blue-900" style={{ fontWeight: 700 }}>Payable</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr className="border-b border-blue-200">
                              <td className="px-2 py-1.5 text-xs">01/04/2025 - 31/03/2026</td>
                              <td className="px-2 py-1.5 text-xs">2024</td>
                              <td className="px-2 py-1.5 text-xs" style={{ fontWeight: 600 }}>₹16,416</td>
                              <td className="px-2 py-1.5 text-xs" style={{ fontWeight: 600 }}>₹0</td>
                              <td className="px-2 py-1.5 text-xs text-blue-700" style={{ fontWeight: 700 }}>₹16,416</td>
                            </tr>
                          </tbody>
                        </table>
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

              {/* Digital Signature Section */}
              <AnimatePresence>
                {isDigitallySigned && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="border-4 border-blue-400 rounded-lg p-5 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
                        <Pen className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldCheck className="w-5 h-5 text-green-600" />
                          <h4 className="text-blue-900" style={{ fontWeight: 800 }}>Digitally Signed & Verified</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-blue-700" style={{ fontWeight: 700 }}>Signed By: </span>
                            <span className="text-slate-700">Assistant Engineer (Water Dept.)</span>
                          </div>
                          <div>
                            <span className="text-blue-700" style={{ fontWeight: 700 }}>Signature ID: </span>
                            <span className="text-slate-700 font-mono text-xs">AMC-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                          </div>
                          <div>
                            <span className="text-blue-700" style={{ fontWeight: 700 }}>Date & Time: </span>
                            <span className="text-slate-700">{getCurrentDate()} at {getCurrentTime()}</span>
                          </div>
                          <div>
                            <span className="text-blue-700" style={{ fontWeight: 700 }}>Certificate: </span>
                            <span className="text-slate-700">Digital Certificate Applied</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t-2 border-blue-300">
                          <div className="flex items-center gap-2 text-xs text-blue-800 bg-blue-50 rounded px-2 py-1.5 border border-blue-200">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                            <span style={{ fontWeight: 700 }}>This document is digitally signed and legally valid as per IT Act 2000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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

            {!isDigitallySigned && (
              <WaterRipple color="rgba(99, 102, 241, 0.3)">
                <Button
                  onClick={handleDigitalSignAndUpload}
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 md:px-8 py-2.5 rounded-lg shadow-lg w-full sm:w-auto"
                >
                  <Pen className="w-4 h-4 mr-2" />
                  Digital Sign & Upload
                </Button>
              </WaterRipple>
            )}

            {isUploaded && (
              <>
                <WaterRipple color="rgba(34, 197, 94, 0.3)">
                  <Button
                    onClick={handleApprove}
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-6 md:px-10 py-2.5 rounded-lg shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span style={{ fontWeight: 800 }}>Send to Approval</span>
                  </Button>
                </WaterRipple>

                <WaterRipple color="rgba(59, 130, 246, 0.3)">
                  <Button
                    onClick={() => {
                      toast.success('📥 Notesheet downloaded successfully!');
                    }}
                    variant="outline"
                    className="border-2 border-blue-500 text-blue-700 hover:bg-blue-50 px-4 md:px-6 py-2.5 rounded-lg shadow-md w-full sm:w-auto"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </WaterRipple>
              </>
            )}
          </div>

          {/* Status Message */}
          <AnimatePresence>
            {isUploaded && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg p-4 flex items-center gap-3"
              >
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-green-900 text-sm" style={{ fontWeight: 800 }}>
                    ✅ Notesheet digitally signed and uploaded successfully!
                  </div>
                  <div className="text-green-700 text-xs mt-0.5">
                    Click "Approve Application" to proceed to the next stage
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
      
      {/* Multi-Level Approval Flow Modal */}
      {showApprovalFlow && (
        <NotesheetApprovalFlow
          application={application}
          isOpen={showApprovalFlow}
          onClose={() => setShowApprovalFlow(false)}
          onApprovalComplete={handleApprovalComplete}
          currentUserRole={currentUserRole}
        />
      )}
    </Dialog>
  );
}