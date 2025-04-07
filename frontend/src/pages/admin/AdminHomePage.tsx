// src/pages/admin/AdminHomePage.tsx
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext"; // Adjust path if needed

const AdminHomePage = () => {
  const { user } = useContext(AuthContext); // assumes you have user info like name

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome back, {user?.name || "Admin"}!</h1>
      <p className="text-lg mb-6">What would you like to manage today?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/admin/movies" className="p-6 border rounded-lg shadow hover:bg-gray-100">
          🎬 Manage Movies
        </a>
        {/* Add more admin actions as needed */}
      </div>
    </div>
  );
};

export default AdminHomePage;
