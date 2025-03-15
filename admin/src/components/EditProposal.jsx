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
      {
        week: { week1: "", week2: "" }, // ✅ Fixed structure
        task: "",
        deliverables: "",
      },
    ],
    timelineWeeks: { startWeek: "", endWeek: "" },
    proposedInvestment: [{ services: "", description: "", cost: "" }],
    proposedCost: "",
    payments: [
      {
        terms: "",
        amount: "",
      },
    ],
  });

  // Fetch existing proposal data
  useEffect(() => {
    fetch(`https://proposal-backend-1dom.onrender.com/api/proposals/${id}`)
      .then((response) => response.json())
      .then((data) => setProposal(data))
      .catch((error) => console.error("Error fetching proposal:", error));
  }, [id]);

  // Handle input changes
  const handleChange = (e, field, subField = null) => {
    const { value } = e.target;

    setProposal((prev) => {
      if (subField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subField]: value,
          },
        };
      } else {
        return {
          ...prev,
          [field]: value,
        };
      }
    });
  };

  const handleTimelineChange = (e, timelineIndex, field) => {
    const { value } = e.target; // Get the input value

    setProposal((prev) => ({
      ...prev,
      timelineDeliverables: prev.timelineDeliverables.map((item, index) =>
        index === timelineIndex ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleInvestmentChange = (e, investmentIndex, field) => {
    const { value } = e.target; // Get the input value

    setProposal((prev) => ({
      ...prev,
      proposedInvestment: prev.proposedInvestment.map((item, index) =>
        index === investmentIndex ? { ...item, [field]: value } : item
      ),
    }));
  };
  const handlePaymentChange = (e, paymentIndex, field) => {
    const { value } = e.target; // Get the input value

    setProposal((prev) => ({
      ...prev,
      payments: prev.payments.map((payment, index) =>
        index === paymentIndex ? { ...payment, [field]: value } : payment
      ),
    }));
  };

  // Handle nested object updates (e.g., scopeOfWork)
  const handleNestedChange = (e, category, field) => {
    setProposal((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: e.target.value },
    }));
  };
  // const handleWeekChange = (value, weekKey) => {
  //   setProposal((prev) => ({
  //     ...prev,
  //     timelineDeliverables: prev.timelineDeliverables.map((item, index) =>
  //       index === 0 // ✅ Updating the first timelineDeliverables object
  //         ? { ...item, week: { ...item.week, [weekKey]: value } }
  //         : item
  //     ),
  //   }));
  // };

  const handleWeekChange = (value, timelineIndex, weekKey) => {
    setProposal((prev) => ({
      ...prev,
      timelineDeliverables: prev.timelineDeliverables.map((item, index) =>
        index === timelineIndex // ✅ Updating the correct timelineDeliverables object
          ? { ...item, week: { ...item.week, [weekKey]: value } }
          : item
      ),
    }));
  };

  // Handle array updates (e.g., services in scopeOfWork)
  const handleArrayChange = (e, category, field, index) => {
    setProposal((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]:
          prev[category]?.[field]?.map((item, i) =>
            i === index ? e.target.value : item
          ) || [],
      },
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
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-[#ECEDEF] rounded-lg w-full relative">
        {" "}
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
        ></button>
        <h2 className="text-2xl font-semibold text-center mb-2">
          Edit Proposal
        </h2>
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="px-5 max-h-[95vh] overflow-y-auto"
          >
            <div className="col bg-white p-4 border border-gray-300 rounded-lg m-3">
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
                      onChange={(e) => handleChange(e, name)}
                      className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                      required
                    />
                  </div>
                ))}
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      value={
                        type === "date"
                          ? proposal[name]
                            ? new Date(proposal[name])
                                .toISOString()
                                .split("T")[0] // Convert to "yyyy-MM-dd"
                            : ""
                          : proposal[name] || ""
                      }
                      onChange={(e) => handleChange(e, "expiryDate")}
                      className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                      required
                    />
                  </div>
                ))}
              </div> */}
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
                      value={
                        type === "date"
                          ? proposal[name]
                            ? new Date(proposal[name])
                                .toISOString()
                                .split("T")[0] // Convert to "yyyy-MM-dd"
                            : ""
                          : proposal[name] || ""
                      }
                      onChange={(e) => handleChange(e, name)} // Ensure the correct field is updated
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
                  onChange={(e) => handleChange(e, "proposalDescription")}
                  className="w-full h-[25vh] p-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                />
              </div>
            </div>
            {/* <div className="col bg-white p-4 border border-gray-300 rounded-lg m-3">
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
                    <textarea
                      type="text"
                      value={proposal.scopeOfWork?.[key] || ""}
                      onChange={(e) => handleNestedChange(e, key)}
                      className="w-full h-[20vh]  p-2 border rounded-md focus:ring focus:ring-blue-300"
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
                  <div key={key}>
                    <h4 className="font-medium mt-4">{title}</h4>
                    <div className="space-y-2">
                      {proposal.scopeOfWork?.[key]?.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <textarea
                            type="text"
                            placeholder={title.slice(0, -1)}
                            value={item}
                            onChange={(e) => handleArrayChange(e, key, index)}
                            className="w-[40vw] h-[20vh] p-2 border rounded-md focus:ring focus:ring-blue-300"
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
            </div> */}

            <div className="col bg-white p-4 border border-gray-300 rounded-lg m-3">
              <h3 className="text-lg font-semibold">Scope of Work</h3>

              {/* Editable Fields for Title and Objective */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Title", key: "title" },
                  { label: "Objective", key: "objective" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-gray-700 font-medium">
                      {label}
                    </label>
                    <textarea
                      value={proposal.scopeOfWork?.[key] || ""}
                      onChange={(e) =>
                        handleNestedChange(e, "scopeOfWork", key)
                      }
                      className="w-full h-[20vh] p-2 border rounded-md focus:ring focus:ring-blue-300"
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Editable List for Services and Description */}
              <div className="flex gap-8">
                {[
                  { title: "Services", key: "services" },
                  { title: "Description", key: "description" },
                ].map(({ title, key }) => (
                  <div key={key}>
                    <h4 className="font-medium mt-4">{title}</h4>
                    <div className="space-y-2">
                      {proposal.scopeOfWork?.[key]?.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <textarea
                            placeholder={title}
                            value={item}
                            onChange={(e) =>
                              handleArrayChange(e, "scopeOfWork", key, index)
                            }
                            className="w-[40vw] h-[20vh] p-2 border rounded-md focus:ring focus:ring-blue-300"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayField("scopeOfWork", key, index)
                            }
                            className="bg-red-200 px-2 py-1 rounded"
                          >
                            <i className="bi bi-trash text-danger"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addArrayField("scopeOfWork", key)}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      + Add {title}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="col bg-white p-4 border border-gray-300 rounded-lg m-3">
              {/* Timeline & Deliverables */}
              <h3 className="text-lg font-semibold">Timeline & Deliverables</h3>

              {/* Timeline Weeks Input */}
              <div className="mt-2 flex items-center gap-4">
                <label className="font-medium">Weeks</label>
                <input
                  type="number"
                  placeholder="Start"
                  value={proposal.timelineWeeks?.startWeek || ""}
                  onChange={(e) =>
                    setProposal((prev) => ({
                      ...prev,
                      timelineWeeks: {
                        ...prev.timelineWeeks,
                        startWeek: e.target.value,
                      },
                    }))
                  }
                  className="p-2 border rounded-md w-20"
                />
                <input
                  type="number"
                  placeholder="End"
                  value={proposal.timelineWeeks?.endWeek || ""}
                  onChange={(e) =>
                    setProposal((prev) => ({
                      ...prev,
                      timelineWeeks: {
                        ...prev.timelineWeeks,
                        endWeek: e.target.value,
                      },
                    }))
                  }
                  className="p-2 border rounded-md w-20"
                />
              </div>

              {proposal.timelineDeliverables?.map((timeline, timelineIndex) => (
                <div
                  key={timelineIndex}
                  className="border p-4 rounded-md space-y-3"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {/* Editable Task Field */}
                    <div>
                      <label className="block font-medium">Task</label>
                      <textarea
                        value={timeline.task || ""}
                        onChange={(e) =>
                          handleTimelineChange(e, timelineIndex, "task")
                        }
                        className="w-full p-2 border rounded-md h-[25vh]"
                        required
                      />
                    </div>

                    {/* Editable Deliverables Field */}
                    <div>
                      <label className="block font-medium">Deliverables</label>
                      <textarea
                        value={timeline.deliverables || ""}
                        onChange={(e) =>
                          handleTimelineChange(e, timelineIndex, "deliverables")
                        }
                        className="w-full p-2 border rounded-md h-[25vh]"
                        required
                      />
                    </div>
                  </div>

                  {/* Weeks Input */}
                  <div className="mt-2 flex items-center gap-4">
                    <label className="font-medium">Weeks</label>
                    <input
                      type="number"
                      placeholder="Week 1"
                      value={timeline.week?.week1 || ""}
                      onChange={(e) =>
                        handleWeekChange(e.target.value, timelineIndex, "week1")
                      }
                      className="p-2 border rounded-md w-20"
                    />
                    <input
                      type="number"
                      placeholder="Week 2"
                      value={timeline.week?.week2 || ""}
                      onChange={(e) =>
                        handleWeekChange(e.target.value, timelineIndex, "week2")
                      }
                      className="p-2 border rounded-md w-20"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeTimeline(timelineIndex)}
                    className="mt-2 p-1 bg-red-500 text-white rounded"
                  >
                    Remove Timeline & Deliverables
                  </button>
                </div>
              ))}
            </div>

            <div className="col bg-white p-4 border border-gray-300 rounded-lg m-3">
              {/* Proposed Investment */}
              <h3 className="text-lg font-semibold">Proposed Investment</h3>
              {/* Timeline Weeks Input */}
              <div className="mt-2 flex gap-4 items-center">
                <label className="font-medium">Cost</label>
                <input
                  type="number"
                  placeholder="Enter cost"
                  value={proposal.proposedCost || ""}
                  onChange={(e) =>
                    setProposal({
                      ...proposal,
                      proposedCost: e.target.value,
                    })
                  }
                  className="p-2 border rounded-md w-30"
                />
              </div>
              {proposal.proposedInvestment.map((investment, Index) => (
                <div key={Index} className="border p-4 rounded-md space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Services</label>
                      <textarea
                        type="text"
                        value={investment.services}
                        onChange={(e) =>
                          handleInvestmentChange(e, Index, "services")
                        }
                        className="w-full p-2 border rounded-md h-[25vh]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Description</label>
                      <textarea
                        type="text"
                        value={investment.description}
                        onChange={(e) =>
                          handleInvestmentChange(e, Index, "description")
                        }
                        className="w-full p-2 border rounded-md h-[25vh]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Cost </label>
                      <textarea
                        type="text"
                        value={investment.cost || ""}
                        onChange={(e) =>
                          handleInvestmentChange(e, Index, "cost")
                        }
                        className="w-full p-2 border rounded-md h-[25vh]"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProposed(Index)}
                    className="mt-2 p-1 bg-red-500 text-white rounded"
                  >
                    Remove Proposed Investment
                  </button>
                </div>
              ))}
            </div>
            <div className="col bg-white p-4 border border-gray-300 rounded-lg m-3">
              <h3 className="text-lg font-semibold">Payments Terms</h3>
              {proposal.payments.map((payment, Index) => (
                <div key={Index} className="border p-4 rounded-md space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Terms</label>
                      <textarea
                        type="text"
                        value={payment.terms || ""}
                        onChange={(e) => handlePaymentChange(e, Index, "terms")}
                        className="w-full p-2 border rounded-md h-[25vh]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Amount</label>
                      <textarea
                        type="text"
                        value={payment.amount || ""}
                        onChange={(e) =>
                          handlePaymentChange(e, Index, "amount")
                        }
                        className="w-full p-2 border rounded-md h-[25vh]"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePayments(Index)}
                    className="mt-2 p-1 bg-red-500 text-white rounded"
                  >
                    Remove Payments Terms
                  </button>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-25 m-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Update Proposal
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default EditProposal;
