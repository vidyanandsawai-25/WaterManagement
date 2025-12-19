'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Plug, RefreshCw, Wrench, AlertTriangle, MessageSquareWarning, TrendingUp, Users, FileEdit, Settings, Bell, Database, XCircle, Ban } from 'lucide-react';
import { FilterBar } from './FilterBar';
import { ApplicationsTableSimple } from './ApplicationsTableSimple';
import { ZonewiseTable } from './ZonewiseComponents';
import { toast } from 'sonner';

// ============================================================================
// STATS GRID COMPONENT
// ============================================================================
interface StatsGridProps {
  onCardClick: (filterType: string) => void;
  activeCard: string;
  applications: any[];
  sessionComplaintCount: number;
}

export function StatsGrid({ onCardClick, activeCard, applications, sessionComplaintCount }: StatsGridProps) {
  // Calculate counts dynamically
  const newConnectionCount = applications.filter(app => app.details === 'New Connection').length;
  const mutationCount = applications.filter(app => app.details === 'Correction in Demand Bill').length;
  const alterationCount = applications.filter(app => app.details === 'Alteration').length;
  
  // Today's complaint - count applications created today based on dateTime field
  const todayComplaintCount = applications.filter(app => {
    if (!app.dateTime) return false;
    
    try {
      // Parse the dateTime string (format: "10/14/2025 9:15:30")
      const appDate = new Date(app.dateTime);
      const today = new Date();
      
      // Compare year, month, and day
      return appDate.getFullYear() === today.getFullYear() &&
             appDate.getMonth() === today.getMonth() &&
             appDate.getDate() === today.getDate();
    } catch (error) {
      return false;
    }
  }).length;
  
  // Total complaint = new connection + mutation + alteration + today's complaint
  const totalComplaintCount = newConnectionCount + mutationCount + alterationCount + todayComplaintCount;

  // Total Discards - count applications with "Rejected" status
  const totalDiscardsCount = applications.filter(app => {
    const status = app.status?.toLowerCase() || '';
    return status === 'rejected';
  }).length;

  // Calculate max value for bar chart scaling
  const maxValue = Math.max(newConnectionCount, mutationCount, alterationCount, todayComplaintCount, totalComplaintCount, totalDiscardsCount, 1);

  const stats = [
    { 
      label: 'New Connection', 
      value: newConnectionCount,
      description: 'New water line installations',
      gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(255, 255, 255, 0.95) 100%)',
      iconBg: 'bg-cyan-500',
      bgIcon: Users,
      bgColor: 'text-cyan-100',
      chartColor: 'bg-cyan-500',
      chartBgColor: 'bg-cyan-200',
      icon: Plug,
      filterType: 'new_connection',
    },
    { 
      label: 'Mutation', 
      value: mutationCount,
      description: 'Ownership transfer requests',
      gradient: 'linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(255, 255, 255, 0.95) 100%)',
      iconBg: 'bg-orange-500',
      bgIcon: FileEdit,
      bgColor: 'text-orange-100',
      chartColor: 'bg-orange-500',
      chartBgColor: 'bg-orange-200',
      icon: RefreshCw,
      filterType: 'mutation',
    },
    { 
      label: 'Alteration', 
      value: alterationCount,
      description: 'Meter & connection changes',
      gradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(255, 255, 255, 0.95) 100%)',
      iconBg: 'bg-sky-500',
      bgIcon: Settings,
      bgColor: 'text-sky-100',
      chartColor: 'bg-sky-500',
      chartBgColor: 'bg-sky-200',
      icon: Wrench,
      filterType: 'alteration',
    },
    { 
      label: "Today's Complaint", 
      value: todayComplaintCount,
      description: 'New issues reported today',
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(255, 255, 255, 0.95) 100%)',
      iconBg: 'bg-purple-500',
      bgIcon: Bell,
      bgColor: 'text-purple-100',
      chartColor: 'bg-purple-500',
      chartBgColor: 'bg-purple-200',
      icon: AlertTriangle,
      filterType: 'today_complaint',
    },
    { 
      label: 'Total Complaint', 
      value: totalComplaintCount,
      description: 'All applications combined',
      gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(255, 255, 255, 0.95) 100%)',
      iconBg: 'bg-green-500',
      bgIcon: Database,
      bgColor: 'text-green-100',
      chartColor: 'bg-green-500',
      chartBgColor: 'bg-green-200',
      icon: MessageSquareWarning,
      filterType: 'total_complaint',
    },
    { 
      label: 'Total Discards', 
      value: totalDiscardsCount,
      description: 'Applications rejected',
      gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(255, 255, 255, 0.95) 100%)',
      iconBg: 'bg-red-500',
      bgIcon: XCircle,
      bgColor: 'text-red-100',
      chartColor: 'bg-red-500',
      chartBgColor: 'bg-red-200',
      icon: Ban,
      filterType: 'total_discards',
    },
  ];

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 px-0 md:px-1 mx-[0px] my-[12px]"
      role="region"
      aria-label="Application statistics overview"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const BgIcon = stat.bgIcon;
        const isActive = activeCard === stat.filterType;
        const barHeight = maxValue > 0 ? (stat.value / maxValue) * 100 : 0;
        
        return (
          <motion.button
            key={stat.label}
            onClick={() => onCardClick(stat.filterType)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            style={{ background: stat.gradient }}
            className={`relative rounded-xl p-4 transition-all duration-300 text-left overflow-hidden backdrop-blur-sm ${
              isActive 
                ? 'shadow-lg ring-2 ring-blue-500 ring-offset-2' 
                : 'shadow-md hover:shadow-lg'
            }`}
            aria-label={`Filter by ${stat.label}, showing ${stat.value} items - ${stat.description}`}
            aria-pressed={isActive}
          >
            {/* Large Background Icon - Watermark Style */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.08] pointer-events-none">
              <BgIcon className={`w-28 h-28 ${stat.bgColor}`} strokeWidth={1.5} />
            </div>

            {/* Card Content - Redesigned Compact Layout */}
            <div className="relative z-10 flex items-start justify-between gap-3">
              {/* Left Side: Icon + Content */}
              <div className="flex-1 min-w-0">
                {/* Top Row: Icon + Count */}
                <div className="flex items-center gap-3 mb-2">
                  {/* Icon Circle */}
                  <div className={`${stat.iconBg} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  
                  {/* Count */}
                  <div className="text-gray-900 text-2xl" style={{ fontWeight: 700, lineHeight: 1 }}>
                    {stat.value}
                  </div>
                </div>

                {/* Card Name/Label */}
                <div className="text-gray-700 text-sm mb-1 ml-0" style={{ fontWeight: 600 }}>
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-gray-500 text-xs ml-0" style={{ fontWeight: 400 }}>
                  {stat.description}
                </div>
              </div>

              {/* Right Side: Mini Bar Chart */}
              <div className="flex flex-col items-center justify-start gap-1 flex-shrink-0">
                {/* Bar Chart Visualization */}
                <div className="flex items-end gap-0.5 h-12">
                  {/* Generate 5 bars with different heights to show trend */}
                  {[0.4, 0.6, 0.5, 0.8, 1.0].map((multiplier, idx) => {
                    const height = (barHeight * multiplier);
                    return (
                      <motion.div
                        key={idx}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: index * 0.06 + idx * 0.05, duration: 0.5 }}
                        className={`w-1.5 rounded-t-sm ${
                          idx === 4 ? stat.chartColor : stat.chartBgColor
                        }`}
                        style={{ minHeight: '4px' }}
                      />
                    );
                  })}
                </div>
                
                {/* Trend Indicator */}
                <div className="flex items-center gap-0.5">
                  <TrendingUp className={`w-3 h-3 ${stat.iconBg.replace('bg-', 'text-')}`} strokeWidth={2.5} />
                  <span className={`text-[10px] ${stat.iconBg.replace('bg-', 'text-')}`} style={{ fontWeight: 600 }}>
                    {stat.value > 0 ? '+' : ''}{Math.min(99, Math.floor(stat.value * 1.2))}%
                  </span>
                </div>
              </div>
            </div>

            {/* Active Indicator - Top Right Corner Badge */}
            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md z-20"
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
            )}

            {/* Bottom Progress Bar - Shows relative value */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5 rounded-b-xl overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${barHeight}%` }}
                transition={{ delay: index * 0.06, duration: 0.6 }}
                className={`h-full ${stat.chartColor}`}
              />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ============================================================================
// CRM DASHBOARD COMPONENT
// ============================================================================
interface CRMDashboardProps {
  applications: any[];
  onUpdateApplications: (apps: any[]) => void;
  sessionComplaintCount: number;
  onSessionComplaintIncrement: () => void;
}

export function CRMDashboard({ applications, onUpdateApplications, sessionComplaintCount, onSessionComplaintIncrement }: CRMDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [entriesPerPage, setEntriesPerPage] = useState(8);
  const [activeCard, setActiveCard] = useState('all');
  const [resetToFirstPage, setResetToFirstPage] = useState(0);
  const [showZonewiseTable, setShowZonewiseTable] = useState(false);

  const handleCardClick = (filterType: string) => {
    setActiveCard(filterType);
    
    const statusMap: Record<string, string> = {
      all: 'all',
      new_connection: 'all',
      mutation: 'all',
      alteration: 'all',
      today_complaint: 'all',
      total_complaint: 'all',
      total_discards: 'rejected',
    };
    
    // For specific application types, set the type filter
    if (filterType === 'new_connection') {
      setSelectedType('all');
      setSelectedStatus('all');
      // We'll need to filter by details in the table
    } else if (filterType === 'mutation' || filterType === 'alteration') {
      setSelectedType('all');
      setSelectedStatus('all');
    } else {
      setSelectedStatus(statusMap[filterType] || 'all');
    }
  };

  const handleNewApplication = (newApp: any) => {
    onUpdateApplications([newApp, ...applications]);
    
    // Increment today's complaint count for this session
    onSessionComplaintIncrement();
    
    setActiveCard('all');
    setSelectedStatus('all');
    setSelectedType('all');
    setSearchQuery('');
    setResetToFirstPage(prev => prev + 1);
    
    toast.success(`✅ Application ${newApp.applicationNo} registered successfully and added to top of grid!`, {
      duration: 4000,
    });
  };

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-1.5 px-2 md:px-3 py-1.5">
      <div className="flex-shrink-0">
        <StatsGrid onCardClick={handleCardClick} activeCard={activeCard} applications={applications} sessionComplaintCount={sessionComplaintCount} />
      </div>
      
      <div className="flex-shrink-0">
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
          onNewApplication={handleNewApplication}
          applications={applications}
          showZonewiseTable={showZonewiseTable}
          onToggleZonewiseTable={() => setShowZonewiseTable(!showZonewiseTable)}
        />
      </div>
      
      <div className="flex-1 min-h-0 pb-2">
        {!showZonewiseTable ? (
          <ApplicationsTableSimple
            searchQuery={searchQuery}
            selectedType={selectedType}
            selectedStatus={selectedStatus}
            entriesPerPage={entriesPerPage}
            applications={applications}
            onUpdateApplications={onUpdateApplications}
            resetToFirstPage={resetToFirstPage}
            activeCardFilter={activeCard}
          />
        ) : (
          <ZonewiseTable applications={applications} />
        )}
      </div>
    </div>
  );
}