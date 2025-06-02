import React from 'react';

interface ActionPlanProps {
  shortTerm: string[];
  mediumTerm: string[];
  longTerm: string[];
}

export const ActionPlan: React.FC<ActionPlanProps> = ({
  shortTerm,
  mediumTerm,
  longTerm,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Priority Action Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Short Term</h3>
          <ul className="space-y-2">
            {shortTerm.map((action, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <span className="ml-2 text-gray-600">{action}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Medium Term</h3>
          <ul className="space-y-2">
            {mediumTerm.map((action, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <span className="ml-2 text-gray-600">{action}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Long Term</h3>
          <ul className="space-y-2">
            {longTerm.map((action, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <span className="ml-2 text-gray-600">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}; 