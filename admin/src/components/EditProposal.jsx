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
import { useParams, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const EditProposal = () => {
  const { id } = useParams(); // Get proposal ID from URL
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
    timelineDeliverables: [
      { week: { week1: "", week2: "" }, task: "", deliverables: "" },
    ],
    timelineWeeks: { startWeek: "", endWeek: "" },
    proposedInvestment: [{ services: "", description: "", cost: "" }],
    proposedCost: "",
  });

  // Fetch existing proposal data
  useEffect(() => {
    fetch(`https://proposal-backend-1dom.onrender.com/api/proposals/${id}`)
      .then((response) => response.json())
      .then((data) => setProposal(data))
      .catch((error) => console.error("Error fetching proposal:", error));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProposal((prev) => ({ ...prev, [name]: value }));
  };

  // Handle nested object updates (e.g., scopeOfWork)
  const handleNestedChange = (e, category, field) => {
    setProposal((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: e.target.value },
    }));
  };

  // Handle array updates (e.g., services in scopeOfWork)
  const handleArrayChange = (e, category, index, field) => {
    const updatedArray = [...proposal[category][field]];
    updatedArray[index] = e.target.value;
    setProposal((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: updatedArray },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://proposal-backend-1dom.onrender.com/api/proposals/edit/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(proposal),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();

      handleSuccess("Proposal Created Successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
        ></button>
      <h2 className="mb-4 text-center">Edit Proposal</h2>
      <div className="overflow-y-auto p-4 border border-gray-300 rounded-lg max-h-[80vh]">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Company Name:</label>
              <input
                type="text"
                className="form-control"
                name="companyName"
                value={proposal.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Client Name:</label>
              <input
                type="text"
                className="form-control"
                name="clientName"
                value={proposal.clientName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Expiry Date:</label>
            <input
              type="date"
              className="form-control"
              name="expiryDate"
              value={proposal.expiryDate}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Proposal Description:</label>
            <textarea
              className="form-control"
              name="proposalDescription"
              value={proposal.proposalDescription}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <h4 className="mt-4">Scope of Work</h4>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              value={proposal.scopeOfWork.title}
              onChange={(e) => handleNestedChange(e, "scopeOfWork", "title")}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Objective:</label>
            <input
              type="text"
              className="form-control"
              value={proposal.scopeOfWork.objective}
              onChange={(e) =>
                handleNestedChange(e, "scopeOfWork", "objective")
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Services:</label>
            {proposal.scopeOfWork.services.map((service, index) => (
              <input
                key={index}
                type="text"
                className="form-control mb-2"
                value={service}
                onChange={(e) =>
                  handleArrayChange(e, "scopeOfWork", index, "services")
                }
              />
            ))}
          </div>

          <h4 className="mt-4">Timeline</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Start Week:</label>
              <input
                type="text"
                className="form-control"
                value={proposal.timelineWeeks.startWeek}
                onChange={(e) =>
                  handleNestedChange(e, "timelineWeeks", "startWeek")
                }
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">End Week:</label>
              <input
                type="text"
                className="form-control"
                value={proposal.timelineWeeks.endWeek}
                onChange={(e) =>
                  handleNestedChange(e, "timelineWeeks", "endWeek")
                }
              />
            </div>
          </div>

          <h4 className="mt-4">Proposed Investment</h4>
          <div className="mb-3">
            <label className="form-label">Proposed Cost:</label>
            <input
              type="text"
              className="form-control"
              name="proposedCost"
              value={proposal.proposedCost}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Proposal
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditProposal;
