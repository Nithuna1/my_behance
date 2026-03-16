export default function AdminDashboard() {

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <a
          href="/admin/projects"
          className="bg-white shadow p-6 rounded hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">
            Manage Projects
          </h2>
          <p className="text-gray-500">
            Add, edit or delete portfolio projects
          </p>
        </a>


        <a
          href="/admin/apps"
          className="bg-white shadow p-6 rounded hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">
            Manage Apps
          </h2>
          <p className="text-gray-500">
            Manage mobile applications
          </p>
        </a>


        <a
          href="/admin/services"
          className="bg-white shadow p-6 rounded hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">
            Manage Services
          </h2>
          <p className="text-gray-500">
            Add or update services
          </p>
        </a>


        <a
          href="/admin/websites"
          className="bg-white shadow p-6 rounded hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">
            Manage Websites
          </h2>
          <p className="text-gray-500">
            Manage website portfolio
          </p>
        </a>


        <a
          href="/admin/posters"
          className="bg-white shadow p-6 rounded hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">
            Manage Posters
          </h2>
          <p className="text-gray-500">
            Upload and manage posters
          </p>
        </a>


        <a
          href="/"
          className="bg-white shadow p-6 rounded hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">
            View Website
          </h2>
          <p className="text-gray-500">
            Open the public portfolio
          </p>
        </a>

      </div>

    </div>

  );
}