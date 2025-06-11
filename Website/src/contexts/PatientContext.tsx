import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PatientInfo {
  name: string;
  // Add other patient properties here as needed
}

interface PatientContextType {
  patient: PatientInfo | null;
  setPatient: (patient: PatientInfo | null) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patient, setPatient] = useState<PatientInfo | null>({
    name: 'John', // Hardcoded initial name
    // Add other initial patient data here
  });

  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
}; 