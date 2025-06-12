import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Syringe,
  AlertTriangle,
  ArrowLeft
} from "lucide-react";

const MedicalSupplementsReport = () => {
  //const reportDate = "April–May 2025";
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000); // 4 seconds delay
    return () => clearTimeout(timer);
  }, []);

  const supplementUse = [
    {
      name: "Crestor (Rosuvastatin)",
      benefit: "Noted improvement in shoulder inflammation",
    },
    {
      name: "Methialyn",
      benefit: "Supports methylation and detoxification pathways",
    },
    {
      name: "DK Mulsion (Vitamin D + K)",
      benefit: "Improves vitamin D absorption and bone metabolism",
    },
    {
      name: "Methylfolate (B9)",
      benefit: "Corrects folate deficiency with better bioavailability",
    },
    {
      name: "Cyanocobalamin (B12)",
      benefit: "Supports red blood cell function and energy metabolism",
    },
    {
      name: "Magnesium",
      benefit: "Neuromuscular health, recovery, stress modulation",
    },
    {
      name: "Silymarin",
      benefit: "Liver detoxification and antioxidant protection",
    },
    {
      name: "Omega 3",
      benefit: "Reduces inflammation and supports cardiovascular health",
    }
  ];

  const recommendations = [
    "Continue use of Crestor if inflammation continues to reduce and no side effects arise",
    "Monitor liver markers during ongoing use of Silymarin and Methialyn",
    "Evaluate vitamin D status after 2 months of DK Mulsion supplementation",
    "Rotate probiotics quarterly to diversify gut flora, based on gut-genetic feedback",
    "Reduce high-glycemic carbs to control insulin resistance (HOMA-IR = 1.8)",
    "Use Quercetin & NAC in allergy seasons or oxidative stress periods",
    "Recheck homocysteine after 3 months of methylation protocol (B9, B12, Methialyn)"
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          <p className="text-lg font-medium text-gray-700 mt-4">Analyzing... Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
        </div>

        {/* Supplements & Therapy */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Syringe className="w-5 h-5 mr-2 text-indigo-600" />
            Therapeutics & Supplement Benefits
          </h2>
          <ul className="space-y-2 text-sm">
            {supplementUse.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span className="font-medium text-gray-800">{item.name}</span>
                <span className="text-gray-500">{item.benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
            Recommended Actions & Protocol
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
            {recommendations.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>

        <div className="text-xs text-gray-500 text-center pt-6">
          Based on insights from: NutriGen™, Blood Analysis, Supplement Plan, and Clinical Feedback (2H Center)
        </div>
      </div>
    </div>
  );
};

export default MedicalSupplementsReport;