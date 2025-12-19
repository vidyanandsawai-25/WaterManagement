import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  X,
  Calendar,
  ChevronDown,
  Filter,
  SlidersHorizontal,
  MapPin,
  Building2,
  Hash,
  Clock,
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

interface CollapsibleFilterSectionProps {
  type: string;
  setType: (value: string) => void;
  subType: string;
  setSubType: (value: string) => void;
  consumerNo: string;
  setConsumerNo: (value: string) => void;
  taxPayerName: string;
  setTaxPayerName: (value: string) => void;
  txnId: string;
  setTxnId: (value: string) => void;
  emailId: string;
  setEmailId: (value: string) => void;
  fromDate: string;
  setFromDate: (value: string) => void;
  toDate: string;
  setToDate: (value: string) => void;
  zone: string;
  setZone: (value: string) => void;
  quarter: string;
  setQuarter: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  onGenerateExcel: () => void;
  totalRecords?: number;
  filteredRecords?: number;
}

export function CollapsibleFilterSection({
  type,
  setType,
  subType,
  setSubType,
  consumerNo,
  setConsumerNo,
  taxPayerName,
  setTaxPayerName,
  txnId,
  setTxnId,
  emailId,
  setEmailId,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  zone,
  setZone,
  quarter,
  setQuarter,
  onSearch,
  onClear,
  onGenerateExcel,
  totalRecords = 1234,
  filteredRecords = 856,
}: CollapsibleFilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
          onClick={() => setIsExpanded(!isExpanded)}
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
                Filter Details
              </h2>
              <p className="text-xs text-slate-600" style={{ fontWeight: 600 }}>
                {isExpanded ? 'Click to collapse' : 'Click to expand'}
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
              animate={{ rotate: isExpanded ? 180 : 0 }}
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
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{
          height: { duration: 0.3, ease: 'easeInOut' },
          opacity: { duration: 0.25, ease: 'easeInOut' },
        }}
        className="overflow-hidden"
      >
        <div className="relative p-3 border-t border-indigo-100 space-y-2">
          {/* Filter Grid - Row 1: Type | Sub Type | Consumer Number (wider) | From Date | To Date | Division/Zone | Tax Payer Name | Transaction ID (wider) */}
          <div className="grid grid-cols-10 gap-2">
            {/* Type */}
            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                Type
              </label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-8 bg-white border border-black rounded-lg text-xs" style={{ fontWeight: 600 }}>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border border-black">
                  <SelectItem value="all" className="text-xs" style={{ fontWeight: 600 }}>
                    All Types
                  </SelectItem>
                  <SelectItem value="new_connection_installed" className="text-xs" style={{ fontWeight: 600 }}>
                    New Connection Installed
                  </SelectItem>
                  <SelectItem value="new_tap_connection" className="text-xs" style={{ fontWeight: 600 }}>
                    New Tap Connection
                  </SelectItem>
                  <SelectItem value="new_meter_connection" className="text-xs" style={{ fontWeight: 600 }}>
                    New Meter Connection
                  </SelectItem>
                  <SelectItem value="alteration" className="text-xs" style={{ fontWeight: 600 }}>
                    Alteration
                  </SelectItem>
                  <SelectItem value="disconnection" className="text-xs" style={{ fontWeight: 600 }}>
                    Disconnection
                  </SelectItem>
                  <SelectItem value="other_tap_connection" className="text-xs" style={{ fontWeight: 600 }}>
                    Other Tap Connection Records
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sub Type */}
            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                Sub Type
              </label>
              <Select value={subType} onValueChange={setSubType}>
                <SelectTrigger className="h-8 bg-white border border-black rounded-lg text-xs" style={{ fontWeight: 600 }}>
                  <SelectValue placeholder="All Sub Types" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border border-black">
                  <SelectItem value="all" className="text-xs" style={{ fontWeight: 600 }}>
                    All Sub Types
                  </SelectItem>
                  <SelectItem value="normal" className="text-xs" style={{ fontWeight: 600 }}>
                    Normal
                  </SelectItem>
                  <SelectItem value="special" className="text-xs" style={{ fontWeight: 600 }}>
                    Special
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Consumer Number - Wider (2 columns) */}
            <div className="col-span-2">
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                Consumer Number
              </label>
              <Input
                type="text"
                placeholder="Enter Consumer No"
                value={consumerNo}
                onChange={(e) => setConsumerNo(e.target.value)}
                className="h-8 bg-white border border-black rounded-lg text-xs"
                style={{ fontWeight: 600 }}
              />
            </div>

            {/* From Date */}
            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                From Date
              </label>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="h-8 bg-white border border-black rounded-lg text-xs"
                style={{ fontWeight: 600 }}
              />
            </div>

            {/* To Date */}
            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                To Date
              </label>
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="h-8 bg-white border border-black rounded-lg text-xs"
                style={{ fontWeight: 600 }}
              />
            </div>

            {/* Zone/Division */}
            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                Division/Zone
              </label>
              <Select value={zone} onValueChange={setZone}>
                <SelectTrigger className="h-8 bg-white border border-black rounded-lg text-xs" style={{ fontWeight: 600 }}>
                  <SelectValue placeholder="All Zones" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border border-black">
                  <SelectItem value="all" className="text-xs" style={{ fontWeight: 600 }}>
                    All Zones
                  </SelectItem>
                  <SelectItem value="zone-a" className="text-xs" style={{ fontWeight: 600 }}>
                    Zone A
                  </SelectItem>
                  <SelectItem value="zone-b" className="text-xs" style={{ fontWeight: 600 }}>
                    Zone B
                  </SelectItem>
                  <SelectItem value="zone-c" className="text-xs" style={{ fontWeight: 600 }}>
                    Zone C
                  </SelectItem>
                  <SelectItem value="zone-d" className="text-xs" style={{ fontWeight: 600 }}>
                    Zone D
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tax Payer Name */}
            <div>
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                Tax Payer Name
              </label>
              <Input
                type="text"
                placeholder="Enter Name"
                value={taxPayerName}
                onChange={(e) => setTaxPayerName(e.target.value)}
                className="h-8 bg-white border border-black rounded-lg text-xs"
                style={{ fontWeight: 600 }}
              />
            </div>

            {/* Transaction ID - Wider (2 columns) */}
            <div className="col-span-2">
              <label className="text-xs text-slate-700 mb-1 block" style={{ fontWeight: 700 }}>
                Transaction ID
              </label>
              <Input
                type="text"
                placeholder="Enter Txn ID"
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
                className="h-8 bg-white border border-black rounded-lg text-xs"
                style={{ fontWeight: 600 }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={onSearch}
                className="h-8 px-6 bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-lg shadow-md text-xs"
                style={{ fontWeight: 700 }}
              >
                <Search className="w-3.5 h-3.5 mr-1.5" />
                Search
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={onClear}
                variant="outline"
                className="h-8 px-6 border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg text-xs"
                style={{ fontWeight: 700 }}
              >
                <X className="w-3.5 h-3.5 mr-1.5" />
                Clear
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}