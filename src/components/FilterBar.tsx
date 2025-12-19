import { useState } from 'react';
import { Search, FileCheck, FileText, Download, Filter, X, Table2, List } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { RegisterApplicationModalStepWise } from './RegisterApplicationModalStepWise';
import { AllocateApplicationModal } from './AllocateApplicationModal';
import { DownloadRegisterModal } from './DownloadRegisterModal';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  entriesPerPage: number;
  setEntriesPerPage: (value: number) => void;
  onNewApplication?: (app: any) => void;
  applications?: any[];
  showZonewiseTable?: boolean;
  onToggleZonewiseTable?: () => void;
}

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
  onNewApplication,
  applications,
  showZonewiseTable,
  onToggleZonewiseTable,
}: FilterBarProps) {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [allocateModalOpen, setAllocateModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <>
      {/* Filter Section Card - Enhanced */}
      <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-white rounded-2xl shadow-xl border border-blue-100/50 py-3 px-4 md:px-5 overflow-hidden mx-[0px] my-[9px]">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-indigo-400/10 to-transparent rounded-full blur-3xl" />
        
        {/* Geometric pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Header with gradient */}
        <div className="relative flex items-center gap-3 mb-3 pb-2 border-b border-gradient-to-r from-transparent via-blue-200/50 to-transparent">
          <div className="w-10 h-10 bg-gradient-to-br from-[#005AA7] via-[#0077B6] to-[#00C6FF] rounded-xl flex items-center justify-center shadow-lg">
            <Filter className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-sm md:text-base bg-gradient-to-r from-[#005AA7] via-[#0077B6] to-[#00C6FF] bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
              Filter & Search Applications
            </h3>
            <p className="text-[10px] md:text-xs text-gray-500" style={{ fontWeight: 500 }}>
              Find and manage applications efficiently
            </p>
          </div>
        </div>
        
        {/* Filter Bar - Mobile Responsive */}
        <div className="relative space-y-2.5">
          {/* Single Row: All Items Together */}
          <div className="flex gap-2.5 items-center">
            {/* Left Side: Filter Dropdowns */}
            <div className="flex gap-2.5 items-center">
              {/* All Types Dropdown */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-40 transition-opacity blur-sm" />

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger
                    className="relative w-[165px] !h-11 bg-white border-2 border-gray-200 
                    hover:border-indigo-400 focus:border-indigo-500 rounded-lg 
                    shadow-sm hover:shadow-md transition-all backdrop-blur-sm text-xs"
                    style={{ fontWeight: 600 }}
                  >
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>

                  {/* Increase dropdown box height + item height */}
                  <SelectContent className="max-h-80 text-base">
                    <SelectItem className="h-12 flex items-center" value="all">All Types</SelectItem>
                    <SelectItem className="h-12 flex items-center" value="new_connection_installed">New Connection Installed</SelectItem>
                    <SelectItem className="h-12 flex items-center" value="new_tap_connection">New Tap Connection</SelectItem>
                    <SelectItem className="h-12 flex items-center" value="new_meter_connection">New Meter Connection</SelectItem>
                    <SelectItem className="h-12 flex items-center" value="alteration">Alteration</SelectItem>
                    <SelectItem className="h-12 flex items-center" value="disconnection">Disconnection</SelectItem>
                    <SelectItem className="h-12 flex items-center" value="other_tap_connection">Other Tap Connection Records</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* All Status Dropdown */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-40 transition-opacity blur-sm" />
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="relative w-[165px] !h-11 bg-white border-2 border-gray-200 hover:border-purple-400 focus:border-purple-500 rounded-lg shadow-sm hover:shadow-md transition-all backdrop-blur-sm text-xs" style={{ fontWeight: 600 }}>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="initiated">Initiated</SelectItem>
                    <SelectItem value="application_accepted">Application Accepted</SelectItem>
                    <SelectItem value="application_processed">Application Processed</SelectItem>
                    <SelectItem value="notesheet_upload_pending">Notesheet Upload Pending</SelectItem>
                    <SelectItem value="send_to_approval">Send To Approval</SelectItem>
                    <SelectItem value="payment_approval_pending">Payment Approval Pending</SelectItem>
                    <SelectItem value="meter_details_pending">Meter Details Pending</SelectItem>
                    <SelectItem value="make_payment">Make Payment</SelectItem>
                    <SelectItem value="meter_added">Meter Added</SelectItem>
                    <SelectItem value="disapproved">DisApproved</SelectItem>
                    <SelectItem value="application_disapproved">Application DisApproved</SelectItem>
                    <SelectItem value="discard_by_operator">Discard by Operator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Middle: Search Bar (Flexible) */}
            <div className="relative group flex-1">
              <div className="relative">
                {/* Search icon container */}
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <Search className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                
                {/* Search input */}
                <Input
                  type="text"
                  placeholder="Search by Application No, Consumer No, or Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="relative pl-11 pr-10 h-11 bg-white border-2 border-gray-200 hover:border-blue-400 focus:border-blue-500 rounded-lg shadow-md hover:shadow-lg transition-all text-gray-800 text-xs"
                  style={{ fontWeight: 500 }}
                />
                
                {/* Clear button */}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all cursor-pointer flex items-center justify-center shadow-md hover:scale-105 duration-200"
                    type="button"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>

            {/* Right Side: Action Buttons */}
            <div className="flex gap-2.5 items-center">
              {onToggleZonewiseTable && (
                <div className="relative group">
                  <Button 
                    onClick={onToggleZonewiseTable}
                    className={`relative w-[120px] h-11 ${
                      showZonewiseTable 
                        ? 'bg-[#0EA5E9] hover:bg-[#0284C7] text-white' 
                        : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300'
                    } rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs`}
                    style={{ fontWeight: 600 }}
                    aria-label={showZonewiseTable ? "Switch to applications view" : "Switch to zonewise view"}
                    aria-pressed={showZonewiseTable}
                  >
                    {showZonewiseTable ? (
                      <>
                        <List className="w-4 h-4 mr-1.5" strokeWidth={2.5} aria-hidden="true" />
                        <span>Applications</span>
                      </>
                    ) : (
                      <>
                        <Table2 className="w-4 h-4 mr-1.5" strokeWidth={2.5} aria-hidden="true" />
                        <span>Zonewise</span>
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              <div className="relative group">
                <Button 
                  onClick={() => setRegisterModalOpen(true)}
                  className="relative w-[110px] h-11 bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs"
                  style={{ fontWeight: 600 }}
                  aria-label="Register new application"
                >
                  <FileText className="w-4 h-4 mr-1.5" strokeWidth={2.5} aria-hidden="true" />
                  <span>Register</span>
                </Button>
              </div>

              <div className="relative group">
                <Button 
                  onClick={() => setDownloadModalOpen(true)}
                  className="relative w-[115px] h-11 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs"
                  style={{ fontWeight: 600 }}
                  aria-label="Download register"
                >
                  <Download className="w-4 h-4 mr-1.5" strokeWidth={2.5} aria-hidden="true" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RegisterApplicationModalStepWise 
        open={registerModalOpen} 
        onClose={() => setRegisterModalOpen(false)} 
        onRegister={onNewApplication}
      />
      <AllocateApplicationModal 
        open={allocateModalOpen} 
        onClose={() => setAllocateModalOpen(false)} 
      />
      <DownloadRegisterModal 
        open={downloadModalOpen} 
        onClose={() => setDownloadModalOpen(false)}
        applications={applications || []}
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedStatus={selectedStatus}
      />
    </>
  );
}