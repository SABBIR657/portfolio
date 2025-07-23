import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import StatsCard from "../../components/admin/StatsCard";
import { FiBriefcase, FiFileText, FiMail, FiUser } from "react-icons/fi";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    messages: 0,
    profileViews: 0,
  });

  useEffect(() => {
    // Fetch stats from API (we'll implement this later)
    const fetchStats = async () => {
      try {
        // Temporary mock data
        setStats({
          projects: 12,
          blogs: 5,
          messages: 8,
          profileViews: 245,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={<FiBriefcase className="text-blue-500" size={24} />}
          title="Projects"
          value={stats.projects}
          link="/admin/projects"
        />
        <StatsCard
          icon={<FiFileText className="text-green-500" size={24} />}
          title="Blog Posts"
          value={stats.blogs}
          link="/admin/blogs"
        />
        <StatsCard
          icon={<FiMail className="text-purple-500" size={24} />}
          title="Messages"
          value={stats.messages}
          link="/admin/messages"
        />
        <StatsCard
          icon={<FiUser className="text-orange-500" size={24} />}
          title="Profile Views"
          value={stats.profileViews}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>
          {/* We'll implement this later */}
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
          {/* We'll implement this later */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
