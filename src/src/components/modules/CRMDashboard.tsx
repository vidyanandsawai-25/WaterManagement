'use client';

import { useState } from 'react';
import { StatsGrid } from './StatsGrid';
import { FilterBar } from './FilterBar';
import { ApplicationsTable } from './ApplicationsTable';
import { ZonewiseTable } from './ZonewiseTable';
import { toast } from 'sonner@2.0.3';

interface CRMDashboardProps {
  applications: any[];
  onUpdateApplication?: (updatedApp: any) => Promise<any>;
  onDeleteApplication?: (id: string | number) => Promise<boolean>;
  onNewApplication?: (newApp: any) => Promise<any>;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function CRMDashboard({ 
  applications, 
  onUpdateApplication,
  onDeleteApplication,
  onNewApplication,
  isLoading = false,
  onRefresh
}: CRMDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [entriesPerPage, setEntriesPerPage] = useState(8);
  const [activeCard, setActiveCard] = useState('all');
  const [resetToFirstPage, setResetToFirstPage] = useState(0);
  const [showZonewiseTable, setShowZonewiseTable] = useState(false);

  // Calculate today's complaint count from applications
  const sessionComplaintCount = applications.filter(app => {
    const appDate = new Date(app.date);
    const today = new Date();
    return appDate.toDateString() === today.toDateString();
  }).length;

  const handleCardClick = (filterType: string) => {
    setActiveCard(filterType);
    
    const statusMap: Record<string, string> = {
      all: 'all',
      new_connection: 'all',
      mutation: 'all',
      alteration: 'all',
      today_complaint: 'all',
      total_complaint: 'all',
    };
    
    // For specific application types, set the type filter
    if (filterType === 'new_connection') {
      setSelectedType('all');
      setSelectedStatus('all');
    } else if (filterType === 'mutation' || filterType === 'alteration') {
      setSelectedType('all');
      setSelectedStatus('all');
    } else {
      setSelectedStatus(statusMap[filterType] || 'all');
    }
  };

  const handleNewApplication = async (newApp: any) => {
    if (onNewApplication) {
      const result = await onNewApplication(newApp);
      if (result) {
        setActiveCard('all');
        setSelectedStatus('all');
        setSelectedType('all');
        setSearchQuery('');
        setResetToFirstPage(prev => prev + 1);
      }
    }
  };

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-2 px-2 md:px-4 py-2">
      <div className="flex-shrink-0">
        <StatsGrid 
          onCardClick={handleCardClick} 
          activeCard={activeCard} 
          applications={applications} 
          sessionComplaintCount={sessionComplaintCount} 
        />
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
          isLoading={isLoading}
        />
      </div>
      
      <div className="flex-1 min-h-0 pb-4">
        {!showZonewiseTable ? (
          <ApplicationsTable
            searchQuery={searchQuery}
            selectedType={selectedType}
            selectedStatus={selectedStatus}
            entriesPerPage={entriesPerPage}
            applications={applications}
            onUpdateApplication={onUpdateApplication}
            onDeleteApplication={onDeleteApplication}
            resetToFirstPage={resetToFirstPage}
            activeCardFilter={activeCard}
            isLoading={isLoading}
          />
        ) : (
          <div className="h-full overflow-y-auto">
            <ZonewiseTable />
          </div>
        )}
      </div>
    </div>
  );
}
