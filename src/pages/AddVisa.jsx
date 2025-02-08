import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddVisa = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    countryImage: "",
    countryName: "",
    visaType: "Tourist Visa",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle checkbox selection
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      requiredDocuments: checked
        ? [...prevData.requiredDocuments, value]
        : prevData.requiredDocuments.filter((doc) => doc !== value),
    }));
  };

  // Submit Visa Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.countryImage) {
      toast.error("Please enter an image URL!");
      return;
    }

    const newVisa = { ...formData, createdBy: user.email };

    fetch("http://localhost:3000/add-visa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVisa),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Visa added successfully!");
        navigate("/all-visas");
      })
      .catch(() => toast.error("Error adding visa"));
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-md rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Add a New Visa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Country Image URL:
          <input
            type="text"
            name="countryImage"
            value={formData.countryImage}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="Enter image URL"
          />
        </label>

        <label className="block">
          Country Name:
          <input
            type="text"
            name="countryName"
            value={formData.countryName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block">
          Visa Type:
          <select
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option>Tourist Visa</option>
            <option>Student Visa</option>
            <option>Official Visa</option>
          </select>
        </label>

        <label className="block">
          Processing Time:
          <input
            type="text"
            name="processingTime"
            value={formData.processingTime}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <fieldset className="border p-3 rounded">
          <legend>Required Documents:</legend>
          <label className="block">
            <input
              type="checkbox"
              value="Valid passport"
              onChange={handleCheckboxChange}
            />{" "}
            Valid Passport
          </label>
          <label className="block">
            <input
              type="checkbox"
              value="Visa application form"
              onChange={handleCheckboxChange}
            />{" "}
            Visa Application Form
          </label>
          <label className="block">
            <input
              type="checkbox"
              value="Recent passport-sized photograph"
              onChange={handleCheckboxChange}
            />{" "}
            Recent Passport-Sized Photograph
          </label>
        </fieldset>

        <label className="block">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          ></textarea>
        </label>

        <label className="block">
          Age Restriction:
          <input
            type="number"
            name="ageRestriction"
            value={formData.ageRestriction}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block">
          Fee:
          <input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block">
          Validity:
          <input
            type="text"
            name="validity"
            value={formData.validity}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block">
          Application Method:
          <input
            type="text"
            name="applicationMethod"
            value={formData.applicationMethod}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded"
        >
          Add Visa
        </button>
      </form>
    </div>
  );
};

export default AddVisa;
