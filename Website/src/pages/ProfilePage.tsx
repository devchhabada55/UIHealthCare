import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    dob: '1990-01-01',
    bloodType: 'A+',
    allergies: 'None',
    medications: 'None',
    medicalHistory: 'No significant history',
    currentHealthConcerns: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data submitted:', formData);
    // In a real application, you would send this data to a backend
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-20">
      <div className="bg-white rounded-xl shadow-xl p-8 sm:p-10 w-full max-w-3xl relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-center text-teal-800 mb-8">
          Your Health Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" value={formData.dob} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select value={formData.bloodType} onValueChange={(value: string) => handleSelectChange('bloodType', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea id="allergies" value={formData.allergies} onChange={handleChange} rows={3} />
          </div>

          <div>
            <Label htmlFor="medications">Current Medications</Label>
            <Textarea id="medications" value={formData.medications} onChange={handleChange} rows={3} />
          </div>

          <div>
            <Label htmlFor="medicalHistory">Past Medical History</Label>
            <Textarea id="medicalHistory" value={formData.medicalHistory} onChange={handleChange} rows={5} />
          </div>

          <div>
            <Label htmlFor="currentHealthConcerns">Current Health Concerns</Label>
            <Textarea id="currentHealthConcerns" value={formData.currentHealthConcerns} onChange={handleChange} rows={3} placeholder="e.g., Seasonal allergies, recent fatigue, etc." />
          </div>

          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage; 