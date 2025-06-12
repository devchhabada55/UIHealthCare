interface HealthSectionPageProps {
  title: string;
  description: string;
}

const HealthSectionPage = ({ title, description }: HealthSectionPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-health-blue-dark mb-4">{title}</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          {description}
        </p>
        <p className="text-md text-gray-600">
          More detailed content for the {title} section will be developed here.
        </p>
        <div className="mt-8">
          {/* Placeholder for future charts, data, or interactive elements */}
          <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            [ Placeholder for {title} specific content ]
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSectionPage; 