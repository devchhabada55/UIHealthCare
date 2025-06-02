import React from 'react';

interface SuccessTrackingProps {
  keyMetrics: string[];
  milestones: string[];
  recommendations: string[];
}

export const SuccessTracking: React.FC<SuccessTrackingProps> = ({
  keyMetrics,
  milestones,
  recommendations,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Success Tracking</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
          <ul className="space-y-2">
            {keyMetrics.map((metric, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-green-500">•</span>
                <span className="ml-2 text-gray-600">{metric}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Milestones</h3>
          <ul className="space-y-2">
            {milestones.map((milestone, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-green-500">•</span>
                <span className="ml-2 text-gray-600">{milestone}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h3>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-green-500">•</span>
                <span className="ml-2 text-gray-600">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}; 