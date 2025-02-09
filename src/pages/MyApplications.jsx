import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { Fade } from "react-awesome-reveal";
import { toast } from "react-toastify";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch applications for the logged-in user
  useEffect(() => {
    if (user) {
      fetch(`https://visa-nav-server.vercel.app/applications/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setApplications(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching applications:", error);
          setApplications([]);
          setLoading(false);
        });
    }
  }, [user]);

  // Cancel button functionality
  const handleCancel = (id) => {
    fetch(`https://visa-nav-server.vercel.app/application/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Application cancelled!");
        // Instantly update the UI by filtering out the canceled application
        setApplications((prev) => prev.filter((app) => app._id !== id));
      })
      .catch(() => toast.error("Error cancelling application"));
  };

  // Search filter
  const filteredApplications = applications.filter((app) =>
    app?.countryName?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto">
      <Fade>
        <h2 className="text-3xl font-bold text-center my-6">
          My Visa Applications
        </h2>
      </Fade>

      {/* Search Bar */}
      <Fade>
        <div className="text-center mb-4">
          <input
            type="text"
            placeholder="Search by Country Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full md:w-1/2"
          />
        </div>
      </Fade>

      {filteredApplications.length === 0 ? (
        <Fade>
          <p className="text-center">No applications found.</p>
        </Fade>
      ) : (
        <Fade cascade>
          <ul className="space-y-4">
            {filteredApplications.map((app) => (
              <li key={app._id} className="border p-4 shadow rounded-lg">
                <h3 className="text-xl font-bold">
                  {app?.countryName || "Unknown Country"}
                </h3>
                <p>
                  <strong>Visa Type:</strong> {app?.visaType || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {app?.status || "Pending"}
                </p>
                <p>
                  <strong>Applied Date:</strong>{" "}
                  {new Date(app?.appliedAt).toLocaleDateString() || "N/A"}
                </p>
                <button
                  onClick={() => handleCancel(app._id)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </Fade>
      )}
    </div>
  );
};

export default MyApplications;
