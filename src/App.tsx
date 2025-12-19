import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { CRMDashboard } from "./components/Dashboard";
import { ApproveOnlineTransaction } from "./components/ApproveOnlineTransaction";
import { Toaster } from "./components/ui/sonner";
import { applications as initialApplications } from "./data/applications";

const STORAGE_KEY = "akola_crm_applications";

export default function App() {
  const [activeTab, setActiveTab] = useState("crm");
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Track today's complaint count for current session (resets on page refresh/logout)
  const [sessionComplaintCount, setSessionComplaintCount] =
    useState(0);

  // Load applications from localStorage or use initial data
  const [applications, setApplications] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        // Merge stored data with initial data, prioritizing stored data
        const storedIds = new Set(
          parsedData.map((app: any) => app.id),
        );
        const mergedData = [
          ...parsedData,
          ...initialApplications.filter(
            (app) => !storedIds.has(app.id),
          ),
        ];
        return mergedData;
      }
    } catch (error) {
      console.error(
        "Error loading applications from localStorage:",
        error,
      );
    }
    return initialApplications;
  });

  // Save applications to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(applications),
      );
    } catch (error) {
      console.error(
        "Error saving applications to localStorage:",
        error,
      );
    }
  }, [applications]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50/50 overflow-hidden relative">
      {/* Skip to main content link for keyboard navigation */}

      {/* Animated Background Patterns */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* Radial gradients - softer and more subtle like AquaFlow */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.15, 0.25, 0.15],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute top-0 left-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-br from-sky-200/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }
          }
          className="absolute bottom-0 right-0 w-[400px] md:w-[900px] h-[400px] md:h-[900px] bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.15, 1],
                  opacity: [0.12, 0.22, 0.12],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4,
                }
          }
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-gradient-to-br from-cyan-200/15 to-transparent rounded-full blur-3xl"
        />

        {/* Grid pattern overlay - lighter */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Header
        onNewApplication={() => {}}
        applications={applications}
        onMenuToggle={() =>
          setIsMobileMenuOpen(!isMobileMenuOpen)
        }
      />

      <div className="flex flex-1 min-h-0 relative z-10">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0 }
            }
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            role="button"
            aria-label="Close mobile menu"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter") {
                setIsMobileMenuOpen(false);
              }
            }}
          />
        )}

        {/* Sidebar - Hidden on mobile by default, shown when menu is open */}
        <div
          className={`${isMobileMenuOpen ? "fixed inset-y-0 left-0 z-50" : "hidden"} lg:block lg:relative`}
        >
          <Sidebar
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setIsMobileMenuOpen(false);
            }}
          />
        </div>

        {/* Main Content Area */}
        <main
          id="main-content"
          className="flex-1 overflow-hidden w-full"
          role="main"
          aria-label="Main content"
        >
          {activeTab === "crm" && (
            <CRMDashboard
              applications={applications}
              onUpdateApplications={setApplications}
              sessionComplaintCount={sessionComplaintCount}
              onSessionComplaintIncrement={() =>
                setSessionComplaintCount((prev) => prev + 1)
              }
            />
          )}

          {activeTab === "approve-transaction" && (
            <ApproveOnlineTransaction />
          )}
        </main>
      </div>

      <Toaster />
    </div>
  );
}