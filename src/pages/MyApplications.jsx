import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/applications/${user.email}`)
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

  // Search Filter
  const filteredApplications = applications.filter((app) =>
    app?.countryName?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  // Cancel Visa Application
  const handleCancel = (id) => {
    fetch(`http://localhost:3000/application/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Application canceled successfully!");
        setApplications((prevApps) => prevApps.filter((app) => app._id !== id));
      })
      .catch(() => toast.error("Error canceling application"));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center my-6">
        My Visa Applications
      </h2>

      {/* Search Bar */}
      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="Search by Country Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
      </div>

      {filteredApplications.length === 0 ? (
        <p className="text-center">No applications found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredApplications.map((app) => (
            <li key={app._id} className="border p-4 shadow rounded-lg">
              {/* Country Image */}
              {app.countryImage && (
                <img
                  src={app.countryImage}
                  alt={app.countryName}
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}

              {/* Visa Information */}
              <h3 className="text-xl font-bold mt-2">
                {app.countryName || "Unknown Country"}
              </h3>
              <p>
                <strong>Visa Type:</strong> {app.visaType || "N/A"}
              </p>
              <p>
                <strong>Processing Time:</strong> {app.processingTime || "N/A"}
              </p>
              <p>
                <strong>Fee:</strong> ${app.fee || "N/A"}
              </p>
              <p>
                <strong>Validity:</strong> {app.validity || "N/A"}
              </p>
              <p>
                <strong>Application Method:</strong>{" "}
                {app.applicationMethod || "N/A"}
              </p>
              <p>
                <strong>Applied Date:</strong>{" "}
                {new Date(app.appliedAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Applicant Name:</strong>{" "}
                {`${app.firstName || "N/A"} ${app.lastName || ""}`}
              </p>
              <p>
                <strong>Applicant Email:</strong> {app.email || "N/A"}
              </p>

              {/* Cancel Button */}
              <button
                onClick={() => handleCancel(app._id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel Application
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyApplications;
