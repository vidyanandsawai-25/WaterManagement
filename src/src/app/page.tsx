import { Suspense } from 'react';
import { DashboardClient } from '@/components/client/DashboardClient';
import { BackgroundPatterns } from '@/components/common/BackgroundPatterns';
import { getApplications } from '@/lib/actions/applications';

// This is a Server Component (no 'use client' directive)
// It runs on the server and sends HTML to the client

// Server-side data fetching function
async function getInitialApplications() {
  // This runs on the SERVER, not the browser
  console.log('\n' + '█'.repeat(80));
  console.log('🏛️ [SERVER] LOADING PANVEL MUNICIPAL CORPORATION DASHBOARD');
  console.log('█'.repeat(80));
  
  try {
    const result = await getApplications();
    
    console.log('✅ [SERVER] Applications Loaded:', result.count);
    console.log('📊 [SERVER] Data fetched at:', result.timestamp);
    console.log('█'.repeat(80) + '\n');
    
    return result.data || [];
  } catch (error) {
    console.error('❌ [SERVER] Error fetching applications:', error);
    return [];
  }
}

// Loading component for Suspense boundary
function DashboardSkeleton() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    </div>
  );
}

// Main Server Component
export default async function HomePage() {
  // Server-side data fetching
  // This happens on the server before sending HTML to client
  const applications = await getInitialApplications();
  
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/30 overflow-hidden relative">
      {/* Skip to main content link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="skip-to-content"
      >
        Skip to main content
      </a>
      
      {/* Animated Background Patterns - Server Component */}
      <BackgroundPatterns />
      
      {/* Client Component - Renders on client with interactivity */}
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardClient initialApplications={applications} />
      </Suspense>
    </div>
  );
}

// Configure page metadata (SSR)
export const metadata = {
  title: 'Dashboard - Panvel Municipal Corporation',
  description: 'Water Tax Management Portal Dashboard',
};

// Force dynamic rendering (always SSR, never static)
export const dynamic = 'force-dynamic';

// Disable static optimization
export const revalidate = 0;