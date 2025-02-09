import { useEffect, useState } from "react";

import VisaCard from "../components/VisaCard";
import LoadingSpinner from "../components/LoadingSpinner";

const AllVisas = () => {
  const [visas, setVisas] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // Fetch all visas from the backend
  useEffect(() => {
    fetch("https://visa-nav-server.vercel.app/all-visas")
      .then((res) => res.json())
      .then((data) => {
        setVisas(data);
        setFilteredVisas(data); // Initially show all visas
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching visas:", error));
  }, []);

  // Filter visas based on dropdown selection
  useEffect(() => {
    if (filter === "All") {
      setFilteredVisas(visas);
    } else {
      setFilteredVisas(visas.filter((visa) => visa.visaType === filter));
    }
  }, [filter, visas]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center my-6">All Visas</h2>

      {/* Filter Dropdown */}
      <div className="text-center mb-6">
        <label htmlFor="visa-filter" className="mr-4 font-bold text-gray-700">
          Filter by Visa Type:
        </label>
        <select
          id="visa-filter"
          className="p-2 border rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Tourist Visa">Tourist Visa</option>
          <option value="Student Visa">Student Visa</option>
          <option value="Official Visa">Official Visa</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVisas.length > 0 ? (
          filteredVisas.map((visa) => <VisaCard key={visa._id} visa={visa} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No visas found for the selected filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllVisas;
