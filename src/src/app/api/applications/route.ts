import { NextRequest, NextResponse } from 'next/server';
import { applications as mockApplications } from '@/data/applications';

// In-memory storage for demo (replace with database in production)
let applicationsStore = [...mockApplications];

// GET all applications with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const zone = searchParams.get('zone');
    const search = searchParams.get('search');
    
    let filtered = [...applicationsStore];
    
    // Apply filters
    if (status) {
      filtered = filtered.filter(app => app.status === status);
    }
    
    if (type) {
      filtered = filtered.filter(app => app.applicationType === type);
    }
    
    if (zone) {
      filtered = filtered.filter(app => app.zone === zone);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(app => 
        app.customerName?.toLowerCase().includes(searchLower) ||
        app.mobile?.includes(search) ||
        app.applicationNumber?.toLowerCase().includes(searchLower) ||
        app.connectionNumber?.toLowerCase().includes(searchLower)
      );
    }
    
    return NextResponse.json({
      success: true,
      data: filtered,
      count: filtered.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch applications',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST create new application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields (use the correct field names)
    if (!body.applicantName && !body.customerName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          message: 'Applicant name is required'
        },
        { status: 400 }
      );
    }
    
    if (!body.mobileNumber && !body.mobile) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          message: 'Mobile number is required'
        },
        { status: 400 }
      );
    }
    
    // Generate new application with consistent field names
    const newApplication = {
      ...body,
      id: applicationsStore.length + 1,
      applicationNo: `CRM${Date.now().toString().slice(-8)}`,
      dateTime: new Date().toLocaleString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }),
      date: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      status: body.status || 'Initiated',
      stage: body.stage || 'Registration',
      office: body.office || 'Online',
      days: 0,
      createdAt: new Date().toISOString(),
    };
    
    // Add to store
    applicationsStore.unshift(newApplication);
    
    return NextResponse.json({
      success: true,
      data: newApplication,
      message: 'Application created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create application',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT update multiple applications (bulk update)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids, updates } = body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request',
          message: 'IDs array is required'
        },
        { status: 400 }
      );
    }
    
    // Update applications
    applicationsStore = applicationsStore.map(app => {
      if (ids.includes(app.id)) {
        return { ...app, ...updates, updatedAt: new Date().toISOString() };
      }
      return app;
    });
    
    return NextResponse.json({
      success: true,
      message: `${ids.length} application(s) updated successfully`,
      count: ids.length,
    });
  } catch (error) {
    console.error('Error updating applications:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update applications',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE multiple applications (bulk delete)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get('ids');
    
    if (!idsParam) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request',
          message: 'IDs parameter is required'
        },
        { status: 400 }
      );
    }
    
    const ids = idsParam.split(',');
    const beforeCount = applicationsStore.length;
    
    applicationsStore = applicationsStore.filter(app => !ids.includes(app.id));
    const deletedCount = beforeCount - applicationsStore.length;
    
    return NextResponse.json({
      success: true,
      message: `${deletedCount} application(s) deleted successfully`,
      count: deletedCount,
    });
  } catch (error) {
    console.error('Error deleting applications:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete applications',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}