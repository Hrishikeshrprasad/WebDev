import React from "react";
import UserDashboard from "./UserDashboard"; // Adjusted path assuming `UserDashboard` is in the same folder.

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg dark:bg-gray-600">
        <UserDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
