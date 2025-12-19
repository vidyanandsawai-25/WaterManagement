import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PaymentTransactionStatusModalProps {
  open: boolean;
  transaction: any;
  onClose: () => void;
  onApprove: (transaction: any) => void;
  onReject: (transaction: any) => void;
  onSendDocument: (transaction: any) => void;
}

export function PaymentTransactionStatusModal({
  open,
  transaction,
  onClose,
  onApprove,
  onReject,
  onSendDocument,
}: PaymentTransactionStatusModalProps) {
  if (!transaction) return null;

  // Sample transaction data table
  const transactionTableData = [
    {
      id: 1,
      referenceNo: 'WTPD147962984AMCWTPL DeletorID:153791',
      amount: '8792 6000',
      transactionDate: '9/26/2025 12:44:28 PM',
      moduleNo: 'AMCWTPL_Online',
      invoiceNo: '561',
      paymentType: 'P C',
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl pointer-events-auto"
            >
              {/* Header - Blue Gradient */}
              <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-6 py-4 flex items-center justify-between border-b-2 border-white">
                <h2 className="text-lg text-white drop-shadow-lg" style={{ fontWeight: 800 }}>
                  PAYMENT TRANSACTION STATUS
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="relative overflow-y-auto max-h-[calc(90vh-180px)]">
                {/* Water Tax Module Selector */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-700" style={{ fontWeight: 700 }}>
                      Water Tax Module:
                    </label>
                    <select className="flex-1 px-4 py-2 rounded-lg border-2 border-blue-200 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontWeight: 600 }}>
                      <option>-</option>
                      <option>Module 1</option>
                      <option>Module 2</option>
                    </select>
                  </div>
                </div>

                {/* Tabs */}
                <div className="bg-white border-b border-slate-200">
                  <div className="flex gap-2 px-6 py-3">
                    <button className="px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md" style={{ fontWeight: 700 }}>
                      Online Transaction Approval
                    </button>
                    <button className="px-4 py-2 text-sm bg-white text-slate-700 rounded-lg border border-slate-300 hover:bg-slate-50" style={{ fontWeight: 600 }}>
                      Online Transaction Approval Process
                    </button>
                    <button className="px-4 py-2 text-sm bg-white text-slate-700 rounded-lg border border-slate-300 hover:bg-slate-50" style={{ fontWeight: 600 }}>
                      Approval History
                    </button>
                  </div>
                </div>

                {/* Transaction Details Card */}
                <div className="p-6">
                  <div className="bg-white rounded-xl border-2 border-slate-200 shadow-lg overflow-hidden">
                    {/* Transaction Table with Blue Header */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        {/* Table Header - Blue Background */}
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
                            <th className="px-3 py-3 text-xs text-white text-center" style={{ fontWeight: 800 }}>Reference No.</th>
                            <th className="px-3 py-3 text-xs text-white text-center" style={{ fontWeight: 800 }}>Amount</th>
                            <th className="px-3 py-3 text-xs text-white text-center" style={{ fontWeight: 800 }}>Transaction Date</th>
                            <th className="px-3 py-3 text-xs text-white text-center" style={{ fontWeight: 800 }}>Module No.</th>
                            <th className="px-3 py-3 text-xs text-white text-center" style={{ fontWeight: 800 }}>Invoice No.</th>
                            <th className="px-3 py-3 text-xs text-white text-center" style={{ fontWeight: 800 }}>Payment Type</th>
                          </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                          {transactionTableData.map((row, index) => (
                            <tr
                              key={row.id}
                              className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50 transition-colors border-b border-slate-200`}
                            >
                              <td className="px-3 py-3 text-xs text-slate-900 text-center" style={{ fontWeight: 600 }}>
                                {row.referenceNo}
                              </td>
                              <td className="px-3 py-3 text-xs text-emerald-600 text-center" style={{ fontWeight: 700 }}>
                                {row.amount}
                              </td>
                              <td className="px-3 py-3 text-xs text-slate-900 text-center" style={{ fontWeight: 600 }}>
                                {row.transactionDate}
                              </td>
                              <td className="px-3 py-3 text-xs text-slate-900 text-center" style={{ fontWeight: 600 }}>
                                {row.moduleNo}
                              </td>
                              <td className="px-3 py-3 text-xs text-slate-900 text-center" style={{ fontWeight: 600 }}>
                                {row.invoiceNo}
                              </td>
                              <td className="px-3 py-3 text-xs text-slate-900 text-center" style={{ fontWeight: 600 }}>
                                {row.paymentType}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Action Buttons */}
                    <div className="px-6 py-6 bg-slate-50 border-t-2 border-slate-200">
                      <div className="flex items-center justify-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            onApprove(transaction);
                            onClose();
                          }}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl border-2 border-white transition-all"
                          style={{ fontWeight: 700 }}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approved
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            onReject(transaction);
                            onClose();
                          }}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl border-2 border-white transition-all"
                          style={{ fontWeight: 700 }}
                        >
                          <XCircle className="w-4 h-4" />
                          Rejected
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            onSendDocument(transaction);
                            onClose();
                          }}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl border-2 border-white transition-all"
                          style={{ fontWeight: 700 }}
                        >
                          <AlertCircle className="w-4 h-4" />
                          Send Document
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-slate-50 px-6 py-4 border-t-2 border-slate-200 flex justify-end">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="px-6 rounded-lg border-2 border-slate-300 hover:bg-slate-100"
                  style={{ fontWeight: 700 }}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}