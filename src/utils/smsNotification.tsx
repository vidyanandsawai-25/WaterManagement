import { toast } from 'sonner@2.0.3';

interface SMSNotificationParams {
  mobileNumber: string;
  applicationNo: string;
  message: string;
  stage: string;
}

export const sendSMSNotification = ({
  mobileNumber,
  applicationNo,
  message,
  stage
}: SMSNotificationParams) => {
  // Simulate SMS sending delay
  setTimeout(() => {
    // Show SMS sent confirmation with message preview
    toast.success(
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">📱</span>
          <span className="font-bold">SMS Sent Successfully!</span>
        </div>
        <div className="text-xs space-y-1 pl-7">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-gray-600">To:</span>
            <span className="font-bold text-green-700">{mobileNumber}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-gray-600">Stage:</span>
            <span className="font-semibold text-blue-700">{stage}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-gray-600">Message:</span>
            <span className="text-gray-700 italic">"{message}"</span>
          </div>
        </div>
      </div>,
      {
        duration: 6000,
        className: 'border-2 border-green-300 shadow-2xl',
      }
    );
  }, 800); // Simulate network delay
};

// SMS Templates for different stages
export const SMS_TEMPLATES = {
  REGISTRATION: (appNo: string) => 
    `Dear Customer, Your application ${appNo} has been registered successfully with Akola Municipal Corporation. Status: Initiated. Track your application online.`,
  
  REJECTED: (appNo: string) => 
    `Dear Customer, Your application ${appNo} has been rejected. Please contact Akola Municipal Corporation office for more details.`,
  
  SUBMITTED: (appNo: string) => 
    `Dear Customer, Your application ${appNo} has been submitted for document upload. Status: Upload Note Sheet. Please upload required documents.`,
  
  SENT_TO_APPROVAL: (appNo: string) => 
    `Dear Customer, Your application ${appNo} has been sent for approval. Status: Send to Approval. You will be notified once reviewed.`,
  
  APPROVED: (appNo: string) => 
    `Dear Customer, Your application ${appNo} has been approved! Status: Make Payment. Please proceed with payment to complete the process.`,
  
  PAYMENT_COMPLETED: (appNo: string, cnbNo: string) => 
    `Dear Customer, Payment for application ${appNo} completed successfully. CNB No: ${cnbNo}. Thank you for using Akola Municipal Corporation services.`,
  
  CNB_GENERATED: (appNo: string, cnbNo: string) => 
    `Dear Customer, CNB Number ${cnbNo} generated for application ${appNo}. Your application is now complete. Download receipt from portal.`,
};
