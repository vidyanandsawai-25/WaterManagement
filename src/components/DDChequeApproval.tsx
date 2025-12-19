import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, X, Calendar, FileText, FileSpreadsheet, Download, Droplets, Waves, Crown, Award, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { WaterRipple } from './WaterRipple';
import { DDChequeCollapsibleFilter } from './DDChequeCollapsibleFilter';

// Sample DD/Cheque data
const sampleDDCheques = [
  {
    id: 1,
    nodeNumber: 'NODE-001',
    bankName: 'State Bank of India',
    chequeNumber: 'CHQ123456',
    accountNumber: 'ACC789012345',
    bankBranch: 'Main Branch',
    realizationDate: '2025-09-15',
    ddChequeNo: 'DD78901',
    zoneNo: 'Zone A',
    consumerNo: '1013751',
    accountName: 'Sanjay Takalkar',
    chequeDate: '2025-08-30',
    accountAmount: '6792',
    paymentStatus: 'In Process',
  },
  {
    id: 2,
    nodeNumber: 'NODE-002',
    bankName: 'HDFC Bank',
    chequeNumber: 'CHQ654321',
    accountNumber: 'ACC456789012',
    bankBranch: 'Central Branch',
    realizationDate: '2025-09-20',
    ddChequeNo: 'DD45678',
    zoneNo: 'Zone B',
    consumerNo: '22817',
    accountName: 'Suresh Talate',
    chequeDate: '2025-08-29',
    accountAmount: '835',
    paymentStatus: 'Cleared',
  },
];

type SortField = 'nodeNumber' | 'bankName' | 'chequeNumber' | 'consumerNo' | 'accountName' | 'chequeDate' | 'accountAmount' | 'paymentStatus';
type SortOrder = 'asc' | 'desc';

export function DDChequeApproval() {
  const [waterTaxModule, setWaterTaxModule] = useState('');
  const [dateType, setDateType] = useState('received');
  const [nodeNo, setNodeNo] = useState('');
  const [bankName, setBankName] = useState('');
  const [chequeNo, setChequeNo] = useState('');
  const [consumerNo, setConsumerNo] = useState('');
  const [accountName, setAccountName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [depositDate, setDepositDate] = useState('in-process');
  const [chequeDate, setChequeDate] = useState('in-process');
  const [section, setSection] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [ampm, setAmpm] = useState('AM');
  const [allDDCheques] = useState(sampleDDCheques);
  const [ddCheques, setDDCheques] = useState<any[]>([]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [sortField, setSortField] = useState<SortField>('nodeNumber');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronUp className="w-3 h-3 inline ml-1 opacity-30" />;
    }
    return sortOrder === 'asc' ? 
      <ChevronUp className="w-3 h-3 inline ml-1" /> : 
      <ChevronDown className="w-3 h-3 inline ml-1" />;
  };

  const handleSearch = () => {
    // Filter DD/Cheque data based on search criteria
    let filtered = [...allDDCheques];

    // Note: waterTaxModule field is not in sample data, so we skip it

    if (nodeNo) {
      filtered = filtered.filter(c => 
        c.nodeNumber.toLowerCase().includes(nodeNo.toLowerCase())
      );
    }

    if (bankName) {
      filtered = filtered.filter(c => 
        c.bankName.toLowerCase().includes(bankName.toLowerCase())
      );
    }

    if (chequeNo) {
      filtered = filtered.filter(c => 
        c.chequeNumber.toLowerCase().includes(chequeNo.toLowerCase())
      );
    }

    if (consumerNo) {
      filtered = filtered.filter(c => 
        c.consumerNo.toLowerCase().includes(consumerNo.toLowerCase())
      );
    }

    if (accountName) {
      filtered = filtered.filter(c => 
        c.accountName.toLowerCase().includes(accountName.toLowerCase())
      );
    }

    if (fromDate) {
      filtered = filtered.filter(c => {
        const cDate = new Date(c.chequeDate);
        return cDate >= new Date(fromDate);
      });
    }

    if (toDate) {
      filtered = filtered.filter(c => {
        const cDate = new Date(c.chequeDate);
        return cDate <= new Date(toDate);
      });
    }

    if (section) {
      filtered = filtered.filter(c => c.zoneNo.toLowerCase().includes(section.toLowerCase()));
    }

    if (paymentStatus !== 'all') {
      filtered = filtered.filter(c => c.paymentStatus.toLowerCase().includes(paymentStatus.toLowerCase()));
    }

    setDDCheques(filtered);
  };

  const handleCloseSearchDialog = () => {
    setShowSearchDialog(false);
  };

  const handleGenerateExcel = () => {
    // Create CSV content
    const headers = ['Node Number', 'Bank Name', 'Cheque Number', 'Account Number', 'Bank Branch', 'Realization Date', 'DD/Cheque No.', 'Zone No', 'Consumer No', 'Account Name', 'Cheque Date', 'Account Amount', 'Payment Status'];
    const csvContent = [
      headers.join(','),
      ...ddCheques.map(cheque => [
        cheque.nodeNumber,
        cheque.bankName,
        cheque.chequeNumber,
        cheque.accountNumber,
        cheque.bankBranch,
        cheque.realizationDate,
        cheque.ddChequeNo,
        cheque.zoneNo,
        cheque.consumerNo,
        cheque.accountName,
        cheque.chequeDate,
        cheque.accountAmount,
        cheque.paymentStatus
      ].join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `dd_cheque_approvals_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCancel = () => {
    // Collapse the filter section and clear filters
    setIsFilterExpanded(false);
    setNodeNo('');
    setBankName('');
    setChequeNo('');
    setConsumerNo('');
    setAccountName('');
    setFromDate('');
    setToDate('');
    setSection('');
    setDateType('received');
    setHour('');
    setMinute('');
    setAmpm('AM');
    setDDCheques([]);
  };

  // Sort the data
  const sortedDDCheques = [...ddCheques].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    // Handle numeric sorting for accountAmount
    if (sortField === 'accountAmount') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      {/* Filter Section */}
      <DDChequeCollapsibleFilter
        waterTaxModule={waterTaxModule}
        setWaterTaxModule={setWaterTaxModule}
        dateType={dateType}
        setDateType={setDateType}
        nodeNo={nodeNo}
        setNodeNo={setNodeNo}
        bankName={bankName}
        setBankName={setBankName}
        chequeNo={chequeNo}
        setChequeNo={setChequeNo}
        consumerNo={consumerNo}
        setConsumerNo={setConsumerNo}
        accountName={accountName}
        setAccountName={setAccountName}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        depositDate={depositDate}
        setDepositDate={setDepositDate}
        chequeDate={chequeDate}
        setChequeDate={setChequeDate}
        section={section}
        setSection={setSection}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        hour={hour}
        setHour={setHour}
        minute={minute}
        setMinute={setMinute}
        ampm={ampm}
        setAmpm={setAmpm}
        onSearch={handleSearch}
        onGenerateExcel={handleGenerateExcel}
        onCancel={handleCancel}
        totalRecords={ddCheques.length}
        filteredRecords={ddCheques.length}
        isExpanded={isFilterExpanded}
        setIsExpanded={setIsFilterExpanded}
      />

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-white overflow-hidden ring-1 ring-black/5 flex-1 flex flex-col"
      >
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-300/15 to-purple-300/15 rounded-full blur-3xl pointer-events-none" />

        {/* Generate Excel Button - Above Table */}
        <div className="relative px-4 py-2 bg-gradient-to-r from-slate-50 to-indigo-50 border-b border-slate-200 flex justify-end">
          <WaterRipple color="rgba(16, 185, 129, 0.3)">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleGenerateExcel}
                className="h-8 px-4 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg shadow-md text-xs"
                style={{ fontWeight: 700 }}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5" />
                Generate Excel
              </Button>
            </motion.div>
          </WaterRipple>
        </div>

        {/* Table Container */}
        <div className="relative flex-1 flex flex-col min-h-0">
          <table className="w-full table-fixed">
            <colgroup>
              <col style={{ width: '7%' }} />
              <col style={{ width: '7%' }} />
              <col style={{ width: '8%' }} />
              <col style={{ width: '7%' }} />
              <col style={{ width: '8%' }} />
              <col style={{ width: '7%' }} />
              <col style={{ width: '8%' }} />
              <col style={{ width: '7%' }} />
              <col style={{ width: '6%' }} />
              <col style={{ width: '7%' }} />
              <col style={{ width: '8%' }} />
              <col style={{ width: '7%' }} />
              <col style={{ width: '7%' }} />
              <col style={{ width: '8%' }} />
            </colgroup>
            <thead className="relative">
              <tr className="relative bg-gradient-to-r from-blue-500 to-blue-400 overflow-hidden">
                {/* Animated water waves background */}
                <th className="absolute inset-0 overflow-hidden pointer-events-none" colSpan={14}>
                  <motion.div
                    animate={{
                      translateX: [0, -50, 0],
                      translateY: [0, 10, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                      backgroundSize: '400% 400%',
                    }}
                  />
                  
                  {/* Flowing water wave effect */}
                  <motion.div
                    animate={{
                      x: [0, 100, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.3) 75%, transparent 100%)',
                      backgroundSize: '200% 100%',
                    }}
                  />

                  {/* Floating water bubbles */}
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute top-2 right-40 w-16 h-16 rounded-full bg-white/20 blur-xl"
                  />
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.15, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1.5,
                    }}
                    className="absolute top-1 left-60 w-20 h-20 rounded-full bg-cyan-300/30 blur-xl"
                  />
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 2.5,
                    }}
                    className="absolute top-2 right-1/3 w-14 h-14 rounded-full bg-white/25 blur-lg"
                  />

                  {/* Water droplet particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -60],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2.5 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: 'easeOut',
                      }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
                      style={{
                        left: `${10 + i * 12}%`,
                        bottom: '5px',
                      }}
                    />
                  ))}

                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 backdrop-blur-[1px]" />
                </th>

                <th className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg" style={{ fontWeight: 800 }}>
                  Action
                </th>
                <th 
                  className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[100px] cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 800 }}
                  onClick={() => handleSort('nodeNumber')}
                >
                  Node Number <SortIcon field="nodeNumber" />
                </th>
                <th 
                  className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[120px] cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 800 }}
                  onClick={() => handleSort('bankName')}
                >
                  Bank Name <SortIcon field="bankName" />
                </th>
                <th 
                  className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[120px] cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 800 }}
                  onClick={() => handleSort('chequeNumber')}
                >
                  Cheque Number <SortIcon field="chequeNumber" />
                </th>
                <th className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[120px]" style={{ fontWeight: 800 }}>
                  Account Number
                </th>
                <th className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[120px]" style={{ fontWeight: 800 }}>
                  Bank Branch
                </th>
                <th className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[140px]" style={{ fontWeight: 800 }}>
                  Realization Date
                </th>
                <th className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[200px]" style={{ fontWeight: 800 }}>
                  DD/Cheque No.
                </th>
                <th className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[80px]" style={{ fontWeight: 800 }}>
                  Zone No
                </th>
                <th 
                  className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[120px] cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 800 }}
                  onClick={() => handleSort('consumerNo')}
                >
                  Consumer No <SortIcon field="consumerNo" />
                </th>
                <th 
                  className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[140px] cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 800 }}
                  onClick={() => handleSort('accountName')}
                >
                  Account Name <SortIcon field="accountName" />
                </th>
                <th 
                  className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[120px] cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 800 }}
                  onClick={() => handleSort('chequeDate')}
                >
                  Cheque Date <SortIcon field="chequeDate" />
                </th>
                <th 
                  className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[100px] cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 800 }}
                  onClick={() => handleSort('accountAmount')}
                >
                  Account Amount <SortIcon field="accountAmount" />
                </th>
                <th 
                  className="relative px-3 py-4 text-xs text-white text-center drop-shadow-lg min-w-[100px] cursor-pointer hover:bg-white/10 transition-colors" 
                  style={{ fontWeight: 800 }}
                  onClick={() => handleSort('paymentStatus')}
                >
                  Payment Status <SortIcon field="paymentStatus" />
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedDDCheques.length > 0 ? (
                sortedDDCheques.map((cheque, index) => (
                  <motion.tr
                    key={cheque.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    } hover:bg-blue-50 transition-all duration-300 border-b border-slate-200 cursor-pointer`}
                    onClick={(e: any) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const ripple = document.createElement('span');
                      ripple.className = 'absolute rounded-full pointer-events-none';
                      ripple.style.cssText = `
                        left: ${x}px;
                        top: ${y}px;
                        width: ${Math.max(rect.width, rect.height) * 2}px;
                        height: ${Math.max(rect.width, rect.height) * 2}px;
                        background-color: rgba(59, 130, 246, 0.15);
                        transform: translate(-50%, -50%) scale(0);
                        transition: transform 0.8s ease-out, opacity 0.8s ease-out;
                        opacity: 0.6;
                        z-index: 1;
                      `;
                      e.currentTarget.appendChild(ripple);
                      requestAnimationFrame(() => {
                        ripple.style.transform = 'translate(-50%, -50%) scale(1)';
                        ripple.style.opacity = '0';
                      });
                      setTimeout(() => ripple.remove(), 800);
                    }}
                  >
                    <td className="px-3 py-3 text-center relative">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                          style={{ fontWeight: 700 }}
                        >
                          <Waves className="w-3 h-3 mr-1" />
                          Clear
                        </Button>
                      </motion.div>
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-900 text-center relative" style={{ fontWeight: 600 }}>
                      {cheque.nodeNumber}
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-900 text-center relative" style={{ fontWeight: 600 }}>
                      {cheque.bankName}
                    </td>
                    <td className="px-3 py-3 text-xs text-blue-700 text-center relative" style={{ fontWeight: 700 }}>
                      {cheque.chequeNumber}
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-900 text-center relative" style={{ fontWeight: 600 }}>
                      {cheque.accountNumber}
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-900 text-center relative" style={{ fontWeight: 600 }}>
                      {cheque.bankBranch}
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-900 text-center relative" style={{ fontWeight: 600 }}>
                      {cheque.realizationDate}
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-900 text-center relative" style={{ fontWeight: 600 }}>
                      {cheque.ddChequeNo}
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-900 text-center relative" style={{ fontWeight: 600 }}>
                      {cheque.zoneNo}
                    </td>
                    <td className="px-3 py-3 text-xs text-blue-700 text-center relative" style={{ fontWeight: 700 }}>
                      {cheque.consumerNo}
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-800 text-center relative" style={{ fontWeight: 600 }}>
                      {cheque.accountName}
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-900 text-center relative" style={{ fontWeight: 600 }}>
                      {cheque.chequeDate}
                    </td>
                    <td className="px-3 py-3 text-xs text-emerald-600 text-center relative" style={{ fontWeight: 700 }}>
                      ₹{cheque.accountAmount}
                    </td>
                    <td className="px-3 py-3 text-center relative">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex"
                      >
                        <span className={`px-3 py-1 rounded-full text-xs text-white shadow-md ${
                          cheque.paymentStatus === 'Cleared' 
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                            : 'bg-gradient-to-r from-amber-500 to-amber-600'
                        }`} style={{ fontWeight: 700 }}>
                          {cheque.paymentStatus}
                        </span>
                      </motion.div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={14} className="px-4 py-8 text-center text-slate-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons at Bottom */}
        <div className="relative bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 px-6 py-4 border-t-2 border-blue-200 flex justify-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              style={{ fontWeight: 700 }}
            >
              <Droplets className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              className="bg-white hover:bg-gray-50 text-[#EF4444] border-2 border-[#EF4444] rounded-lg shadow-lg hover:shadow-xl transition-all"
              style={{ fontWeight: 700 }}
            >
              <X className="w-4 h-4 mr-2" />
              UnClear
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Search Dialog */}
      <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search Filters</DialogTitle>
            <DialogDescription>
              You have selected the following filters:
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Water Tax Module:</span>
              <span className="text-sm">{waterTaxModule || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Date Type:</span>
              <span className="text-sm">{dateType || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Node Number:</span>
              <span className="text-sm">{nodeNo || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Bank Name:</span>
              <span className="text-sm">{bankName || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Cheque Number:</span>
              <span className="text-sm">{chequeNo || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Consumer Number:</span>
              <span className="text-sm">{consumerNo || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Account Name:</span>
              <span className="text-sm">{accountName || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">From Date:</span>
              <span className="text-sm">{fromDate || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">To Date:</span>
              <span className="text-sm">{toDate || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Deposit Date:</span>
              <span className="text-sm">{depositDate || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Cheque Date:</span>
              <span className="text-sm">{chequeDate || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Section:</span>
              <span className="text-sm">{section || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Payment Status:</span>
              <span className="text-sm">{paymentStatus || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Hour:</span>
              <span className="text-sm">{hour || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">Minute:</span>
              <span className="text-sm">{minute || 'None'}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-sm font-bold">AM/PM:</span>
              <span className="text-sm">{ampm || 'None'}</span>
            </div>
          </div>
          <DialogFooter>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              style={{ fontWeight: 700 }}
              onClick={handleCloseSearchDialog}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}