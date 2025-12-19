import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import {
  FileText,
  FileSpreadsheet,
  Download,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Progress } from "./ui/progress";

interface DownloadRegisterModalProps {
  open: boolean;
  onClose: () => void;
  applications?: any[];
  searchQuery?: string;
  selectedType?: string;
  selectedStatus?: string;
}

export function DownloadRegisterModal({
  open,
  onClose,
  applications = [],
  searchQuery = "",
  selectedType = "all",
  selectedStatus = "all",
}: DownloadRegisterModalProps) {
  const [fileFormat, setFileFormat] = useState("excel");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] =
    useState(false);

  // Filter applications based on current filters
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        searchQuery === "" ||
        app.applicationNo
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        app.consumerNo
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        app.applicantName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === "all" ||
        app.details.toLowerCase().includes(selectedType);

      const matchesStatus =
        selectedStatus === "all" ||
        app.status
          .toLowerCase()
          .includes(selectedStatus.replace("_", " "));

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [applications, searchQuery, selectedType, selectedStatus]);

  // Generate CSV content
  const generateCSV = () => {
    const headers = [
      "Application No",
      "Date",
      "Consumer No",
      "Applicant Name",
      "Type",
      "Status",
      "Stage",
      "Office",
      "Days",
    ];
    const rows = filteredApplications.map((app) => [
      app.applicationNo,
      app.date,
      app.consumerNo,
      app.applicantName,
      app.details,
      app.status,
      app.stage,
      app.office,
      app.days,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  // Generate Excel (as HTML table that Excel can open)
  const generateExcel = () => {
    const headers = [
      "Application No",
      "Date",
      "Consumer No",
      "Applicant Name",
      "Type",
      "Status",
      "Stage",
      "Office",
      "Days",
    ];
    const rows = filteredApplications
      .map(
        (app) => `
      <tr>
        <td>${app.applicationNo}</td>
        <td>${app.date}</td>
        <td>${app.consumerNo}</td>
        <td>${app.applicantName}</td>
        <td>${app.details}</td>
        <td>${app.status}</td>
        <td>${app.stage}</td>
        <td>${app.office}</td>
        <td>${app.days}</td>
      </tr>
    `,
      )
      .join("");

    return `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
          <meta charset="utf-8"/>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #0A4D9E; color: white; font-weight: bold; }
            tr:nth-child(even) { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Akola Municipal Corporation - Application Register</h2>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <p>Total Records: ${filteredApplications.length}</p>
          <table>
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

  // Generate PDF (as formatted HTML)
  const generatePDF = () => {
    const headers = [
      "Application No",
      "Date",
      "Consumer No",
      "Applicant Name",
      "Type",
      "Status",
      "Stage",
      "Office",
      "Days",
    ];
    const rows = filteredApplications
      .map(
        (app) => `
      <tr>
        <td>${app.applicationNo}</td>
        <td>${app.date}</td>
        <td>${app.consumerNo}</td>
        <td>${app.applicantName}</td>
        <td>${app.details}</td>
        <td>${app.status}</td>
        <td>${app.stage}</td>
        <td>${app.office}</td>
        <td>${app.days}</td>
      </tr>
    `,
      )
      .join("");

    return `
      <html>
        <head>
          <meta charset="utf-8"/>
          <style>
            @page { margin: 20mm; }
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #0A4D9E; text-align: center; }
            .info { text-align: center; margin-bottom: 20px; color: #666; }
            table { border-collapse: collapse; width: 100%; font-size: 10px; }
            th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
            th { background-color: #0A4D9E; color: white; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Akola Municipal Corporation</h1>
          <h2 style="text-align: center;">Application Register</h2>
          <div class="info">
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Total Records: ${filteredApplications.length}</p>
          </div>
          <table>
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadComplete(false);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setDownloadComplete(true);

          // Generate and download the actual file
          const fileName = `application_register_${new Date().toISOString().split("T")[0]}.${fileFormat === "excel" ? "xls" : fileFormat === "pdf" ? "html" : "csv"}`;
          let content = "";
          let mimeType = "";

          if (fileFormat === "csv") {
            content = generateCSV();
            mimeType = "text/csv;charset=utf-8;";
          } else if (fileFormat === "excel") {
            content = generateExcel();
            mimeType = "application/vnd.ms-excel";
          } else if (fileFormat === "pdf") {
            content = generatePDF();
            mimeType = "text/html";
          }

          // Create and trigger download
          const blob = new Blob([content], { type: mimeType });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          toast.success(
            `✅ Downloaded ${filteredApplications.length} records: ${fileName}`,
          );

          // Auto close after 2 seconds
          setTimeout(() => {
            handleClose();
          }, 2000);

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleClose = () => {
    if (!isDownloading) {
      setFileFormat("excel");
      setDownloadProgress(0);
      setDownloadComplete(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] sm:w-full max-w-xl bg-gradient-to-br from-white to-blue-50">
        <DialogHeader className="border-b sm:pb-4 bg-gradient-to-r from-blue-500 to-blue-400 pt-[0px] pr-[3px] pb-[8px] pl-[3px] rounded-[70px] rounded-[22px]">
          <div className="flex items-center gap-2 sm:gap-3 pt-[2px] pr-[5px] pb-[0px] pl-[5px]">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-400/70 to-cyan-500/70 sm:rounded-2xl flex items-center justify-center shadow-sm animate-pulse flex-shrink-0 pt-[5px] pr-[0px] pb-[0px] pl-[0px] rounded-[59px]">
              <Download className="w-7 h-7 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl text-white">
                Download Register
              </DialogTitle>
              <DialogDescription className="text-white/90 text-sm">
                Export application data in various formats
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!downloadComplete ? (
            <>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400/70 to-purple-500/70 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm">
                      📄
                    </span>
                  </div>
                  <h3
                    className="text-sm text-purple-700"
                    style={{ fontWeight: 700 }}
                  >
                    Select File Format
                  </h3>
                </div>
                <RadioGroup
                  value={fileFormat}
                  onValueChange={setFileFormat}
                  disabled={isDownloading}
                >
                  {[
                    {
                      value: "excel",
                      icon: FileSpreadsheet,
                      iconColor: "text-green-600",
                      label: "Excel (.xlsx)",
                      desc: "Best for data analysis and editing",
                      gradient:
                        "from-green-400/70 to-green-500/70",
                      bg: "from-green-50/60 to-green-100/60",
                      border: "border-green-300/50",
                    },
                    {
                      value: "pdf",
                      icon: FileText,
                      iconColor: "text-red-600",
                      label: "PDF (.pdf)",
                      desc: "Best for printing and sharing",
                      gradient: "from-red-400/70 to-red-500/70",
                      bg: "from-red-50/60 to-red-100/60",
                      border: "border-red-300/50",
                    },
                    {
                      value: "csv",
                      icon: FileText,
                      iconColor: "text-blue-600",
                      label: "CSV (.csv)",
                      desc: "Best for database import",
                      gradient:
                        "from-blue-400/70 to-blue-500/70",
                      bg: "from-blue-50/60 to-blue-100/60",
                      border: "border-blue-300/50",
                    },
                  ].map((format) => {
                    const Icon = format.icon;
                    const isSelected =
                      fileFormat === format.value;
                    return (
                      <div
                        key={format.value}
                        className={`flex items-center space-x-4 p-4 border rounded-xl transition-all cursor-pointer mb-3 ${
                          isSelected
                            ? `bg-gradient-to-r ${format.bg} ${format.border} shadow-md scale-105`
                            : "border-gray-200 hover:border-purple-200 hover:bg-gray-50"
                        }`}
                      >
                        <RadioGroupItem
                          value={format.value}
                          id={format.value}
                          className={
                            isSelected
                              ? "border-purple-600"
                              : ""
                          }
                        />
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${format.gradient} flex items-center justify-center shadow-md ${isSelected ? "scale-110" : ""} transition-transform`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <Label
                          htmlFor={format.value}
                          className="cursor-pointer flex-1"
                        >
                          <div
                            className="text-sm"
                            style={{ fontWeight: 700 }}
                          >
                            {format.label}
                          </div>
                          <div className="text-xs text-gray-500">
                            {format.desc}
                          </div>
                        </Label>
                        {isSelected && (
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

              {isDownloading && (
                <div className="space-y-4 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200 shadow-inner">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center animate-spin">
                        <Loader2 className="w-5 h-5 text-white" />
                      </div>
                      <span
                        className="text-sm text-blue-700"
                        style={{ fontWeight: 600 }}
                      >
                        Preparing your download...
                      </span>
                    </div>
                    <span
                      className="text-xl text-blue-600"
                      style={{ fontWeight: 700 }}
                    >
                      {downloadProgress}%
                    </span>
                  </div>
                  <div className="relative h-3 bg-blue-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-300 shadow-md"
                      style={{ width: `${downloadProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm">
                      ℹ️
                    </span>
                  </div>
                  <h4
                    className="text-sm text-blue-900"
                    style={{ fontWeight: 700 }}
                  >
                    Download Information
                  </h4>
                </div>
                <ul className="text-xs text-blue-800 space-y-2 ml-9">
                  {[
                    "Current filters will be applied to the export",
                    "All visible columns will be included",
                    "File will be saved to your default downloads folder",
                  ].map((info, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      {info}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center animate-bounce">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">
                      ✨
                    </span>
                  </div>
                </div>
              </div>
              <h3
                className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3"
                style={{ fontWeight: 700 }}
              >
                Download Complete!
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Your file has been downloaded successfully
              </p>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-4 inline-block">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-8 h-8 text-green-600" />
                  <div className="text-left">
                    <div className="text-xs text-gray-600">
                      File Name
                    </div>
                    <div
                      className="text-sm text-gray-900"
                      style={{ fontWeight: 600 }}
                    >
                      application_register_
                      {new Date().toISOString().split("T")[0]}.
                      {fileFormat === "excel"
                        ? "xlsx"
                        : fileFormat === "pdf"
                          ? "pdf"
                          : "csv"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t-2 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isDownloading}
            className="border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg"
          >
            {downloadComplete ? "Close" : "Cancel"}
          </Button>
          {!downloadComplete && (
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-md hover:shadow-lg transition-all rounded-lg px-6"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download {fileFormat.toUpperCase()}
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}