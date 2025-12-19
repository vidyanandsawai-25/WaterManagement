import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { WaterRipple } from './WaterRipple';
import { CheckCircle, Download } from 'lucide-react';
import { DialogTitle, DialogDescription } from './ui/dialog';
import { VisuallyHidden } from './ui/visually-hidden';
import { jsPDF } from 'jspdf';

interface ApplicationSubmitSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  applicationNo: string;
}

export function ApplicationSubmitSuccessDialog({ 
  isOpen, 
  onClose, 
  applicationNo 
}: ApplicationSubmitSuccessDialogProps) {
  
  const handleDownloadNotesheet = () => {
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set document properties
    doc.setProperties({
      title: `Notesheet - ${applicationNo}`,
      subject: 'Water Connection Application Notesheet',
      author: 'Akola Municipal Corporation',
      keywords: 'notesheet, water connection, application',
      creator: 'Akola Municipal Corporation CRM'
    });

    // Add header with logo and title
    doc.setFillColor(10, 77, 158); // Deep blue color (#0A4D9E)
    doc.rect(0, 0, 210, 35, 'F');
    
    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Akola Municipal Corporation', 105, 15, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Water Supply Department', 105, 23, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Office Note Sheet', 105, 30, { align: 'center' });

    // Reset text color for body
    doc.setTextColor(0, 0, 0);
    
    // Date and Application Number
    let yPos = 50;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Date:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }), 40, yPos);
    
    yPos += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('Application No:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(10, 77, 158);
    doc.text(applicationNo, 55, yPos);
    doc.setTextColor(0, 0, 0);

    // Subject
    yPos += 12;
    doc.setFont('helvetica', 'bold');
    doc.text('Subject:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('Regarding Water Connection Application', 45, yPos);

    // Salutation
    yPos += 12;
    doc.setFont('helvetica', 'normal');
    doc.text('Sir/Madam,', 20, yPos);

    // Body paragraphs
    yPos += 10;
    const bodyText1 = 'The applicant has submitted an application for a new water connection. Their house is located at the mentioned address and the property details have been verified. The applicant has requested a water connection for domestic use.';
    const splitText1 = doc.splitTextToSize(bodyText1, 170);
    doc.text(splitText1, 20, yPos);
    yPos += splitText1.length * 6;

    yPos += 8;
    doc.text('As per the guidelines and after verification of the submitted documents:', 20, yPos);

    // Numbered list
    yPos += 8;
    const points = [
      'The applicant has submitted all required documents properly.',
      'The property details have been verified and found correct.',
      'The site inspection has been completed successfully.',
      'Therefore, it is recommended to approve this connection request.'
    ];

    points.forEach((point, index) => {
      const pointText = `${index + 1}) ${point}`;
      const splitPoint = doc.splitTextToSize(pointText, 165);
      doc.text(splitPoint, 25, yPos);
      yPos += splitPoint.length * 6 + 2;
    });

    // Recommendation
    yPos += 6;
    const recommendation = 'Requesting Ma. Junior Engineer to review and provide necessary guidance.';
    doc.text(recommendation, 20, yPos);

    // Signatures section
    yPos += 20;
    
    // Junior Engineer signature
    doc.setFont('helvetica', 'normal');
    doc.text('Signed by', 20, yPos);
    yPos += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('Junior Engineer,', 20, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.text('Akola Municipal Corporation', 20, yPos);

    // Water Supply Engineer signature
    yPos += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('Water Supply Engineer', 20, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.text('Akola Municipal Corporation', 20, yPos);

    // Additional Commissioner signature
    yPos += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('Additional Commissioner', 20, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.text('Akola Municipal Corporation', 20, yPos);

    // Footer
    doc.setFillColor(10, 77, 158);
    doc.rect(0, 282, 210, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text('This is a computer-generated document and does not require a physical signature.', 105, 290, { align: 'center' });

    // Save the PDF
    doc.save(`Notesheet_${applicationNo}.pdf`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[450px] p-0 overflow-hidden bg-white border-3 border-blue-400 shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>Application Submitted Successfully</DialogTitle>
          <DialogDescription>
            Your application {applicationNo} has been submitted successfully and is ready for notesheet upload.
          </DialogDescription>
        </VisuallyHidden>
        
        {/* Success Header with Animation */}
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-6 py-5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-30"></div>
          
          <div className="relative flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-3 border-white/40 shadow-lg">
              <CheckCircle className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-white text-xl mb-1" style={{ fontWeight: 900 }}>
                Success!
              </h2>
              <p className="text-blue-50 text-xs">
                Your application has been submitted successfully
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Application Number Display */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border-2 border-blue-300 text-center">
            <div className="text-blue-700 text-xs mb-1" style={{ fontWeight: 700 }}>
              Application Number
            </div>
            <div className="text-blue-900 text-xl" style={{ fontWeight: 900 }}>
              {applicationNo}
            </div>
          </div>

          {/* Message */}
          <p className="text-slate-700 text-center text-xs leading-relaxed">
            Your application is now ready for notesheet upload. You can download the notesheet below.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <WaterRipple color="rgba(100, 116, 139, 0.3)">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 h-9 rounded-lg cursor-pointer text-xs"
              >
                Okay
              </Button>
            </WaterRipple>

            <WaterRipple color="rgba(59, 130, 246, 0.3)">
              <Button
                onClick={handleDownloadNotesheet}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-9 rounded-lg shadow-md cursor-pointer text-xs"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download Notesheet
              </Button>
            </WaterRipple>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}