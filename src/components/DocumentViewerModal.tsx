import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  FileText,
  Download,
  Eye,
  X,
  File,
  Image as ImageIcon,
  FileSpreadsheet,
  Calendar,
  User,
  Hash,
} from 'lucide-react';
import { WaterRipple } from './WaterRipple';

interface DocumentViewerModalProps {
  open: boolean;
  onClose: () => void;
  application: any;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  url?: string;
}

// Mock documents for the application
const getMockDocuments = (applicationNo: string): Document[] => [
  {
    id: '1',
    name: 'Aadhaar Card.pdf',
    type: 'pdf',
    size: '245 KB',
    uploadDate: '10/14/2025',
    url: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=800&h=600',
  },
  {
    id: '2',
    name: 'Property Documents.pdf',
    type: 'pdf',
    size: '1.2 MB',
    uploadDate: '10/14/2025',
    url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600',
  },
  {
    id: '3',
    name: 'Address Proof.jpg',
    type: 'image',
    size: '580 KB',
    uploadDate: '10/14/2025',
    url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600',
  },
  {
    id: '4',
    name: 'Tax Receipt.pdf',
    type: 'pdf',
    size: '340 KB',
    uploadDate: '10/13/2025',
    url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=600',
  },
];

export function DocumentViewerModal({ open, onClose, application }: DocumentViewerModalProps) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  const documents = getMockDocuments(application?.applicationNo || '');

  const handleRipple = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples([...ripples, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-blue-500" />;
      case 'excel':
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-gradient-to-br from-red-500 to-red-600 text-white';
      case 'image':
        return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white';
      case 'excel':
        return 'bg-gradient-to-br from-green-500 to-green-600 text-white';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600 text-white';
    }
  };

  const handleDownload = (doc: Document) => {
    // Mock download
    console.log('Downloading:', doc.name);
  };

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const handleClose = () => {
    setSelectedDocument(null);
    onClose();
  };

  if (!application) return null;

  return (
    <>
      {/* Main Documents List Modal */}
      <Dialog open={open && !selectedDocument} onOpenChange={handleClose}>
        <DialogContent className="!max-w-[95vw] w-[95vw] sm:!max-w-[95vw] md:!max-w-[95vw] lg:!max-w-[95vw] xl:!max-w-[95vw] max-h-[90vh] overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50">
          <DialogHeader className="border-b pb-4 border-blue-200/30 bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400/80 to-purple-500/80 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-2xl text-white">
                  Application Documents
                </DialogTitle>
                <DialogDescription className="text-white/90 text-sm mt-1">
                  View and download documents for Application #{application.applicationNo}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Application Info Bar */}
          <div className="grid grid-cols-4 gap-3 bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-4 rounded-xl border border-blue-200/30 shadow-sm">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-500/80" />
              <div>
                <div className="text-xs text-blue-600/80" style={{ fontWeight: 600 }}>Application No</div>
                <div className="text-sm text-blue-800/90" style={{ fontWeight: 700 }}>{application.applicationNo}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-500/80" />
              <div>
                <div className="text-xs text-purple-600/80" style={{ fontWeight: 600 }}>Applicant Name</div>
                <div className="text-sm text-purple-800/90" style={{ fontWeight: 700 }}>{application.applicantName}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500/80" />
              <div>
                <div className="text-xs text-blue-600/80" style={{ fontWeight: 600 }}>Type</div>
                <div className="text-sm text-blue-800/90" style={{ fontWeight: 700 }}>{application.details}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500/80" />
              <div>
                <div className="text-xs text-purple-600/80" style={{ fontWeight: 600 }}>Total Documents</div>
                <div className="text-sm text-purple-800/90" style={{ fontWeight: 700 }}>{documents.length} Files</div>
              </div>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="overflow-y-auto max-h-[50vh] pr-2">
            <div className="grid grid-cols-2 gap-4">
              {documents.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-blue-200/40 shadow-lg hover:shadow-xl transition-all overflow-hidden group"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl ${getFileTypeColor(doc.type)} flex items-center justify-center flex-shrink-0 shadow-md`}>
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-800 truncate" style={{ fontWeight: 700 }}>
                          {doc.name}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge className="bg-blue-100/60 text-blue-700/90 text-xs" style={{ fontWeight: 600 }}>
                            {doc.type.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">{doc.size}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>Uploaded: {doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Document Preview Thumbnail */}
                    {doc.url && (
                      <div className="mt-3 rounded-lg overflow-hidden border border-gray-200/50 bg-gray-50">
                        <img
                          src={doc.url}
                          alt={doc.name}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          handleRipple(e);
                          handleViewDocument(doc);
                        }}
                        className="flex-1 relative overflow-hidden px-3 py-2 rounded-lg bg-gradient-to-r from-blue-400/80 via-blue-400/70 to-purple-500/80 hover:from-blue-500/90 hover:to-purple-600/90 text-white text-xs transition-all shadow-md"
                        style={{ fontWeight: 600 }}
                      >
                        {ripples.map((ripple) => (
                          <WaterRipple key={ripple.id} x={ripple.x} y={ripple.y} />
                        ))}
                        <Eye className="w-3.5 h-3.5 inline mr-1.5" />
                        View
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          handleRipple(e);
                          handleDownload(doc);
                        }}
                        className="flex-1 relative overflow-hidden px-3 py-2 rounded-lg bg-gradient-to-r from-green-400/80 via-green-400/70 to-emerald-500/80 hover:from-green-500/90 hover:to-emerald-600/90 text-white text-xs transition-all shadow-md"
                        style={{ fontWeight: 600 }}
                      >
                        {ripples.map((ripple) => (
                          <WaterRipple key={ripple.id} x={ripple.x} y={ripple.y} />
                        ))}
                        <Download className="w-3.5 h-3.5 inline mr-1.5" />
                        Download
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer with stats */}
          <div className="border-t pt-4 border-blue-200/30 flex items-center justify-between bg-gradient-to-r from-blue-50/40 to-purple-50/40 px-4 py-3 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span style={{ fontWeight: 600 }}>All documents uploaded and verified</span>
            </div>
            <Button
              onClick={handleClose}
              variant="outline"
              className="border border-blue-300/50 hover:bg-blue-100/50 rounded-lg"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {selectedDocument && (
          <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
            <DialogContent className="!max-w-[90vw] w-[90vw] sm:!max-w-[90vw] md:!max-w-[90vw] lg:!max-w-[90vw] xl:!max-w-[90vw] max-h-[95vh] bg-gradient-to-br from-white via-green-50 to-emerald-50">
              <DialogHeader className="border-b pb-4 border-green-200/30 bg-gradient-to-r from-green-400 via-green-400 to-emerald-500">
                <DialogDescription className="sr-only">
                  Document preview for {selectedDocument.name}
                </DialogDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${getFileTypeColor(selectedDocument.type)} flex items-center justify-center shadow-lg`}>
                      {getFileIcon(selectedDocument.type)}
                    </div>
                    <div>
                      <DialogTitle className="text-xl text-white">
                        {selectedDocument.name}
                      </DialogTitle>
                      <DialogDescription className="text-white/90 text-sm">
                        Preview and download this document
                      </DialogDescription>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedDocument(null)}
                    className="w-10 h-10 rounded-full bg-red-500/80 hover:bg-red-600/90 flex items-center justify-center text-white shadow-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </DialogHeader>

              {/* Document Info */}
              <div className="flex items-center gap-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 p-3 rounded-xl border border-green-200/30">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-600/80" />
                  <span className="text-xs text-green-700/90" style={{ fontWeight: 600 }}>
                    Size: {selectedDocument.size}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600/80" />
                  <span className="text-xs text-emerald-700/90" style={{ fontWeight: 600 }}>
                    Uploaded: {selectedDocument.uploadDate}
                  </span>
                </div>
                <Badge className={`${getFileTypeColor(selectedDocument.type)} text-xs`} style={{ fontWeight: 700 }}>
                  {selectedDocument.type.toUpperCase()}
                </Badge>
              </div>

              {/* Document Preview */}
              <div className="flex-1 overflow-hidden rounded-xl border border-green-200/40 bg-gray-100 shadow-inner">
                {selectedDocument.url && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full flex items-center justify-center p-4"
                  >
                    <img
                      src={selectedDocument.url}
                      alt={selectedDocument.name}
                      className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
                    />
                  </motion.div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="border-t pt-4 border-green-200/30 flex items-center justify-between">
                <div className="text-xs text-gray-600">
                  💡 <span style={{ fontWeight: 600 }}>Tip:</span> Click download to save this file to your device
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setSelectedDocument(null)}
                    variant="outline"
                    className="border border-gray-300/50 rounded-lg"
                  >
                    Back to List
                  </Button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      handleRipple(e);
                      handleDownload(selectedDocument);
                    }}
                    className="relative overflow-hidden px-6 py-2 rounded-lg bg-gradient-to-r from-green-400/80 via-green-400/70 to-emerald-500/80 hover:from-green-500/90 hover:to-emerald-600/90 text-white shadow-lg transition-all"
                    style={{ fontWeight: 600 }}
                  >
                    {ripples.map((ripple) => (
                      <WaterRipple key={ripple.id} x={ripple.x} y={ripple.y} />
                    ))}
                    <Download className="w-4 h-4 inline mr-2" />
                    Download
                  </motion.button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}