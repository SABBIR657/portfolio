import { Link } from "react-router-dom";

const StatsCard = ({ icon, title, value, link }) => {
  const content = (
    <div className="bg-white rounded-lg shadow p-6 flex items-start">
      <div className="p-3 rounded-full bg-opacity-10 bg-gray-500 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  return link ? (
    <Link to={link} className="hover:shadow-md transition-shadow">
      {content}
    </Link>
  ) : (
    content
  );
};

export default StatsCard;
