// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { handleError, handleSuccess } from "../utils";
// import { ToastContainer } from "react-toastify";

// function EditProposal() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     companyName: "",
//     clientName: "",
//     expiryDate: "",
//     description: "",
//   });

//   useEffect(() => {
//     fetchProposal();
//   }, []);

//   const fetchProposal = async () => {
//     try {
//       const token = localStorage.getItem("token") || "";
//       const response = await fetch(
//         `http://localhost:5000/api/proposals/${id}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch proposal details");
//       }

//       const data = await response.json();
//       setFormData({
//         companyName: data.companyName,
//         clientName: data.clientName,
//         expiryDate: new Date(data.expiryDate).toISOString().split("T")[0], // Format date
//         description: data.description,
//       });
//     } catch (error) {
//       handleError(error.message);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token") || "";
//       const response = await fetch(
//         `http://localhost:5000/api/proposals/edit/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update proposal");
//       }

//       handleSuccess("Proposal updated successfully");
//       setTimeout(() => {
//         navigate("/dashboard"); // Redirect back to dashboard
//       }, 1000);
//     } catch (error) {
//       handleError(error.message);
//     }
//   };

//   return (
//     <div className="container mt-5 position-relative">
//       {/* Close Button */}
//       <button
//         onClick={() => navigate("/dashboard")}
//         className="btn btn-close position-absolute top-0 end-0 m-3"
//         aria-label="Close"
//       ></button>

//       <h2>Edit Proposal</h2>
//       <form onSubmit={handleSubmit} className="mt-3">
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
//             rows="4"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>

//         <button type="submit" className="btn btn-success">
//           Update Proposal
//         </button>
//         <button
//           type="button"
//           className="btn btn-secondary ms-2"
//           onClick={() => navigate("/dashboard")}
//         >
//           Cancel
//         </button>
//       </form>

//       <ToastContainer />
//     </div>
//   );
// }

// export default EditProposal;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function EditProposal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proposal, setProposal] = useState({
    companyName: "",
    clientName: "",
    expiryDate: "",
    clientId: "",
    proposalDescription: "",
    scopeOfWork: {
      title: "",
      objective: "",
      services: [],
      description: [],
    },
  });

  useEffect(() => {
    fetchProposal();
  }, []);

  const fetchProposal = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch(
        `https://proposal-backend-1dom.onrender.com/api/proposals/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch proposal details");
      }

      const data = await response.json();
      setProposal({
        ...data,
        expiryDate: new Date(data.expiryDate).toISOString().split("T")[0],
      });
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleChange = (e) => {
    setProposal({ ...proposal, [e.target.name]: e.target.value });
  };

  const handleScopeChange = (e, key) => {
    setProposal({
      ...proposal,
      scopeOfWork: { ...proposal.scopeOfWork, [key]: e.target.value },
    });
  };

  const handleArrayChange = (e, key, index) => {
    const newArray = [...proposal.scopeOfWork[key]];
    newArray[index] = e.target.value;
    setProposal({
      ...proposal,
      scopeOfWork: { ...proposal.scopeOfWork, [key]: newArray },
    });
  };

  const addArrayField = (key) => {
    setProposal({
      ...proposal,
      scopeOfWork: {
        ...proposal.scopeOfWork,
        [key]: [...proposal.scopeOfWork[key], ""],
      },
    });
  };

  const removeArrayField = (key, index) => {
    const newArray = proposal.scopeOfWork[key].filter((_, i) => i !== index);
    setProposal({
      ...proposal,
      scopeOfWork: { ...proposal.scopeOfWork, [key]: newArray },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch(
        `https://proposal-backend-1dom.onrender.com/api/proposals/edit/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(proposal),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update proposal");
      }

      handleSuccess("Proposal updated successfully");
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
          Edit Proposal
        </h2>
        <div className="overflow-y-auto p-4 border border-gray-300 rounded-lg max-h-[80vh]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="row align-items-start">
              <div className="col">
                <h3 className="text-lg font-semibold">Client Detail</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["companyName", "clientName", "expiryDate", "clientId"].map(
                    (name) => (
                      <div key={name}>
                        <label className="block text-gray-700 font-medium">
                          {name.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <input
                          type={name === "expiryDate" ? "date" : "text"}
                          name={name}
                          value={proposal[name] || ""}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                          required
                        />
                      </div>
                    )
                  )}
                </div>
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
              <div className="col">
                <h3 className="text-lg font-semibold">Scope of Work</h3>
                {["title", "objective"].map((key) => (
                  <div key={key}>
                    <label className="block text-gray-700 font-medium">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={proposal.scopeOfWork[key] || ""}
                      onChange={(e) => handleScopeChange(e, key)}
                      className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 mb-4"
                      required
                    />
                  </div>
                ))}
                {["services", "description"].map((key) => (
                  <div key={key} className="w-[20vw]">
                    <h4 className="font-medium mt-4">{key}</h4>
                    {proposal.scopeOfWork[key]?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayChange(e, key, index)}
                          className="w-full p-2 border rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayField(key, index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayField(key)}>
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-25 px-4 py-2 bg-green-500 text-white rounded"
            >
              Update Proposal
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
export default EditProposal;
