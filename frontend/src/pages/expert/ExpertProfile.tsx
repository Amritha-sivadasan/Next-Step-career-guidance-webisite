// src/components/ProfileDetails.tsx
import React from 'react';

const ProfileDetails: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
      </div>
      <h2 className="text-2xl font-semibold text-center mb-6">My Details</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input type="text" value="Amritha s" className="w-full border-gray-300 rounded-md shadow-sm" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="text" value="amr@gmail.com" className="w-full border-gray-300 rounded-md shadow-sm" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input type="text" value="9048564474" className="w-full border-gray-300 rounded-md shadow-sm" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Availability</label>
            <input type="text" value="09:00 am-04:00pm" className="w-full border-gray-300 rounded-md shadow-sm" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Consulting Fee</label>
            <input type="text" value="1000rs" className="w-full border-gray-300 rounded-md shadow-sm" readOnly />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Professional Bio</label>
            <textarea
              className="w-full border-gray-300 rounded-md shadow-sm"
              readOnly
              value="Experienced nursing professional dedicated to patient care and evidence-based practice in critical care settings"
            />
          </div>
          <div>
            <label className="block text-gray-700">Areas of Expertise</label>
            <textarea
              className="w-full border-gray-300 rounded-md shadow-sm"
              readOnly
              value="• Paramedical\n• Nursing"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
