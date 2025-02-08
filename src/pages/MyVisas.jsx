import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import UpdateVisaModal from "../components/UpdateVisaModal";
import { toast } from "react-toastify";

const MyVisas = () => {
  const { user } = useAuth();
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisa, setSelectedVisa] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/my-visas/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setVisas(data);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching visas:", error));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this visa?"
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:3000/visa/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        toast.success("Visa deleted successfully!");
        setVisas(visas.filter((visa) => visa._id !== id));
      })
      .catch(() => toast.error("Error deleting visa"));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center my-6">My Added Visas</h2>
      {visas.length === 0 ? (
        <p className="text-center">No visas added.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visas.map((visa) => (
            <div key={visa._id} className="border rounded-lg shadow-md p-4">
              <img
                src={visa.countryImage}
                alt={visa.countryName}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-xl font-bold my-2">{visa.countryName}</h3>
              <p className="text-sm text-gray-500">{visa.visaType}</p>
              <p className="text-sm text-gray-500">
                Processing Time: {visa.processingTime}
              </p>
              <p className="text-sm text-gray-500">Fee: ${visa.fee}</p>
              <p className="text-sm text-gray-500">Validity: {visa.validity}</p>
              <p className="text-sm text-gray-500">
                Application Method: {visa.applicationMethod}
              </p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => setSelectedVisa(visa)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(visa._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedVisa && (
        <UpdateVisaModal
          visa={selectedVisa}
          closeModal={() => setSelectedVisa(null)}
          setVisas={setVisas}
          visas={visas}
        />
      )}
    </div>
  );
};

export default MyVisas;
