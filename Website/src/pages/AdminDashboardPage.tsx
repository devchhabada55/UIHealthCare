// import { Link } from 'react-router-dom'; // Commented out for demo
import React, { useState } from 'react';
import { Upload, FileText, Eye, Trash2, X, CheckCircle, User, Activity, FileUp, Database } from 'lucide-react';

const AdminDashboardPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingPatientId, setUploadingPatientId] = useState<string | null>(null);
  const [uploadedReports, setUploadedReports] = useState<{[key: string]: File[]}>({});
  const [showUploadedReports, setShowUploadedReports] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadReports = () => {
    if (selectedFiles.length > 0 && uploadingPatientId) {
      // Save files to "local storage" (in memory for this demo)
      setUploadedReports(prev => ({
        ...prev,
        [uploadingPatientId]: [...(prev[uploadingPatientId] || []), ...selectedFiles]
      }));
      
      console.log(`Uploading ${selectedFiles.length} files for patient ${uploadingPatientId}:`);
      selectedFiles.forEach(file => {
        console.log(`- ${file.name} (${file.type}, ${file.size} bytes)`);
      });
      
      setSelectedFiles([]);
      setUploadingPatientId(null);
      alert(`Successfully uploaded ${selectedFiles.length} reports for patient ${uploadingPatientId}.`);
    } else {
      alert('Please select files to upload.');
    }
  };

  const deleteUploadedReport = (patientId: string, fileIndex: number) => {
    setUploadedReports(prev => ({
      ...prev,
      [patientId]: prev[patientId].filter((_, i) => i !== fileIndex)
    }));
  };

  const viewFile = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const dummyPatients = [
    {
      id: 'p001',
      name: 'Jane Doe',
      username: 'janedoe',
      reportsUploaded: uploadedReports['p001']?.length > 0,
      lastVisit: '2024-06-10',
      status: 'Active'
    },
    {
      id: 'p002',
      name: 'John Smith',
      username: 'johnsmith',
      reportsUploaded: uploadedReports['p002']?.length > 0,
      lastVisit: '2024-06-08',
      status: 'Active'
    },
    {
      id: 'p003',
      name: 'Emily White',
      username: 'emilywhite',
      reportsUploaded: uploadedReports['p003']?.length > 0,
      lastVisit: '2024-06-05',
      status: 'Inactive'
    },
  ];

  const totalPatients = dummyPatients.length;
  const activePatients = dummyPatients.filter(p => p.status === 'Active').length;
  const totalReports = Object.values(uploadedReports).reduce((sum, reports) => sum + reports.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">2H Health Centre</h1>
                <p className="text-sm text-slate-600">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Patients</p>
                <p className="text-2xl font-bold text-slate-800">{totalPatients}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Active Patients</p>
                <p className="text-2xl font-bold text-slate-800">{activePatients}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Reports</p>
                <p className="text-2xl font-bold text-slate-800">{totalReports}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Patient Management Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200/60">
            <h2 className="text-xl font-bold text-slate-800 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Patient Management
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/80">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Patient Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Reports
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {dummyPatients.map(patient => (
                  <tr key={patient.id} className="hover:bg-slate-50/50 transition-all duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{patient.name}</p>
                          <p className="text-sm text-slate-600">@{patient.username}</p>
                          <p className="text-xs text-slate-500">Last visit: {patient.lastVisit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        patient.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600">
                          {uploadedReports[patient.id]?.length || 0} reports
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="inline-flex items-center px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
                          onClick={() => setUploadingPatientId(uploadingPatientId === patient.id ? null : patient.id)}
                        >
                          <Upload className="w-4 h-4 mr-1" />
                          Upload Report
                        </button>
                        
                        {uploadedReports[patient.id]?.length > 0 && (
                          <button
                            className="inline-flex items-center px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors duration-200"
                            onClick={() => setShowUploadedReports(showUploadedReports === patient.id ? null : patient.id)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Reports
                          </button>
                        )}
                        
                        <a 
                          href={`/dashboard?patientId=${patient.id}`} 
                          className="inline-flex items-center px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          <Activity className="w-4 h-4 mr-1" />
                          Dashboard
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* File Upload Section */}
        {uploadingPatientId && (
          <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                <FileUp className="w-5 h-5 mr-2 text-blue-600" />
                Upload Reports for {dummyPatients.find(p => p.id === uploadingPatientId)?.name}
              </h3>
              <button
                onClick={() => {
                  setUploadingPatientId(null);
                  setSelectedFiles([]);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">Drag and drop PDF files here or</p>
                <label className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer font-medium transition-colors duration-200">
                  <FileText className="w-4 h-4 mr-2" />
                  Browse Files
                  <input
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800">Selected Files ({selectedFiles.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <FileText className="w-8 h-8 text-red-600 mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-slate-800 truncate">{file.name}</p>
                              <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-1 hover:bg-slate-200 rounded-lg transition-colors duration-200 flex-shrink-0"
                          >
                            <X className="w-4 h-4 text-slate-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleUploadReports}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View Uploaded Reports Section */}
        {showUploadedReports && uploadedReports[showUploadedReports] && (
          <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-600" />
                Uploaded Reports for {dummyPatients.find(p => p.id === showUploadedReports)?.name}
              </h3>
              <button
                onClick={() => setShowUploadedReports(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedReports[showUploadedReports].map((file, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-8 h-8 text-red-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 truncate">{file.name}</p>
                      <p className="text-sm text-slate-500 mb-3">{formatFileSize(file.size)}</p>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => viewFile(file)}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => deleteUploadedReport(showUploadedReports, index)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardPage;