import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PhysicalHealth from "./pages/PhysicalHealth";
import MentalHealth from "./pages/MentalHealth";
import Nutrition from './pages/Nutrition';
import SleepPage from "./pages/SleepPage";
import InflammatoryPage from "./pages/InflammatoryPage";
import MedicalPage from "./pages/MedicalPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { PatientProvider } from '@/contexts/PatientContext';
import { UploadProvider } from '@/contexts/UploadContext';
import { HealthDataProvider } from '@/contexts/HealthDataContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { AuthProvider } from '@/contexts/AuthContext';
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
                          <Route path="/" element={<AdminDashboardPage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/dashboard" element={
                            <>
                              <PatientDashboardPage />
                            </>
                          } />
                          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
                          <Route path="/physical-health" element={<PhysicalHealth />} />
                          <Route path="/mental-health" element={<MentalHealth />} />
                          <Route path="/nutrition" element={<Nutrition />} />
                          <Route path="/sleep" element={<SleepPage />} />
                          <Route path="/inflammatory" element={<InflammatoryPage />} />
                          <Route path="/medical" element={<MedicalPage />} />
                          <Route path="/profile" element={<ProfilePage />} />
                          <Route path="/support" element={
                            <>
                              <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
                                <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center">
                                  <h1 className="text-4xl font-bold text-health-blue-dark mb-4">Support</h1>
                                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                    If you need any help or have questions, please reach out to our support team.
                                  </p>
                                </div>
                              </div>
                            </>
                          } />
                          <Route path="*" element={<NotFound />} />
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
