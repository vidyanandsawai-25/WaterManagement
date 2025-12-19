import { NextRequest, NextResponse } from 'next/server';
import { applications as mockApplications } from '@/data/applications';

// In-memory storage (same reference as main route)
let applicationsStore = [...mockApplications];

// GET single application by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const application = applicationsStore.find(app => app.id === params.id);
    
    if (!application) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not found',
          message: `Application with ID ${params.id} not found`
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch application',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT update single application
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const index = applicationsStore.findIndex(app => app.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not found',
          message: `Application with ID ${params.id} not found`
        },
        { status: 404 }
      );
    }
    
    // Update application
    const updatedApplication = {
      ...applicationsStore[index],
      ...body,
      id: params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };
    
    applicationsStore[index] = updatedApplication;
    
    return NextResponse.json({
      success: true,
      data: updatedApplication,
      message: 'Application updated successfully',
    });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update application',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PATCH partial update
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const index = applicationsStore.findIndex(app => app.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not found',
          message: `Application with ID ${params.id} not found`
        },
        { status: 404 }
      );
    }
    
    // Partial update
    applicationsStore[index] = {
      ...applicationsStore[index],
      ...body,
      id: params.id,
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({
      success: true,
      data: applicationsStore[index],
      message: 'Application updated successfully',
    });
  } catch (error) {
    console.error('Error patching application:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update application',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE single application
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const index = applicationsStore.findIndex(app => app.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not found',
          message: `Application with ID ${params.id} not found`
        },
        { status: 404 }
      );
    }
    
    const deletedApplication = applicationsStore[index];
    applicationsStore.splice(index, 1);
    
    return NextResponse.json({
      success: true,
      data: deletedApplication,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete application',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}