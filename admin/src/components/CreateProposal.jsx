// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { handleError, handleSuccess } from "../utils";
// import { ToastContainer } from "react-toastify";

// const CreateProposal = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     clientName: "",
//     expiryDate: "",
//     description: "",
//     clientId: "",
//   });

//   const navigate = useNavigate();

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if all fields are filled
//     if (Object.values(formData).some((val) => val.trim() === "")) {
//       handleError("All fields are required.");
//       return;
//     }

//     try {
//       console.log("Sending Data:", formData); // Debugging log

//       const response = await axios.post(
//         "http://localhost:5000/api/proposals/create",
//         formData
//       );

//       console.log("API Response:", response.data); // Debugging log

//       handleSuccess(response.data.message);
//       navigate("/dashboard"); // Redirect after successful creation
//     } catch (error) {
//       console.error("API Error:", error.response?.data || error.message);
//       handleError(error.response?.data?.error || "Failed to create proposal");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Create New Proposal</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Company Name</label>
//           <input
//             type="text"
//             name="companyName"
//             className="form-control"
//             value={formData.companyName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Client Name</label>
//           <input
//             type="text"
//             name="clientName"
//             className="form-control"
//             value={formData.clientName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Expiry Date</label>
//           <input
//             type="date"
//             name="expiryDate"
//             className="form-control"
//             value={formData.expiryDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             name="description"
//             className="form-control"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Client ID</label>
//           <input
//             type="text"
//             name="clientId"
//             className="form-control"
//             value={formData.clientId}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Create Proposal
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default CreateProposal;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { handleError, handleSuccess } from "../utils";
// import { ToastContainer } from "react-toastify";

// const CreateProposal = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     clientName: "",
//     expiryDate: "",
//     description: "",
//     clientId: "",
//   });

//   const navigate = useNavigate();

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if all fields are filled
//     if (Object.values(formData).some((val) => val.trim() === "")) {
//       handleError("All fields are required.");
//       return;
//     }

//     try {
//       console.log("Sending Data:", formData); // Debugging log

//       const response = await axios.post(
//         "http://localhost:5000/api/proposals/create",
//         formData
//       );

//       console.log("API Response:", response.data); // Debugging log

//       handleSuccess(response.data.message);
//       navigate("/dashboard"); // Redirect after successful creation
//     } catch (error) {
//       console.error("API Error:", error.response?.data || error.message);
//       handleError(error.response?.data?.error || "Failed to create proposal");
//     }
//   };

//   return (
//     <div className="container mt-5 position-relative">
//       {/* Cross button to close */}
//       <button
//         className="btn-close position-absolute top-0 end-0 m-3"
//         onClick={() => navigate(-1)}
//         aria-label="Close"
//       ></button>

//       <h2 className="mb-4">Create New Proposal</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Company Name</label>
//           <input
//             type="text"
//             name="companyName"
//             className="form-control"
//             value={formData.companyName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Client Name</label>
//           <input
//             type="text"
//             name="clientName"
//             className="form-control"
//             value={formData.clientName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Expiry Date</label>
//           <input
//             type="date"
//             name="expiryDate"
//             className="form-control"
//             value={formData.expiryDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             name="description"
//             className="form-control"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Client ID</label>
//           <input
//             type="text"
//             name="clientId"
//             className="form-control"
//             value={formData.clientId}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Create Proposal
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default CreateProposal;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// const CreateProposal = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     clientName: "",
//     expiryDate: "",
//     description: "",
//     clientId: "",
//   });

//   const navigate = useNavigate();

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Show toast notification
//   const showToast = (message, type = "success") => {
//     if (type === "success") {
//       toast.success(message);
//     } else {
//       toast.error(message);
//     }
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if all fields are filled
//     if (Object.values(formData).some((val) => val.trim() === "")) {
//       showToast("All fields are required.", "error");
//       return;
//     }

//     try {
//       console.log("Sending Data:", formData);

//       const response = await fetch(
//         "http://localhost:5000/api/proposals/create",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await response.json();
//       console.log("API Response:", data);

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to create proposal");
//       }

//       showToast("Proposal created successfully!", "success");

//       // Redirect after a short delay to show toast
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 2000);
//     } catch (error) {
//       console.error("API Error:", error.message);
//       showToast(error.message, "error");
//     }
//   };

//   return (
//     <div className="container mt-5 position-relative">
//       {/* Close button */}
//       <button
//         className="btn-close position-absolute top-0 end-0 m-3"
//         onClick={() => navigate(-1)}
//         aria-label="Close"
//       ></button>

//       <h2 className="mb-4">Create New Proposal</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Company Name</label>
//           <input
//             type="text"
//             name="companyName"
//             className="form-control"
//             value={formData.companyName}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Client Name</label>
//           <input
//             type="text"
//             name="clientName"
//             className="form-control"
//             value={formData.clientName}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Expiry Date</label>
//           <input
//             type="date"
//             name="expiryDate"
//             className="form-control"
//             value={formData.expiryDate}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             name="description"
//             className="form-control"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Client ID</label>
//           <input
//             type="text"
//             name="clientId"
//             className="form-control"
//             value={formData.clientId}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Create Proposal
//         </button>
//       </form>

//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default CreateProposal;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// const CreateProposal = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     clientName: "",
//     expiryDate: "",
//     description: "",
//     clientId: "",
//     brands: [],
//   });
//   const [brandInput, setBrandInput] = useState("");

//   const navigate = useNavigate();

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle brand input change
//   const handleBrandChange = (e) => {
//     setBrandInput(e.target.value);
//   };

//   // Add brand to list
//   const addBrand = () => {
//     if (brandInput.trim() !== "") {
//       setFormData({ ...formData, brands: [...formData.brands, brandInput] });
//       setBrandInput("");
//     }
//   };

//   // Remove brand from list
//   const removeBrand = (index) => {
//     setFormData({
//       ...formData,
//       brands: formData.brands.filter((_, i) => i !== index),
//     });
//   };

//   // Show toast notification
//   const showToast = (message, type = "success") => {
//     if (type === "success") {
//       toast.success(message);
//     } else {
//       toast.error(message);
//     }
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if all fields are filled
//     if (Object.values(formData).some((val) => val === "")) {
//       showToast("All fields are required.", "error");
//       return;
//     }

//     try {
//       console.log("Sending Data:", formData);

//       const response = await fetch(
//         "http://localhost:5000/api/proposals/create",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await response.json();
//       console.log("API Response:", data);

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to create proposal");
//       }

//       showToast("Proposal created successfully!", "success");

//       // Redirect after a short delay to show toast
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 2000);
//     } catch (error) {
//       console.error("API Error:", error.message);
//       showToast(error.message, "error");
//     }
//   };

//   return (
//     <div className="container mt-5 position-relative">
//       {/* Close button */}
//       <button
//         className="btn-close position-absolute top-0 end-0 m-3"
//         onClick={() => navigate(-1)}
//         aria-label="Close"
//       ></button>

//       <h2 className="mb-4">Create New Proposal</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Company Name</label>
//           <input
//             type="text"
//             name="companyName"
//             className="form-control"
//             value={formData.companyName}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Client Name</label>
//           <input
//             type="text"
//             name="clientName"
//             className="form-control"
//             value={formData.clientName}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Expiry Date</label>
//           <input
//             type="date"
//             name="expiryDate"
//             className="form-control"
//             value={formData.expiryDate}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             name="description"
//             className="form-control"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Client ID</label>
//           <input
//             type="text"
//             name="clientId"
//             className="form-control"
//             value={formData.clientId}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Brands</label>
//           <div className="d-flex">
//             <input
//               type="text"
//               className="form-control"
//               value={brandInput}
//               onChange={handleBrandChange}
//             />
//             <button
//               type="button"
//               className="btn btn-secondary ms-2"
//               onClick={addBrand}
//             >
//               Add
//             </button>
//           </div>
//           <ul className="list-group mt-2">
//             {formData.brands.map((brand, index) => (
//               <li
//                 key={index}
//                 className="list-group-item d-flex justify-content-between"
//               >
//                 {brand}
//                 <button
//                   type="button"
//                   className="btn btn-danger btn-sm"
//                   onClick={() => removeBrand(index)}
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Create Proposal
//         </button>
//       </form>

//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default CreateProposal;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const CreateProposal = () => {
  const navigate = useNavigate();

  const [proposal, setProposal] = useState({
    companyName: "",
    clientName: "",
    expiryDate: "",
    proposalDescription: "",
    clientId: "",
    scopeOfWork: {
      title: "",
      objective: "",
      services: [""],
      description: [""],
    },
    timelineDeliverables: {
      week: [{ week1: "" }, { week2: "" }],
      task: "",
      deliverables: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProposal({ ...proposal, [name]: value });
  };

  const handleScopeChange = (e, field) => {
    setProposal({
      ...proposal,
      scopeOfWork: { ...proposal.scopeOfWork, [field]: e.target.value },
    });
  };

  const handleTimelineChange = (e, field, weekIndex = null, key = null) => {
    if (field === "week") {
      // Create a deep copy of the week array
      const newWeeks = proposal.timelineDeliverables.week.map((week, idx) =>
        idx === weekIndex ? { ...week, [key]: e.target.value } : week
      );

      setProposal((prevProposal) => ({
        ...prevProposal,
        timelineDeliverables: {
          ...prevProposal.timelineDeliverables,
          week: newWeeks,
        },
      }));
    } else {
      setProposal((prevProposal) => ({
        ...prevProposal,
        timelineDeliverables: {
          ...prevProposal.timelineDeliverables,
          [field]: e.target.value,
        },
      }));
    }
  };

  const handleArrayChange = (e, field, index) => {
    const newArray = [...proposal.scopeOfWork[field]];
    newArray[index] = e.target.value;
    setProposal({
      ...proposal,
      scopeOfWork: { ...proposal.scopeOfWork, [field]: newArray },
    });
  };

  const addArrayField = (field) => {
    setProposal({
      ...proposal,
      scopeOfWork: {
        ...proposal.scopeOfWork,
        [field]: [...proposal.scopeOfWork[field], ""],
      },
    });
  };

  const removeArrayField = (field, index) => {
    const newArray = [...proposal.scopeOfWork[field]];
    newArray.splice(index, 1);
    setProposal({
      ...proposal,
      scopeOfWork: { ...proposal.scopeOfWork, [field]: newArray },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://proposal-backend-1dom.onrender.com/api/proposals/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(proposal),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create proposal");
      }

      handleSuccess("Proposal Created Successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full relative">
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
        ></button>

        <h2 className="text-2xl font-semibold text-center mb-4">
          Create Proposal
        </h2>

        <div className="overflow-y-auto p-4 border border-gray-300 rounded-lg max-h-[80vh]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="row align-items-start">
              <div className="col">
                <h3 className="text-lg font-semibold">Client detail</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Company Name", name: "companyName" },
                    { label: "Client Name", name: "clientName" },
                  ].map(({ label, name }) => (
                    <div key={name}>
                      <label className="block text-gray-700 font-medium">
                        {label}
                      </label>
                      <input
                        type="text"
                        name={name}
                        value={proposal[name] || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Expiry Date", name: "expiryDate", type: "date" },
                    { label: "Client ID", name: "clientId", type: "text" },
                  ].map(({ label, name, type }) => (
                    <div key={name}>
                      <label className="block text-gray-700 font-medium mt-4">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={proposal[name] || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mt-4">
                    Proposal Description
                  </label>
                  <textarea
                    name="proposalDescription"
                    value={proposal.proposalDescription || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                {/* <h3 className="text-lg font-semibold">
                  Timeline & Deliverables
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Week", name: "week" },
                    { label: "Task", name: "task" },
                    { label: "Deliverables", name: "deliverables" },
                  ].map(({ label, name }) => (
                    <div key={name}>
                      <label className="block text-gray-700 font-medium">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={proposal.timelineDeliverables[name] || ""}
                        onChange={(e) => handleTimelineChange(e, name)}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        required
                      />
                    </div>
                  ))}
                </div> */}
                <h3 className="text-lg font-semibold">
                  Timeline & Deliverables
                </h3>
                <div className="flex gap-8">
                  {[
                    { label: "Task", name: "task" },
                    { label: "Deliverables", name: "deliverables" },
                  ].map(({ label, name }) => (
                    <div key={name} className="w-50">
                      <label className="block text-gray-700 font-medium">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={proposal.timelineDeliverables[name] || ""}
                        onChange={(e) => handleTimelineChange(e, name)}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <label className="block text-gray-700 font-medium">
                    Week
                  </label>
                  {proposal.timelineDeliverables.week.map((weekObj, index) =>
                    Object.entries(weekObj).map(
                      ([key, value]) =>
                        key !== "_id" && ( // Exclude _id from rendering
                          <div
                            key={`${index}-${key}`}
                            className="flex flex-col"
                          >
                            <label className="block text-gray-600">{key}</label>
                            <input
                              type="text"
                              value={value || ""}
                              onChange={(e) =>
                                handleTimelineChange(e, "week", index, key)
                              }
                              className="w-20 p-2 border rounded-md focus:ring focus:ring-blue-300"
                              required
                            />
                          </div>
                        )
                    )
                  )}
                </div>
              </div>

              <div className="col">
                <h3 className="text-lg font-semibold">Scope of Work</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Title", key: "title" },
                    { label: "Objective", key: "objective" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="block text-gray-700 font-medium">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={proposal.scopeOfWork?.[key] || ""}
                        onChange={(e) => handleScopeChange(e, key)}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-8">
                  {[
                    { title: "Services", key: "services" },
                    { title: "Description", key: "description" },
                  ].map(({ title, key }) => (
                    <div key={key} className="w-[20vw]">
                      <h4 className="font-medium mt-4">{title}</h4>
                      <div className="space-y-2">
                        {proposal.scopeOfWork?.[key]?.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder={title.slice(0, -1)}
                              value={item}
                              onChange={(e) => handleArrayChange(e, key, index)}
                              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayField(key, index)}
                              className="bg-red-200 px-2 py-1 rounded"
                            >
                              <i className="bi bi-trash text-danger"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => addArrayField(key)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        + Add {title.slice(0, -1)}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-25 mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Create Proposal
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default CreateProposal;
