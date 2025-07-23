import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiFileText,
  FiMail,
  FiUser,
  FiSettings,
} from "react-icons/fi";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Portfolio Admin</h1>
      </div>

      <nav className="p-4 space-y-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-900" : "hover:bg-gray-700"
            }`
          }
        >
          <FiHome className="mr-3" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-900" : "hover:bg-gray-700"
            }`
          }
        >
          <FiUser className="mr-3" />
          Profile
        </NavLink>

        <NavLink
          to="/admin/projects"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-900" : "hover:bg-gray-700"
            }`
          }
        >
          <FiBriefcase className="mr-3" />
          Projects
        </NavLink>

        <NavLink
          to="/admin/blogs"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-900" : "hover:bg-gray-700"
            }`
          }
        >
          <FiFileText className="mr-3" />
          Blog Posts
        </NavLink>

        <NavLink
          to="/admin/messages"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-900" : "hover:bg-gray-700"
            }`
          }
        >
          <FiMail className="mr-3" />
          Messages
        </NavLink>

        <div className="pt-4 border-t border-gray-700">
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg ${
                isActive ? "bg-gray-900" : "hover:bg-gray-700"
              }`
            }
          >
            <FiSettings className="mr-3" />
            Settings
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
