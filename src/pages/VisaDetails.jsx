import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export const visaDetailsLoader = async ({ params }) => {
  const response = await fetch(
    `https://visa-nav-server.vercel.app/visa/${params.id}`
  );
  return response.json();
};

const VisaDetails = () => {
  const visa = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // **Check if user is logged in, else redirect to login**
  useEffect(() => {
    if (!user) {
      toast.warning("You must be logged in to view visa details.");
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  // **Prevent rendering before data is fully loaded**
  if (loading || !visa) {
    return <p className="text-center text-red-500">Loading visa details...</p>;
  }

  const handleApply = (e) => {
    e.preventDefault();
    const applicationData = {
      email: user.email,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      appliedAt: new Date(),
      visaFee: visa.fee,
      status: "Pending",
    };

    fetch("https://visa-nav-server.vercel.app/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicationData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Visa application submitted!");
        setShowApplyModal(false);
      })
      .catch(() => toast.error("Error submitting application"));
  };

  return (
    <div className="max-w-2xl mx-auto border p-6 shadow-lg rounded-lg">
      {/* **Ensure image and data exist before rendering** */}
      {visa.countryImage && (
        <img
          src={visa.countryImage}
          alt={visa.countryName}
          className="w-full h-60 object-cover rounded-lg"
        />
      )}
      <h2 className="text-3xl font-bold my-4">{visa.countryName}</h2>
      <p>
        <strong>Visa Type:</strong> {visa.visaType}
      </p>
      <p>
        <strong>Processing Time:</strong> {visa.processingTime}
      </p>
      <p>
        <strong>Fee:</strong> ${visa.fee}
      </p>
      <p>
        <strong>Validity:</strong> {visa.validity}
      </p>
      <p>
        <strong>Description:</strong> {visa.description}
      </p>

      {/* Apply Button */}
      <button
        onClick={() => setShowApplyModal(true)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Apply for Visa
      </button>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
            <h2 className="text-2xl font-bold text-center mb-4">
              Apply for Visa
            </h2>
            <form onSubmit={handleApply} className="space-y-4">
              <input
                type="email"
                name="email"
                value={user.email}
                readOnly
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                readOnly
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                value={`$${visa.fee}`}
                readOnly
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails;
