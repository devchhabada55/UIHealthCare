import React from 'react';

interface RedFlagsProps {
  critical: string[];
  warning: string[];
  attention: string[];
}

export const RedFlags: React.FC<RedFlagsProps> = ({
  critical,
  warning,
  attention,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Red Flags</h2>
      <div className="space-y-6">
        {critical.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-red-600 mb-3">Critical Issues</h3>
            <ul className="space-y-2">
              {critical.map((flag, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-red-500">•</span>
                  <span className="ml-2 text-gray-600">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {warning.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-yellow-600 mb-3">Warnings</h3>
            <ul className="space-y-2">
              {warning.map((flag, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-yellow-500">•</span>
                  <span className="ml-2 text-gray-600">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {attention.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-blue-600 mb-3">Attention Required</h3>
            <ul className="space-y-2">
              {attention.map((flag, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                  <span className="ml-2 text-gray-600">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}; 