'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CRMDashboard } from '@/components/modules/CRMDashboard';
import { ApproveOnlineTransaction } from '@/components/modules/ApproveOnlineTransaction';
import { 
  createApplication, 
  updateApplication, 
  deleteApplication 
} from '@/lib/actions/applications';
import { toast } from 'sonner@2.0.3';
import { useRouter } from 'next/navigation';

interface DashboardClientProps {
  initialApplications: any[];
}

export function DashboardClient({ initialApplications }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('crm');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [sessionComplaintCount, setSessionComplaintCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Use server data as initial state
  const [applications, setApplications] = useState(initialApplications);

  // Log page load once (only in browser console for debugging)
  useEffect(() => {
    console.log('\n' + '█'.repeat(80));
    console.log('🖥️ [CLIENT] Dashboard Rendered in Browser');
    console.log(`📊 [CLIENT] Displaying ${initialApplications.length} applications`);
    console.log('█'.repeat(80) + '\n');
  }, []);

  // Handle create application via Server Action
  const handleCreateApplication = async (appData: any) => {
    console.log('\n' + '='.repeat(80));
    console.log('🖥️ [CLIENT] Calling Server Action: CREATE APPLICATION');
    console.log('='.repeat(80));
    console.log('📤 [CLIENT] Sending data to server:', appData);
    
    setIsLoading(true);
    
    try {
      const result = await createApplication(appData);
      
      if (result.success && result.data) {
        console.log('✅ [CLIENT] Server Action Successful');
        console.log('📥 [CLIENT] Received:', result.data);
        console.log('='.repeat(80) + '\n');
        
        // Update local state immediately for better UX
        setApplications([result.data, ...applications]);
        setSessionComplaintCount(prev => prev + 1);
        
        toast.success(`Application ${result.data.applicationNo} created successfully!`);
        
        // Refresh server data
        router.refresh();
        
        return result.data;
      } else {
        console.log('❌ [CLIENT] Server Action Failed:', result.error);
        console.log('='.repeat(80) + '\n');
        
        toast.error(result.error || 'Failed to create application');
        return null;
      }
    } catch (error) {
      console.error('❌ [CLIENT] Error calling server action:', error);
      toast.error('Error creating application');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle update application via Server Action
  const handleUpdateApplication = async (updatedApp: any) => {
    console.log('\n' + '='.repeat(80));
    console.log('🖥️ [CLIENT] Calling Server Action: UPDATE APPLICATION');
    console.log('='.repeat(80));
    console.log('📤 [CLIENT] Application ID:', updatedApp.id);
    console.log('📤 [CLIENT] Updates:', updatedApp);
    
    setIsLoading(true);
    
    try {
      const result = await updateApplication(updatedApp.id, updatedApp);
      
      if (result.success && result.data) {
        console.log('✅ [CLIENT] Server Action Successful');
        console.log('📥 [CLIENT] Updated application:', result.data);
        console.log('='.repeat(80) + '\n');
        
        // Update local state immediately
        setApplications(applications.map(app => 
          app.id === result.data.id ? result.data : app
        ));
        
        toast.success(`Application ${result.data.applicationNo} updated successfully!`);
        
        // Refresh server data
        router.refresh();
        
        return result.data;
      } else {
        console.log('❌ [CLIENT] Server Action Failed:', result.error);
        console.log('='.repeat(80) + '\n');
        
        toast.error(result.error || 'Failed to update application');
        return null;
      }
    } catch (error) {
      console.error('❌ [CLIENT] Error calling server action:', error);
      toast.error('Error updating application');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete application via Server Action
  const handleDeleteApplication = async (id: string | number) => {
    console.log('\n' + '='.repeat(80));
    console.log('🖥️ [CLIENT] Calling Server Action: DELETE APPLICATION');
    console.log('='.repeat(80));
    console.log('📤 [CLIENT] Application ID:', id);
    
    setIsLoading(true);
    
    try {
      const result = await deleteApplication(id);
      
      if (result.success) {
        console.log('✅ [CLIENT] Server Action Successful');
        console.log('📥 [CLIENT] Deleted application ID:', id);
        console.log('='.repeat(80) + '\n');
        
        // Update local state immediately
        setApplications(applications.filter(app => app.id !== id));
        
        toast.success('Application deleted successfully!');
        
        // Refresh server data
        router.refresh();
        
        return true;
      } else {
        console.log('❌ [CLIENT] Server Action Failed:', result.error);
        console.log('='.repeat(80) + '\n');
        
        toast.error(result.error || 'Failed to delete application');
        return false;
      }
    } catch (error) {
      console.error('❌ [CLIENT] Error calling server action:', error);
      toast.error('Error deleting application');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh data from server
  const handleRefresh = () => {
    console.log('🔄 [CLIENT] Refreshing data from server...');
    router.refresh();
  };

  return (
    <>
      {/* Header - Client component with interactivity */}
      <Header 
        onNewApplication={handleCreateApplication}
        applications={applications}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            aria-hidden="true"
          />
        )}
        
        {/* Main Content */}
        <main 
          id="main-content" 
          className="flex-1 overflow-auto p-3 md:p-6"
          role="main"
        >
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'crm' && (
              <CRMDashboard 
                applications={applications}
                onUpdateApplication={handleUpdateApplication}
                onDeleteApplication={handleDeleteApplication}
                onNewApplication={handleCreateApplication}
                isLoading={isLoading}
                onRefresh={handleRefresh}
              />
            )}
            {activeTab === 'approve-online-transaction' && (
              <ApproveOnlineTransaction />
            )}
          </motion.div>
        </main>
      </div>
    </>
  );
}