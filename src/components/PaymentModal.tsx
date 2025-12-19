import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CreditCard, X, CheckCircle, IndianRupee, Building2, Calendar, Download, FileText, AlertCircle } from 'lucide-react';
import { WaterRipple } from './WaterRipple';
import { toast } from 'sonner@2.0.3';
import { motion, AnimatePresence } from 'motion/react';

interface PaymentModalProps {
  application: any;
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (app: any) => void;
}

export function PaymentModal({ application, isOpen, onClose, onPaymentComplete }: PaymentModalProps) {
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'offline'>('online');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [paymentData, setPaymentData] = useState({
    bankName: '',
    branchName: '',
    chequeNo: '',
    amount: '7700',
    transactionId: '',
    paymentMode: 'Cash',
    remarks: '',
  });
  const [cnbNumber, setCnbNumber] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  if (!application) return null;

  // Payment breakdown
  const paymentBreakdown = [
    { name: 'Connection Fee', amount: 300 },
    { name: 'Security Deposit', amount: 500 },
    { name: 'Base Amount', amount: 1500 },
    { name: 'Meter Installation Charge', amount: 700 },
    { name: 'Other Charges', amount: 4500 },
  ];

  const totalAmount = paymentBreakdown.reduce((sum, item) => sum + item.amount, 0);

  const handleProceedToPayment = () => {
    setPaymentStep('payment');
  };

  const handlePayNowClick = () => {
    if (paymentMethod === 'online') {
      if (!paymentData.bankName || !paymentData.chequeNo) {
        toast.error('❌ Please fill all payment details!');
        return;
      }
    }
    
    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleConfirmPayment = () => {
    setShowConfirmDialog(false);
    
    // Generate CNB Number and Receipt Number
    const generatedCNB = `WTDG${Math.floor(10000 + Math.random() * 90000)}`;
    const generatedReceipt = `RCP${Math.floor(100000 + Math.random() * 900000)}`;
    const currentDate = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    setCnbNumber(generatedCNB);
    setReceiptNumber(generatedReceipt);
    setPaymentDate(currentDate);

    onPaymentComplete({
      ...application,
      status: 'Payment Completed',
      cnbNumber: generatedCNB,
      receiptNumber: generatedReceipt,
      paymentDetails: {
        ...paymentData,
        method: paymentMethod,
        date: currentDate,
        breakdown: paymentBreakdown,
        totalAmount: totalAmount,
      },
    });
    
    setPaymentStep('success');
    toast.success('✅ Payment completed successfully! CNB Number generated.');
  };

  const handleDownloadReceipt = () => {
    toast.success('📄 Receipt downloaded successfully!');
    // In real implementation, this would generate and download the PDF receipt
  };

  const handleBackToDashboard = () => {
    onClose();
    setPaymentStep('details');
    setShowConfirmDialog(false);
    toast.info('🏠 Returning to dashboard...');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[98vw] sm:w-[96vw] lg:w-[95vw] !max-w-none p-0 overflow-hidden bg-white border-2 sm:border-4 border-blue-400 shadow-2xl max-h-[95vh] overflow-y-auto">
          {/* Header */}
          <DialogHeader className="relative bg-gradient-to-r from-blue-400/80 via-blue-400/70 to-blue-500/80 px-3 sm:px-6 py-2 sm:py-3 text-white overflow-hidden sticky top-0 z-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-30"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <DialogTitle className="text-white m-0 text-lg" style={{ fontWeight: 800 }}>
                    New Connection Payment ( {application.applicationNo} )
                  </DialogTitle>
                  <DialogDescription className="text-green-100 text-xs mt-0.5">
                    Complete payment to generate CNB number
                  </DialogDescription>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="p-5">
            <AnimatePresence mode="wait">
              {/* Step 1: Payment Details */}
              {paymentStep === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  {/* Consumer Details Section */}
                  <div className="bg-white rounded-xl shadow-lg border-2 border-blue-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-400/80 via-blue-400/70 to-blue-500/80 text-white px-4 py-2">
                      <span className="text-sm" style={{ fontWeight: 800 }}>Consumer Details</span>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="grid grid-cols-2 gap-3 mb-2">
                            <div>
                              <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>अर्जदाराचे नाव :</div>
                              <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>श्री {application.applicantName}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>वार्ड क्र :</div>
                              <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{application.wardNo || 'WTDG19273'}</div>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>अर्जदाराचा पत्ता :</div>
                            <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>अकोला पंचशील कॉम्प्लेक्स,अकोला</div>
                          </div>
                          <div className="mb-2">
                            <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>कायमचा स्थाळ :</div>
                            <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>ब</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>कनेक्शन हेतु :</div>
                            <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>निवासी</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="mb-2">
                            <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>नवीन ग्राहक प्रवाशन क्रं :</div>
                            <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>श्री {application.applicantName}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-2">
                            <div>
                              <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>विद्युतभार राता :</div>
                              <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>सामुपुयी किवा</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>पत्की-रुचुवरी प्रमाण :</div>
                              <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>15</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Breakdown Section */}
                  <div className="bg-white rounded-xl shadow-lg border-2 border-green-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400/80 via-green-400/70 to-green-500/80 text-white px-4 py-2">
                      <span className="text-sm" style={{ fontWeight: 800 }}>Fee Details</span>
                    </div>
                    
                    <div className="p-4">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-300">
                            <th className="text-left py-2 px-3 text-sm text-gray-700" style={{ fontWeight: 700 }}>Item</th>
                            <th className="text-right py-2 px-3 text-sm text-gray-700" style={{ fontWeight: 700 }}>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paymentBreakdown.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200">
                              <td className="py-2 px-3 text-sm text-gray-800">{item.name}</td>
                              <td className="text-right py-2 px-3 text-sm text-gray-800" style={{ fontWeight: 600 }}>{item.amount}</td>
                            </tr>
                          ))}
                          <tr className="border-t-2 border-gray-400 bg-green-50">
                            <td className="py-2 px-3 text-sm text-gray-900" style={{ fontWeight: 800 }}>Total</td>
                            <td className="text-right py-2 px-3 text-sm text-gray-900" style={{ fontWeight: 800 }}>{totalAmount}</td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="mt-3 text-right">
                        <span className="text-lg text-green-700" style={{ fontWeight: 800 }}>₹ {totalAmount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <WaterRipple color="rgba(59, 130, 246, 0.3)">
                      <Button
                        onClick={handleProceedToPayment}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-2 rounded-lg shadow-lg"
                      >
                        Pay
                      </Button>
                    </WaterRipple>

                    <WaterRipple color="rgba(100, 116, 139, 0.3)">
                      <Button
                        onClick={onClose}
                        className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-8 py-2 rounded-lg shadow-lg"
                      >
                        Back to Search
                      </Button>
                    </WaterRipple>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Method */}
              {paymentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  {/* Consumer Details Summary */}
                  <div className="bg-white rounded-xl shadow-lg border-2 border-blue-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-400/80 via-blue-400/70 to-blue-500/80 text-white px-4 py-2">
                      <span className="text-sm" style={{ fontWeight: 800 }}>Consumer Details</span>
                    </div>
                    
                    <div className="p-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>अर्जदाराचे नाव :</div>
                              <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>श्री {application.applicantName}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>वार्ड क्र :</div>
                              <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{application.wardNo || 'WTDG19273'}</div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>अर्जदाराचा पत्ता :</div>
                            <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>अकोला पंचशील कॉम्प्लेक्स,अकोला</div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-2">
                            <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>विद्युतभार राता :</div>
                            <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>सामुपुयी किवा</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>पत्की-रुचुवरी प्रमाण :</div>
                            <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>15</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Amount Display */}
                  <div className="bg-gradient-to-r from-green-400/80 to-green-500/80 rounded-xl shadow-lg p-3 text-center">
                    <div className="text-white text-sm mb-1" style={{ fontWeight: 700 }}>Total Amount</div>
                    <div className="text-white text-2xl" style={{ fontWeight: 900 }}>₹ {totalAmount}</div>
                  </div>

                  {/* Payment Details Form */}
                  <div className="bg-white rounded-xl shadow-lg border-2 border-purple-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-400/80 via-purple-400/70 to-purple-500/80 text-white px-4 py-2">
                      <span className="text-sm" style={{ fontWeight: 800 }}>Payment Mode Details</span>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-700 mb-1 block" style={{ fontWeight: 700 }}>
                            E - Payment Mode :
                          </label>
                          <select
                            value={paymentData.paymentMode}
                            onChange={(e) => setPaymentData({ ...paymentData, paymentMode: e.target.value })}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm h-9"
                          >
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="UPI">UPI</option>
                            <option value="Net Banking">Net Banking</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-gray-700 mb-1 block" style={{ fontWeight: 700 }}>
                            Mobile Number *
                          </label>
                          <Input
                            value={paymentData.chequeNo}
                            onChange={(e) => setPaymentData({ ...paymentData, chequeNo: e.target.value })}
                            className="border border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg h-9 text-sm"
                            placeholder="9876543210"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-700 mb-1 block" style={{ fontWeight: 700 }}>
                            Bank Details *
                          </label>
                          <select
                            value={paymentData.bankName}
                            onChange={(e) => setPaymentData({ ...paymentData, bankName: e.target.value })}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm h-9"
                          >
                            <option value="">Select SBI Bank No</option>
                            <option value="SBI - Main Branch">SBI - Main Branch</option>
                            <option value="SBI - City Center">SBI - City Center</option>
                            <option value="SBI - Market Area">SBI - Market Area</option>
                            <option value="HDFC Bank">HDFC Bank</option>
                            <option value="ICICI Bank">ICICI Bank</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-gray-700 mb-1 block" style={{ fontWeight: 700 }}>
                            Payment Amount:
                          </label>
                          <Input
                            value={totalAmount}
                            readOnly
                            className="border border-gray-300 bg-gray-100 rounded-lg h-9 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <WaterRipple color="rgba(34, 197, 94, 0.3)">
                      <Button
                        onClick={handlePayNowClick}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-2 rounded-lg shadow-lg"
                      >
                        Pay Now
                      </Button>
                    </WaterRipple>

                    <WaterRipple color="rgba(100, 116, 139, 0.3)">
                      <Button
                        onClick={() => setPaymentStep('details')}
                        className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-8 py-2 rounded-lg shadow-lg"
                      >
                        Search
                      </Button>
                    </WaterRipple>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Success - CNB Generated */}
              {paymentStep === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  {/* Success Header */}
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <h2 className="text-white text-2xl mb-2" style={{ fontWeight: 900 }}>Payment Successful!</h2>
                    <p className="text-green-100 text-sm">Your Consumer Number has been generated</p>
                  </div>

                  {/* CNB Details Card */}
                  <div className="bg-white rounded-xl shadow-lg border-2 border-blue-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-400/80 via-blue-400/70 to-blue-500/80 text-white px-4 py-3 flex items-center justify-center gap-2">
                      <FileText className="w-5 h-5" />
                      <span className="text-base" style={{ fontWeight: 800 }}>New Consumer Details - {application.applicationNo}</span>
                    </div>
                    
                    <div className="p-6">
                      {/* Main CNB Number - Large Display */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-300 mb-6 text-center">
                        <div className="text-sm text-green-700 mb-2" style={{ fontWeight: 700 }}>Generated Consumer Number (CNB)</div>
                        <div className="text-green-900 text-4xl mb-2" style={{ fontWeight: 900, letterSpacing: '0.1em' }}>{cnbNumber}</div>
                        <div className="text-xs text-green-600">This is your unique consumer identification number</div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                          <div className="text-xs text-blue-600 mb-1" style={{ fontWeight: 700 }}>Application No</div>
                          <div className="text-blue-900 text-base" style={{ fontWeight: 800 }}>{application.applicationNo}</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                          <div className="text-xs text-purple-600 mb-1" style={{ fontWeight: 700 }}>Receipt Number</div>
                          <div className="text-purple-900 text-base" style={{ fontWeight: 800 }}>{receiptNumber}</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                          <div className="text-xs text-orange-600 mb-1" style={{ fontWeight: 700 }}>Payment Date</div>
                          <div className="text-orange-900 text-base" style={{ fontWeight: 800 }}>{paymentDate}</div>
                        </div>
                      </div>

                      {/* Consumer Information */}
                      <div className="mt-4 bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-slate-600 mb-1" style={{ fontWeight: 700 }}>Consumer Name</div>
                            <div className="text-slate-900 text-sm" style={{ fontWeight: 800 }}>{application.applicantName}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1" style={{ fontWeight: 700 }}>Mobile Number</div>
                            <div className="text-slate-900 text-sm" style={{ fontWeight: 800 }}>{application.mobileNumber || 'N/A'}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-xs text-slate-600 mb-1" style={{ fontWeight: 700 }}>Address</div>
                            <div className="text-slate-900 text-sm" style={{ fontWeight: 800 }}>{application.address || 'Akola, Maharashtra'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1" style={{ fontWeight: 700 }}>Total Amount Paid</div>
                            <div className="text-green-600 text-lg" style={{ fontWeight: 900 }}>₹{totalAmount.toLocaleString('en-IN')}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1" style={{ fontWeight: 700 }}>Payment Status</div>
                            <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs" style={{ fontWeight: 700 }}>Completed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <WaterRipple color="rgba(34, 197, 94, 0.3)">
                      <Button
                        onClick={handleDownloadReceipt}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-2.5 rounded-lg shadow-lg"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Receipt
                      </Button>
                    </WaterRipple>

                    <WaterRipple color="rgba(239, 68, 68, 0.3)">
                      <Button
                        onClick={handleBackToDashboard}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-2.5 rounded-lg shadow-lg"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Back to Dashboard
                      </Button>
                    </WaterRipple>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="w-[95vw] max-w-5xl p-0 overflow-hidden bg-white border-4 border-blue-400 shadow-2xl max-h-[95vh] overflow-y-auto">
            {/* Header */}
            <DialogHeader className="relative bg-gradient-to-r from-blue-400/80 via-blue-400/70 to-blue-500/80 px-6 py-3 text-white overflow-hidden sticky top-0 z-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-30"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <DialogTitle className="text-white m-0 text-lg" style={{ fontWeight: 800 }}>
                      Confirm Payment
                    </DialogTitle>
                    <DialogDescription className="text-red-100 text-xs mt-0.5">
                      Are you sure you want to complete this payment?
                    </DialogDescription>
                  </div>
                </div>
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </DialogHeader>

            {/* Content */}
            <div className="p-5">
              <div className="space-y-4">
                {/* Consumer Details Summary */}
                <div className="bg-white rounded-xl shadow-lg border-2 border-blue-300 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-400/80 via-blue-400/70 to-blue-500/80 text-white px-4 py-2">
                    <span className="text-sm" style={{ fontWeight: 800 }}>Consumer Details</span>
                  </div>
                  
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>अर्जदाराचे नाव :</div>
                            <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>श्री {application.applicantName}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>वार्ड ��्र :</div>
                            <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{application.wardNo || 'WTDG19273'}</div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>अर्जदाराचा पत्ता :</div>
                          <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>अकोला पंचशील कॉम्प्लेक्स,अकोला</div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2">
                          <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>विद्युतभार राता :</div>
                          <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>सामुपुयी किवा</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-0.5" style={{ fontWeight: 700 }}>पत्की-रुचुवरी प्रमाण :</div>
                          <div className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>15</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Amount Display */}
                <div className="bg-gradient-to-r from-green-400/80 to-green-500/80 rounded-xl shadow-lg p-3 text-center">
                  <div className="text-white text-sm mb-1" style={{ fontWeight: 700 }}>Total Amount</div>
                  <div className="text-white text-2xl" style={{ fontWeight: 900 }}>₹ {totalAmount}</div>
                </div>

                {/* Payment Details Form */}
                <div className="bg-white rounded-xl shadow-lg border-2 border-purple-300 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-400/80 via-purple-400/70 to-purple-500/80 text-white px-4 py-2">
                    <span className="text-sm" style={{ fontWeight: 800 }}>Payment Mode Details</span>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-700 mb-1 block" style={{ fontWeight: 700 }}>
                          E - Payment Mode :
                        </label>
                        <select
                          value={paymentData.paymentMode}
                          onChange={(e) => setPaymentData({ ...paymentData, paymentMode: e.target.value })}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm h-9"
                        >
                          <option value="Cash">Cash</option>
                          <option value="Cheque">Cheque</option>
                          <option value="UPI">UPI</option>
                          <option value="Net Banking">Net Banking</option>
                          <option value="Credit Card">Credit Card</option>
                          <option value="Debit Card">Debit Card</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-700 mb-1 block" style={{ fontWeight: 700 }}>
                          Mobile Number *
                        </label>
                        <Input
                          value={paymentData.chequeNo}
                          onChange={(e) => setPaymentData({ ...paymentData, chequeNo: e.target.value })}
                          className="border border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg h-9 text-sm"
                          placeholder="9876543210"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-700 mb-1 block" style={{ fontWeight: 700 }}>
                          Bank Details *
                        </label>
                        <select
                          value={paymentData.bankName}
                          onChange={(e) => setPaymentData({ ...paymentData, bankName: e.target.value })}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm h-9"
                        >
                          <option value="">Select SBI Bank No</option>
                          <option value="SBI - Main Branch">SBI - Main Branch</option>
                          <option value="SBI - City Center">SBI - City Center</option>
                          <option value="SBI - Market Area">SBI - Market Area</option>
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-700 mb-1 block" style={{ fontWeight: 700 }}>
                          Payment Amount:
                        </label>
                        <Input
                          value={totalAmount}
                          readOnly
                          className="border border-gray-300 bg-gray-100 rounded-lg h-9 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <WaterRipple color="rgba(34, 197, 94, 0.3)">
                    <Button
                      onClick={handleConfirmPayment}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-2 rounded-lg shadow-lg"
                    >
                      Confirm Payment
                    </Button>
                  </WaterRipple>

                  <WaterRipple color="rgba(100, 116, 139, 0.3)">
                    <Button
                      onClick={() => setShowConfirmDialog(false)}
                      className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-8 py-2 rounded-lg shadow-lg"
                    >
                      Cancel
                    </Button>
                  </WaterRipple>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}