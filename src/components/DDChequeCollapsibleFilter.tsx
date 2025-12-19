import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  X,
  ChevronDown,
  Filter,
  FileSpreadsheet,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { WaterRipple } from './WaterRipple';

interface DDChequeCollapsibleFilterProps {
  nodeNo: string;
  setNodeNo: (value: string) => void;
  bankName: string;
  setBankName: (value: string) => void;
  chequeNo: string;
  setChequeNo: (value: string) => void;
  consumerNo: string;
  setConsumerNo: (value: string) => void;
  accountName: string;
  setAccountName: (value: string) => void;
  fromDate: string;
  setFromDate: (value: string) => void;
  toDate: string;
  setToDate: (value: string) => void;
  section: string;
  setSection: (value: string) => void;
  paymentStatus: string;
  setPaymentStatus: (value: string) => void;
  // Legacy props for backward compatibility
  waterTaxModule: string;
  setWaterTaxModule: (value: string) => void;
  dateType: string;
  setDateType: (value: string) => void;
  depositDate: string;
  setDepositDate: (value: string) => void;
  chequeDate: string;
  setChequeDate: (value: string) => void;
  hour: string;
  setHour: (value: string) => void;
  minute: string;
  setMinute: (value: string) => void;
  ampm: string;
  setAmpm: (value: string) => void;
  onSearch: () => void;
  onGenerateExcel: () => void;
  onCancel: () => void;
  totalRecords?: number;
  filteredRecords?: number;
  isExpanded?: boolean;
  setIsExpanded?: (value: boolean) => void;
}

export function DDChequeCollapsibleFilter({
  nodeNo,
  setNodeNo,
  bankName,
  setBankName,
  chequeNo,
  setChequeNo,
  consumerNo,
  setConsumerNo,
  accountName,
  setAccountName,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  section,
  setSection,
  paymentStatus,
  setPaymentStatus,
  // Legacy props
  waterTaxModule,
  setWaterTaxModule,
  dateType,
  setDateType,
  depositDate,
  setDepositDate,
  chequeDate,
  setChequeDate,
  hour,
  setHour,
  minute,
  setMinute,
  ampm,
  setAmpm,
  onSearch,
  onGenerateExcel,
  onCancel,
  totalRecords = 0,
  filteredRecords = 0,
  isExpanded = false,
  setIsExpanded = () => {},
}: DDChequeCollapsibleFilterProps) {
  const [localIsExpanded, setLocalIsExpanded] = useState(isExpanded);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-indigo-200/50 overflow-hidden flex-shrink-0"
    >
      {/* Collapsible Header */}
      <WaterRipple color="rgba(99, 102, 241, 0.2)">
        <motion.button
          onClick={() => setLocalIsExpanded(!localIsExpanded)}
          whileHover={{ scale: 1.002 }}
          whileTap={{ scale: 0.998 }}
          className="relative w-full p-3 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-indigo-50/50 hover:from-indigo-50 hover:via-purple-50 hover:to-indigo-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <Filter className="w-5 h-5 text-white drop-shadow-md" />
            </div>
            <div className="text-left">
              <h2 className="text-slate-900" style={{ fontWeight: 800 }}>
                DD/Cheque Filter
              </h2>
              <p className="text-xs text-slate-600" style={{ fontWeight: 600 }}>
                {localIsExpanded ? 'Click to collapse' : 'Click to expand'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-md bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-sm">
                <div className="text-[10px]" style={{ fontWeight: 700 }}>Total</div>
                <div className="text-xs text-center" style={{ fontWeight: 900 }}>{totalRecords}</div>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm">
                <div className="text-[10px]" style={{ fontWeight: 700 }}>Filtered</div>
                <div className="text-xs text-center" style={{ fontWeight: 900 }}>{filteredRecords}</div>
              </div>
            </div>

            <motion.div
              animate={{ rotate: localIsExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center"
            >
              <ChevronDown className="w-4 h-4 text-indigo-600" />
            </motion.div>
          </div>
        </motion.button>
      </WaterRipple>

      {/* Collapsible Content */}
      <motion.div
        initial={false}
        animate={{
          height: localIsExpanded ? 'auto' : 0,
          opacity: localIsExpanded ? 1 : 0,
        }}
        transition={{
          height: { duration: 0.3, ease: 'easeInOut' },
          opacity: { duration: 0.25, ease: 'easeInOut' },
        }}
        className="overflow-hidden"
      >
        <div className="relative p-3 border-t border-indigo-100 space-y-2">
          {/* Row 1: Data Type, Node No, Cheque No, Sector */}
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                Data Type
              </label>
              <Select value={dateType} onValueChange={setDateType}>
                <SelectTrigger className="h-8 bg-white border border-blue-300/50 hover:border-blue-500 rounded-lg text-xs" style={{ fontWeight: 600 }}>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border border-blue-300">
                  <SelectItem value="water-bill" className="text-xs" style={{ fontWeight: 600 }}>
                    Water Bill
                  </SelectItem>
                  <SelectItem value="property-tax" className="text-xs" style={{ fontWeight: 600 }}>
                    Property Tax
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                Node No.
              </label>
              <Input
                type="text"
                placeholder="Enter Node No"
                value={nodeNo}
                onChange={(e) => setNodeNo(e.target.value)}
                className="h-8 bg-white border border-cyan-300/50 hover:border-cyan-500 focus:border-cyan-500 rounded-lg text-xs"
                style={{ fontWeight: 600 }}
              />
            </div>

            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                Cheque No.
              </label>
              <Input
                type="text"
                placeholder="Enter Cheque No"
                value={chequeNo}
                onChange={(e) => setChequeNo(e.target.value)}
                className="h-8 bg-white border border-orange-300/50 hover:border-orange-500 focus:border-orange-500 rounded-lg text-xs"
                style={{ fontWeight: 600 }}
              />
            </div>

            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                Sector
              </label>
              <Select value={section} onValueChange={setSection}>
                <SelectTrigger className="h-8 bg-white border border-indigo-300/50 hover:border-indigo-500 rounded-lg text-xs" style={{ fontWeight: 600 }}>
                  <SelectValue placeholder="Select Sector" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border border-indigo-300">
                  <SelectItem value="sector-a" className="text-xs" style={{ fontWeight: 600 }}>
                    Sector A
                  </SelectItem>
                  <SelectItem value="sector-b" className="text-xs" style={{ fontWeight: 600 }}>
                    Sector B
                  </SelectItem>
                  <SelectItem value="sector-c" className="text-xs" style={{ fontWeight: 600 }}>
                    Sector C
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: From Date, To Date, Time, AM/PM */}
          <div className="grid grid-cols-6 gap-2">
            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                From Date
              </label>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="h-8 bg-white border border-pink-300/50 hover:border-pink-500 focus:border-pink-500 rounded-lg text-xs"
                style={{ fontWeight: 600 }}
              />
            </div>

            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                To Date
              </label>
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="h-8 bg-white border border-teal-300/50 hover:border-teal-500 focus:border-teal-500 rounded-lg text-xs"
                style={{ fontWeight: 600 }}
              />
            </div>

            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                Time
              </label>
              <Input
                type="time"
                value={hour && minute ? `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}` : ''}
                onChange={(e) => {
                  const [h, m] = e.target.value.split(':');
                  setHour(h);
                  setMinute(m);
                }}
                className="h-8 bg-white border border-rose-300/50 hover:border-rose-500 focus:border-rose-500 rounded-lg text-xs"
                style={{ fontWeight: 600 }}
              />
            </div>

            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                AM/PM
              </label>
              <Select value={ampm} onValueChange={setAmpm}>
                <SelectTrigger className="h-8 bg-white border border-fuchsia-300/50 hover:border-fuchsia-500 rounded-lg text-xs" style={{ fontWeight: 600 }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg border border-fuchsia-300">
                  <SelectItem value="AM" className="text-xs" style={{ fontWeight: 600 }}>
                    AM
                  </SelectItem>
                  <SelectItem value="PM" className="text-xs" style={{ fontWeight: 600 }}>
                    PM
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                onClick={onSearch}
                className="w-full h-8 bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-lg shadow-md text-xs"
                style={{ fontWeight: 700 }}
              >
                <Search className="w-3.5 h-3.5 mr-1.5" />
                Search
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                onClick={onCancel}
                variant="outline"
                className="w-full h-8 border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg text-xs"
                style={{ fontWeight: 700 }}
              >
                <X className="w-3.5 h-3.5 mr-1.5" />
                Cancel
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}