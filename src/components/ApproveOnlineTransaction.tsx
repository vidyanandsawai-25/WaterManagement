import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, X, ChevronUp, ChevronDown, CreditCard, FileText, FileSpreadsheet, Crown, Award, Zap, CheckCircle, XCircle, Edit } from 'lucide-react';
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
import { Badge } from './ui/badge';
import { WaterRipple, AmbientWaterRipple } from './WaterRipple';
import { PaymentTransactionStatusModal } from './PaymentTransactionStatusModal';
import { DDChequeApproval } from './DDChequeApproval';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';

// Sample data for the transactions table
const sampleTransactions = [
  {
    id: 1,
    division: 'B-B5',
    consumerNo: '1013751 / 1013751',
    taxPayerName: 'संजय कैलासनाथ टाकलीकर',
    paymentType: 'PG C',
    transactionDate: '8/30/2025 12:48:58 PM',
    amount: '6792',
    txnRefNo: 'WTPCHF200535AMeCCFR_Chalec#1013751',
    txnId: 'TXN123456789',
    bankTxnStatus: 'Initiated',
    emailId: 'khushalpasad@gmail.com',
    mobile: '9822165539',
    mobileNo: '9822165539',
    status: 'pending',
    edited: false,
  },
  {
    id: 2,
    division: 'A-A2',
    consumerNo: '22817 / 22817',
    taxPayerName: 'अ सुरेश कामथ तलाटे',
    paymentType: 'PG C',
    transactionDate: '8/30/2025 12:44:55 PM',
    amount: '835',
    txnRefNo: 'WTPCHF200535AMeCCFR_Chalec#22817',
    txnId: 'TXN987654321',
    bankTxnStatus: 'Initiated',
    emailId: 'auaeb201@gmail.com',
    mobile: '9325165089',
    mobileNo: '9325165089',
    status: 'pending',
    edited: false,
  },
  {
    id: 3,
    division: 'C-C3',
    consumerNo: '45623 / 45623',
    taxPayerName: 'राजेश कुमार शर्मा',
    paymentType: 'PG C',
    transactionDate: '8/30/2025 12:40:22 PM',
    amount: '1250',
    txnRefNo: 'WTPCHF200535AMeCCFR_Chalec#45623',
    txnId: 'TXN456789123',
    bankTxnStatus: 'Initiated',
    emailId: 'rajesh.sharma@gmail.com',
    mobile: '9876543210',
    mobileNo: '9876543210',
    status: 'pending',
    edited: false,
  },
  {
    id: 4,
    division: 'D-D1',
    consumerNo: '78945 / 78945',
    taxPayerName: 'प्रिया देशपांडे',
    paymentType: 'PG C',
    transactionDate: '8/30/2025 12:35:10 PM',
    amount: '945',
    txnRefNo: 'WTPCHF200535AMeCCFR_Chalec#78945',
    txnId: 'TXN789123456',
    bankTxnStatus: 'Initiated',
    emailId: 'priya.d@gmail.com',
    mobile: '9123456789',
    mobileNo: '9123456789',
    status: 'pending',
    edited: false,
  },
  {
    id: 5,
    division: 'B-B7',
    consumerNo: '32156 / 32156',
    taxPayerName: 'अमित पाटील',
    paymentType: 'PG C',
    transactionDate: '8/30/2025 12:30:45 PM',
    amount: '1580',
    txnRefNo: 'WTPCHF200535AMeCCFR_Chalec#32156',
    txnId: 'TXN321654987',
    bankTxnStatus: 'Initiated',
    emailId: 'amit.patil@gmail.com',
    mobile: '9234567890',
    mobileNo: '9234567890',
    status: 'pending',
    edited: false,
  },
];

type SortField = 'division' | 'consumerNo' | 'taxPayerName' | 'transactionDate' | 'amount';
type SortOrder = 'asc' | 'desc';

export function ApproveOnlineTransaction() {
  const [type, setType] = useState('all');
  const [subType, setSubType] = useState('all');
  const [consumerNo, setConsumerNo] = useState('');
  const [taxPayerName, setTaxPayerName] = useState('');
  const [txnId, setTxnId] = useState('');
  const [emailId, setEmailId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [zone, setZone] = useState('all');
  const [quarter, setQuarter] = useState('all');
  const [allTransactions] = useState(sampleTransactions);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5);
  const [sortField, setSortField] = useState<SortField>('consumerNo');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [editTransaction, setEditTransaction] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'online' | 'ddcheque'>('online');
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  // Edit form states
  const [editTaxPayerName, setEditTaxPayerName] = useState('');
  const [editConsumerNo, setEditConsumerNo] = useState('');
  const [editTxnId, setEditTxnId] = useState('');
  const [editTransactionDate, setEditTransactionDate] = useState('');
  const [editMobile, setEditMobile] = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleSearch = () => {
    // Filter transactions based on search criteria
    let filtered = [...allTransactions];

    if (consumerNo) {
      filtered = filtered.filter(t => 
        t.consumerNo.toLowerCase().includes(consumerNo.toLowerCase())
      );
    }

    if (taxPayerName) {
      filtered = filtered.filter(t => 
        t.taxPayerName.toLowerCase().includes(taxPayerName.toLowerCase())
      );
    }

    if (txnId) {
      filtered = filtered.filter(t => 
        t.txnId.toLowerCase().includes(txnId.toLowerCase())
      );
    }

    if (emailId) {
      filtered = filtered.filter(t => 
        t.emailId.toLowerCase().includes(emailId.toLowerCase())
      );
    }

    if (type !== 'all') {
      // Filter by type if needed
      filtered = filtered.filter(t => t.paymentType === type);
    }

    if (subType !== 'all' && subType) {
      // Filter by subType if needed (only if field exists in data)
      filtered = filtered.filter(t => t.subType && t.subType === subType);
    }

    if (zone !== 'all') {
      // Filter by zone if needed - match with division field
      const zoneValue = zone.toLowerCase().replace('zone-', '').replace('-', '');
      filtered = filtered.filter(t => 
        t.division && t.division.toLowerCase().includes(zoneValue)
      );
    }

    if (quarter !== 'all' && quarter) {
      // Filter by quarter if needed (only if field exists in data)
      filtered = filtered.filter(t => t.quarter && t.quarter === quarter);
    }

    if (fromDate) {
      filtered = filtered.filter(t => {
        // Parse the transaction date (format: "8/30/2025 12:48:58 PM")
        const tDateStr = t.transactionDate.split(' ')[0]; // Get "8/30/2025"
        const [month, day, year] = tDateStr.split('/');
        const tDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const fDate = new Date(fromDate);
        return tDate >= fDate;
      });
    }

    if (toDate) {
      filtered = filtered.filter(t => {
        // Parse the transaction date (format: "8/30/2025 12:48:58 PM")
        const tDateStr = t.transactionDate.split(' ')[0]; // Get "8/30/2025"
        const [month, day, year] = tDateStr.split('/');
        const tDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const fDate = new Date(toDate);
        return tDate <= fDate;
      });
    }

    setTransactions(filtered);
    setCurrentPage(1);
  };

  const handleCloseSearchDialog = () => {
    setShowSearchDialog(false);
  };

  const handleClear = () => {
    setType('all');
    setSubType('all');
    setConsumerNo('');
    setTaxPayerName('');
    setTxnId('');
    setEmailId('');
    setFromDate('');
    setToDate('');
    setZone('all');
    setQuarter('all');
    setTransactions([]);
    setCurrentPage(1);
  };

  const handleEdit = (transaction: any) => {
    setEditTransaction(transaction);
    setEditTaxPayerName(transaction.taxPayerName);
    setEditConsumerNo(transaction.consumerNo);
    setEditTxnId(transaction.txnId);
    setEditTransactionDate(transaction.transactionDate);
    setEditMobile(transaction.mobile);
  };

  const handleUpdateTransaction = () => {
    setTransactions(prev => prev.map(t => {
      if (t.id === editTransaction.id) {
        return {
          ...t,
          taxPayerName: editTaxPayerName,
          consumerNo: editConsumerNo,
          txnId: editTxnId,
          transactionDate: editTransactionDate,
          mobile: editMobile,
          mobileNo: editMobile,
          edited: true,
        };
      }
      return t;
    }));
    setEditTransaction(null);
  };

  const handleApprove = (transaction: any, e?: any) => {
    if (e) e.stopPropagation();
    setTransactions(prev => prev.map(t => {
      if (t.id === transaction.id) {
        return { ...t, status: 'approved' };
      }
      return t;
    }));
    setSelectedTransaction(null);
  };

  const handleReject = (transaction: any, e?: any) => {
    if (e) e.stopPropagation();
    setTransactions(prev => prev.map(t => {
      if (t.id === transaction.id) {
        return { ...t, status: 'rejected' };
      }
      return t;
    }));
    setSelectedTransaction(null);
  };

  const handleGenerateExcel = () => {
    // Create CSV content
    const headers = ['Division/Section', 'ConsumerNo', 'Tax Payer Name', 'Payment Type', 'Transaction Date', 'Amount', 'Tax Ref. No.', 'Txnid', 'Bank Txn Status', 'Emailid', 'Mobile', 'MobileNo'];
    const csvContent = [
      headers.join(','),
      ...sortedData.map(transaction => [
        transaction.division,
        transaction.consumerNo,
        transaction.taxPayerName,
        transaction.paymentType,
        transaction.transactionDate,
        transaction.amount,
        transaction.txnRefNo,
        transaction.txnId,
        transaction.bankTxnStatus,
        transaction.emailId,
        transaction.mobile,
        transaction.mobileNo
      ].join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `online_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sortedData = [...transactions].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / entriesPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronUp className="w-3 h-3 inline ml-1 opacity-30" />;
    }
    return sortOrder === 'asc' ? 
      <ChevronUp className="w-3 h-3 inline ml-1" /> : 
      <ChevronDown className="w-3 h-3 inline ml-1" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md" style={{ fontWeight: 700 }}>Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md" style={{ fontWeight: 700 }}>Rejected</Badge>;
      default:
        return <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md" style={{ fontWeight: 700 }}>Pending</Badge>;
    }
  };

  if (activeTab === 'ddcheque') {
    return (
      <div className="h-full flex flex-col gap-3 py-2 px-4">
        <AmbientWaterRipple />
        
        {/* Royal Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-xl shadow-2xl overflow-hidden border border-amber-400/30"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-transparent to-amber-400/10" />
          
          <div className="relative px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h2 className="text-white drop-shadow-lg" style={{ fontWeight: 800 }}>Approval Dashboard</h2>
              </div>
            </div>
            
            <div className="flex gap-2 bg-black/20 p-1 rounded-lg backdrop-blur-sm border border-white/10">
              <button
                onClick={() => setActiveTab('online')}
                className={`px-4 py-1.5 rounded-md transition-all text-xs ${
                  activeTab === 'online'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                style={{ fontWeight: 700 }}
              >
                <CreditCard className="w-3.5 h-3.5 inline mr-1.5" />
                Online Transactions
              </button>
              <button
                onClick={() => setActiveTab('ddcheque')}
                className={`px-4 py-1.5 rounded-md transition-all text-xs ${
                  activeTab === 'ddcheque'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                style={{ fontWeight: 700 }}
              >
                <FileText className="w-3.5 h-3.5 inline mr-1.5" />
                DD/Cheque
              </button>
            </div>
          </div>
        </motion.div>

        <DDChequeApproval />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-3 py-2 px-4">
      <AmbientWaterRipple />
      
      {/* Royal Header with Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-xl shadow-2xl overflow-hidden border border-amber-400/30 flex-shrink-0"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-transparent to-amber-400/10" />
        
        <div className="relative px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <h2 className="text-white drop-shadow-lg" style={{ fontWeight: 800 }}>Approval Dashboard</h2>
            </div>
            
            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="text-white text-xs" style={{ fontWeight: 700 }}>
                  {transactions.filter(t => t.status === 'approved').length} Approved
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-white text-xs" style={{ fontWeight: 700 }}>
                  {transactions.filter(t => t.status === 'pending').length} Pending
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 bg-black/20 p-1 rounded-lg backdrop-blur-sm border border-white/10">
            <button
              onClick={() => setActiveTab('online')}
              className={`px-4 py-1.5 rounded-md transition-all text-xs ${
                activeTab === 'online'
                  ? 'bg-[#0EA5E9] text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              style={{ fontWeight: 700 }}
            >
              <CreditCard className="w-3.5 h-3.5 inline mr-1.5" />
              Online Transactions
            </button>
            <button
              onClick={() => setActiveTab('ddcheque')}
              className={`px-4 py-1.5 rounded-md transition-all text-xs ${
                activeTab === 'ddcheque'
                  ? 'bg-[#0EA5E9] text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              style={{ fontWeight: 700 }}
            >
              <FileText className="w-3.5 h-3.5 inline mr-1.5" />
              DD/Cheque
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filter Section */}
      <CollapsibleFilterSection
        type={type}
        setType={setType}
        subType={subType}
        setSubType={setSubType}
        consumerNo={consumerNo}
        setConsumerNo={setConsumerNo}
        taxPayerName={taxPayerName}
        setTaxPayerName={setTaxPayerName}
        txnId={txnId}
        setTxnId={setTxnId}
        emailId={emailId}
        setEmailId={setEmailId}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        zone={zone}
        setZone={setZone}
        quarter={quarter}
        setQuarter={setQuarter}
        onSearch={handleSearch}
        onClear={handleClear}
        onGenerateExcel={handleGenerateExcel}
        totalRecords={allTransactions.length}
        filteredRecords={transactions.length}
      />

      {/* Royal Table Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex-1 flex flex-col min-h-0"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/15 to-cyan-200/15 rounded-full blur-3xl pointer-events-none" />

        {/* Generate Excel Button - Above Table */}
        <div className="relative px-4 py-2 bg-gradient-to-r from-slate-50 to-indigo-50 border-b border-slate-200 flex justify-end">
          <WaterRipple color="rgba(16, 185, 129, 0.3)">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleGenerateExcel}
                disabled={transactions.length === 0}
                className="h-8 px-4 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg shadow-md text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontWeight: 700 }}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5" />
                Generate Excel
              </Button>
            </motion.div>
          </WaterRipple>
        </div>

        <div className="relative flex-1 flex flex-col ">
          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-blue-500 to-blue-400 border-b-2 border-blue-300/50">
                  <th 
                    className="px-3 py-3 text-xs text-white text-center cursor-pointer hover:bg-white/10 transition-colors drop-shadow-md" 
                    style={{ fontWeight: 800 }}
                    onClick={() => handleSort('division')}
                  >
                    Division/Section <SortIcon field="division" />
                  </th>
                  <th 
                    className="px-3 py-3 text-xs text-white text-center cursor-pointer hover:bg-white/10 transition-colors drop-shadow-md" 
                    style={{ fontWeight: 800 }}
                    onClick={() => handleSort('consumerNo')}
                  >
                    Consumer No <SortIcon field="consumerNo" />
                  </th>
                  <th 
                    className="px-3 py-3 text-xs text-white text-center cursor-pointer hover:bg-white/10 transition-colors drop-shadow-md" 
                    style={{ fontWeight: 800 }}
                    onClick={() => handleSort('taxPayerName')}
                  >
                    Tax Payer Name <SortIcon field="taxPayerName" />
                  </th>
                  <th className="px-3 py-3 text-xs text-white text-center drop-shadow-md" style={{ fontWeight: 800 }}>
                    Payment Type
                  </th>
                  <th 
                    className="px-3 py-3 text-xs text-white text-center cursor-pointer hover:bg-white/10 transition-colors drop-shadow-md" 
                    style={{ fontWeight: 800 }}
                    onClick={() => handleSort('transactionDate')}
                  >
                    Transaction Date <SortIcon field="transactionDate" />
                  </th>
                  <th 
                    className="px-3 py-3 text-xs text-white text-center cursor-pointer hover:bg-white/10 transition-colors drop-shadow-md" 
                    style={{ fontWeight: 800 }}
                    onClick={() => handleSort('amount')}
                  >
                    Amount <SortIcon field="amount" />
                  </th>
                  <th className="px-3 py-3 text-xs text-white text-center drop-shadow-md" style={{ fontWeight: 800 }}>
                    Txn Ref. No.
                  </th>
                  <th className="px-3 py-3 text-xs text-white text-center drop-shadow-md" style={{ fontWeight: 800 }}>
                    Txn ID
                  </th>
                  <th className="px-3 py-3 text-xs text-white text-center drop-shadow-md" style={{ fontWeight: 800 }}>
                    Bank Status
                  </th>
                  <th className="px-3 py-3 text-xs text-white text-center drop-shadow-md" style={{ fontWeight: 800 }}>
                    Email ID
                  </th>
                  <th className="px-3 py-3 text-xs text-white text-center drop-shadow-md" style={{ fontWeight: 800 }}>
                    Mobile
                  </th>
                  <th className="px-3 py-3 text-xs text-white text-center drop-shadow-md" style={{ fontWeight: 800 }}>
                    Status
                  </th>
                  <th className="px-3 py-3 text-xs text-white text-center drop-shadow-md" style={{ fontWeight: 800 }}>
                    Action Required
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      } hover:bg-indigo-50/50 transition-colors border-b border-slate-200/50 cursor-pointer group`}
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <td className="px-3 py-2 text-xs text-slate-900 text-center" style={{ fontWeight: 600 }}>
                        {transaction.division}
                      </td>
                      <td className="px-3 py-2 text-xs text-blue-700 text-center" style={{ fontWeight: 700 }}>
                        {transaction.consumerNo}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-900 text-center" style={{ fontWeight: 600 }}>
                        {transaction.taxPayerName}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-900 text-center" style={{ fontWeight: 600 }}>
                        {transaction.paymentType}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-900 text-center" style={{ fontWeight: 600 }}>
                        {transaction.transactionDate}
                      </td>
                      <td className="px-3 py-2 text-xs text-emerald-600 text-center" style={{ fontWeight: 700 }}>
                        ₹{transaction.amount}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-700 text-center truncate max-w-[200px]" style={{ fontWeight: 600 }}>
                        {transaction.txnRefNo}
                      </td>
                      <td className="px-3 py-2 text-xs text-blue-600 text-center" style={{ fontWeight: 700 }}>
                        {transaction.txnId}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-900 text-center" style={{ fontWeight: 600 }}>
                        {transaction.bankTxnStatus}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-700 text-center truncate max-w-[180px]" style={{ fontWeight: 600 }}>
                        {transaction.emailId}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-900 text-center" style={{ fontWeight: 600 }}>
                        {transaction.mobile}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className="px-3 py-2 text-center" onClick={(e) => e.stopPropagation()}>
                        {!transaction.edited && transaction.status === 'pending' ? (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Edit button clicked:', transaction);
                              handleEdit(transaction);
                            }}
                            className="w-7 h-7 rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white flex items-center justify-center shadow-md mx-auto"
                            title="Edit Transaction"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </motion.button>
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={14} className="px-4 py-8 text-center text-slate-500">
                      {transactions.length === 0 ? 'Use filters above and click Search to display transactions' : 'No transactions found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Royal Pagination */}
          {totalPages > 1 && (
            <div className="relative bg-gradient-to-r from-slate-50 via-indigo-50 to-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
              <div className="text-xs text-slate-700" style={{ fontWeight: 600 }}>
                Showing {(currentPage - 1) * entriesPerPage + 1} to{' '}
                {Math.min(currentPage * entriesPerPage, sortedData.length)} of {sortedData.length} entries
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="border-indigo-300 hover:bg-indigo-50"
                  style={{ fontWeight: 700 }}
                >
                  Previous
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md' 
                      : 'border-indigo-300 hover:bg-indigo-50'}
                    style={{ fontWeight: 700 }}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="border-indigo-300 hover:bg-indigo-50"
                  style={{ fontWeight: 700 }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Edit Transaction Modal */}
      <Dialog open={!!editTransaction} onOpenChange={(open) => !open && setEditTransaction(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-600" />
              Edit Transaction
            </DialogTitle>
            <DialogDescription>
              Update the transaction details below. Amount field is not editable.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <label className="text-sm text-slate-700 mb-1.5 block" style={{ fontWeight: 700 }}>
                Tax Payer Name
              </label>
              <Input
                value={editTaxPayerName}
                onChange={(e) => setEditTaxPayerName(e.target.value)}
                className="h-10 bg-white border-2 border-blue-300/50 hover:border-blue-500 focus:border-blue-500 rounded-lg"
                style={{ fontWeight: 600 }}
              />
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-1.5 block" style={{ fontWeight: 700 }}>
                Consumer Number
              </label>
              <Input
                value={editConsumerNo}
                onChange={(e) => setEditConsumerNo(e.target.value)}
                className="h-10 bg-white border-2 border-cyan-300/50 hover:border-cyan-500 focus:border-cyan-500 rounded-lg"
                style={{ fontWeight: 600 }}
              />
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-1.5 block" style={{ fontWeight: 700 }}>
                Transaction ID
              </label>
              <Input
                value={editTxnId}
                onChange={(e) => setEditTxnId(e.target.value)}
                className="h-10 bg-white border-2 border-purple-300/50 hover:border-purple-500 focus:border-purple-500 rounded-lg"
                style={{ fontWeight: 600 }}
              />
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-1.5 block" style={{ fontWeight: 700 }}>
                Amount (Not Editable)
              </label>
              <Input
                value={`₹${editTransaction?.amount}`}
                disabled
                className="h-10 bg-slate-100 border-2 border-slate-300 rounded-lg cursor-not-allowed"
                style={{ fontWeight: 600 }}
              />
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-1.5 block" style={{ fontWeight: 700 }}>
                Transaction Date
              </label>
              <Input
                value={editTransactionDate}
                onChange={(e) => setEditTransactionDate(e.target.value)}
                className="h-10 bg-white border-2 border-orange-300/50 hover:border-orange-500 focus:border-orange-500 rounded-lg"
                style={{ fontWeight: 600 }}
              />
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-1.5 block" style={{ fontWeight: 700 }}>
                Mobile Number
              </label>
              <Input
                value={editMobile}
                onChange={(e) => setEditMobile(e.target.value)}
                className="h-10 bg-white border-2 border-pink-300/50 hover:border-pink-500 focus:border-pink-500 rounded-lg"
                style={{ fontWeight: 600 }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setEditTransaction(null)}
              variant="outline"
              className="border-slate-300 hover:bg-slate-50"
              style={{ fontWeight: 700 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateTransaction}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              style={{ fontWeight: 700 }}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <PaymentTransactionStatusModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onApprove={handleApprove}
          onUnapprove={handleReject}
        />
      )}

      {/* Search Dialog */}
      <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-indigo-600" />
              Search Results
            </DialogTitle>
            <DialogDescription>
              Filters applied successfully
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-200">
              <span className="text-xs text-slate-700" style={{ fontWeight: 700 }}>Total Results:</span>
              <span className="text-xs text-indigo-700" style={{ fontWeight: 800 }}>{transactions.length} transactions</span>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              {type !== 'all' && (
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 700 }}>Type:</span>
                  <span className="text-slate-700">{type}</span>
                </div>
              )}
              {consumerNo && (
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 700 }}>Consumer No:</span>
                  <span className="text-slate-700">{consumerNo}</span>
                </div>
              )}
              {taxPayerName && (
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 700 }}>Tax Payer Name:</span>
                  <span className="text-slate-700">{taxPayerName}</span>
                </div>
              )}
              {txnId && (
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 700 }}>Txn ID:</span>
                  <span className="text-slate-700">{txnId}</span>
                </div>
              )}
              {emailId && (
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 700 }}>Email ID:</span>
                  <span className="text-slate-700">{emailId}</span>
                </div>
              )}
              {fromDate && (
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 700 }}>From Date:</span>
                  <span className="text-slate-700">{fromDate}</span>
                </div>
              )}
              {toDate && (
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 700 }}>To Date:</span>
                  <span className="text-slate-700">{toDate}</span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCloseSearchDialog}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
              style={{ fontWeight: 700 }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}