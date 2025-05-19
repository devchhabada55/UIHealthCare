
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveDashboard from "./components/layout/ResponsiveDashboard";
import HomePage from "./pages/Home";
import BodyCompositionPage from "./pages/BodyComposition";
import HeartHealthPage from "./pages/HeartHealth";
import HormoneProfilePage from "./pages/HormoneProfile";
import SkinHealthPage from "./pages/SkinHealth";
import WellbeingPage from "./pages/Wellbeing";
import PhysicalFitnessPage from "./pages/PhysicalFitness";
import DnaNutritionPage from "./pages/DnaNutrition";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance outside the component
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <ResponsiveDashboard>
                  <HomePage />
                </ResponsiveDashboard>
              } />
              <Route path="/body-composition" element={
                <ResponsiveDashboard>
                  <BodyCompositionPage />
                </ResponsiveDashboard>
              } />
              <Route path="/heart-health" element={
                <ResponsiveDashboard>
                  <HeartHealthPage />
                </ResponsiveDashboard>
              } />
              <Route path="/hormone-profile" element={
                <ResponsiveDashboard>
                  <HormoneProfilePage />
                </ResponsiveDashboard>
              } />
              <Route path="/blood-analysis" element={
                <ResponsiveDashboard>
                  <SkinHealthPage reportType="Blood Analysis" />
                </ResponsiveDashboard>
              } />
              <Route path="/skin-health" element={
                <ResponsiveDashboard>
                  <SkinHealthPage />
                </ResponsiveDashboard>
              } />
              <Route path="/wellbeing" element={
                <ResponsiveDashboard>
                  <WellbeingPage />
                </ResponsiveDashboard>
              } />
              <Route path="/physical-fitness" element={
                <ResponsiveDashboard>
                  <PhysicalFitnessPage />
                </ResponsiveDashboard>
              } />
              <Route path="/dna-nutrition" element={
                <ResponsiveDashboard>
                  <DnaNutritionPage />
                </ResponsiveDashboard>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
