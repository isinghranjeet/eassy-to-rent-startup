interface AdminStatsProps {
  stats: {
    total: number;
    published: number;
    draft: number;
    featured: number;
    verified: number;
    boys: number;
    girls: number;
    coed: number;
  };
}

const AdminStats = ({ stats }: AdminStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="text-3xl font-bold text-gray-900 mb-2">{stats.total}</div>
        <div className="text-sm text-gray-600">Total Listings</div>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="text-3xl font-bold text-green-600 mb-2">{stats.published}</div>
        <div className="text-sm text-gray-600">Published</div>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="text-3xl font-bold text-orange-600 mb-2">{stats.featured}</div>
        <div className="text-sm text-gray-600">Featured</div>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="text-3xl font-bold text-blue-600 mb-2">{stats.verified}</div>
        <div className="text-sm text-gray-600">Verified</div>
      </div>
    </div>
  );
};

export default AdminStats;