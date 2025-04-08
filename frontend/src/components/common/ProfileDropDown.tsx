const ProfileDropdown = () => {
  return (
    <div className="relative group inline-block text-white">
      {/* Trigger */}
      <div className="cursor-pointer px-4 py-2 bg-blue-700">Hover Me</div>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 hidden group-hover:flex flex-col bg-zinc-900 text-white border border-gray-700 rounded shadow-lg w-48 z-50">
        <div className="px-4 py-2 hover:bg-zinc-800">Item 1</div>
        <div className="px-4 py-2 hover:bg-zinc-800">Item 2</div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ isAdmin = true }: { isAdmin?: boolean }) => {
  const navigate = useNavigate();

  return (
    <div className="relative group inline-block text-white z-50">
      {/* Profile Trigger */}
      <div className="cursor-pointer px-4 py-2">Profile ▾</div>

      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full mt-2 hidden group-hover:flex flex-col bg-zinc-900 border border-gray-700 text-white shadow-lg rounded w-48 z-50">
        <div
          className="px-4 py-2 hover:bg-zinc-800 cursor-pointer"
          onClick={() => navigate('/account')}
        >
          My Account
        </div>
        <div
          className="px-4 py-2 hover:bg-zinc-800 cursor-pointer"
          onClick={() => navigate('/settings')}
        >
          Settings
        </div>
        {isAdmin && (
          <div
            className="px-4 py-2 hover:bg-zinc-800 cursor-pointer"
            onClick={() => navigate('/admin')}
          >
            Admin Console
          </div>
        )}
        <div
          className="px-4 py-2 hover:bg-zinc-800 cursor-pointer"
          onClick={() => navigate('/logout')}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
