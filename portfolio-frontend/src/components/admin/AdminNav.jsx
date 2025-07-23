import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="w-64 bg-gray-800 text-white p-4">
      <div className="space-y-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md ${
              isActive ? "bg-gray-900" : "hover:bg-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md ${
              isActive ? "bg-gray-900" : "hover:bg-gray-700"
            }`
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/admin/projects"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md ${
              isActive ? "bg-gray-900" : "hover:bg-gray-700"
            }`
          }
        >
          Projects
        </NavLink>
      </div>
    </nav>
  );
};

export default AdminNav;
