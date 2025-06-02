import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveDashboard from "./components/layout/ResponsiveDashboard";
import HomePage from "./pages/Home";
import PhysicalHealth from "./pages/PhysicalHealth";
import MentalHealth from "./pages/MentalHealth";
import SleepPage from "./pages/SleepPage";
import InflammatoryPage from "./pages/InflammatoryPage";
import MedicalPage from "./pages/MedicalPage";
import NotFound from "./pages/NotFound";
import { PatientProvider } from '@/contexts/PatientContext';
import { UploadProvider } from '@/contexts/UploadContext';
import { HealthDataProvider } from '@/contexts/HealthDataContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Nutrition from './pages/Nutrition';
import { PDFProvider } from './context/PDFContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <AuthProvider>
            <NotificationProvider>
              <HealthDataProvider>
                <PatientProvider>
                  <UploadProvider>
                    <PDFProvider>
                      <div className="min-h-screen bg-background">
                        <Routes>
                          <Route path="/" element={<ResponsiveDashboard />}>
                            <Route index element={<HomePage />} />
                            <Route path="physical-health" element={<PhysicalHealth />} />
                            <Route path="mental-health" element={<MentalHealth />} />
                            <Route path="nutrition" element={<Nutrition />} />
                            <Route path="sleep" element={<SleepPage />} />
                            <Route path="inflammatory" element={<InflammatoryPage />} />
                            <Route path="medical" element={<MedicalPage />} />
                            <Route path="*" element={<NotFound />} />
                          </Route>
                        </Routes>
                        <Toaster />
                        <Sonner />
                      </div>
                    </PDFProvider>
                  </UploadProvider>
                </PatientProvider>
              </HealthDataProvider>
            </NotificationProvider>
          </AuthProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
