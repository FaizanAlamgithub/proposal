// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { handleError, handleSuccess } from "../utils";
// import { ToastContainer } from "react-toastify";

// const CreateProposal = () => {

//   const navigate = useNavigate();

//   const [proposal, setProposal] = useState({
//     companyName: "",
//     clientName: "",
//     expiryDate: "",
//     proposalDescription: "",
//     clientId: "",
//     proposalPassword: "",
//     scopeOfWork: {
//       title: "",
//       objective: "",
//       services: [""],
//       description: [""],
//     },
//     timelineDeliverables: [
//       {
//         week: { week1: "", week2: "" }, // ✅ Fixed structure
//         task: "",
//         deliverables: "",
//       },
//     ],
//     timelineWeeks: {
//       startWeek: "", // ✅ Added start week
//       endWeek: "", // ✅ Added end week
//     },
//     proposedInvestment: [
//       {
//         services: "",
//         description: "",
//         cost: "",
//       },
//     ],
//     proposedCost: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProposal({ ...proposal, [name]: value });
//   };

//   const handleScopeChange = (e, field) => {
//     setProposal({
//       ...proposal,
//       scopeOfWork: { ...proposal.scopeOfWork, [field]: e.target.value },
//     });
//   };

//   // Handle changes in Timeline & Deliverables
//   const handleTimelineChange = (e, timelineIndex, field, weekKey = null) => {
//     setProposal((prev) => {
//       const updatedTimeline = [...prev.timelineDeliverables];
//       if (field === "week" && weekKey) {
//         updatedTimeline[timelineIndex].week[weekKey] = e.target.value;
//       } else {
//         updatedTimeline[timelineIndex][field] = e.target.value;
//       }
//       return { ...prev, timelineDeliverables: updatedTimeline };
//     });
//   };

//   const handleProposedChange = (e, index, field) => {
//     setProposal((prev) => {
//       const updatedProposed = [...prev.proposedInvestment];

//       if (field === "Services") {
//         updatedProposed[index] = e.target.value;
//       } else if (updatedProposed[index]) {
//         updatedProposed[index] = {
//           ...updatedProposed[index],
//           [field]: e.target.value,
//         };
//       }

//       return { ...prev, proposedInvestment: updatedProposed };
//     });
//   };

//   // Add a new Timeline & Deliverables section
//   const addTimeline = () => {
//     setProposal((prev) => ({
//       ...prev,
//       timelineDeliverables: [
//         ...prev.timelineDeliverables,
//         { week: { week1: "", week2: "" }, task: "", deliverables: "" },
//       ],
//     }));
//   };

//   // Add a new Proposed Investment section
//   const addProposed = () => {
//     setProposal((prev) => ({
//       ...prev,
//       proposedInvestment: [
//         ...prev.proposedInvestment,
//         { services: "", description: "", cost: "" },
//       ],
//     }));
//   };

//   // Remove a Timeline & Deliverables section
//   const removeTimeline = (timelineIndex) => {
//     setProposal((prev) => {
//       const updatedTimeline = prev.timelineDeliverables.filter(
//         (_, index) => index !== timelineIndex
//       );
//       return { ...prev, timelineDeliverables: updatedTimeline };
//     });
//   };

//   // Remove a Proposed Investment section
//   const removeProposed = (Index) => {
//     setProposal((prev) => {
//       const updatedProposed = prev.proposedInvestment.filter(
//         (_, index) => index !== Index
//       );
//       return { ...prev, proposedInvestment: updatedProposed };
//     });
//   };

//   const handleArrayChange = (e, field, index) => {
//     const newArray = [...proposal.scopeOfWork[field]];
//     newArray[index] = e.target.value;
//     setProposal({
//       ...proposal,
//       scopeOfWork: { ...proposal.scopeOfWork, [field]: newArray },
//     });
//   };

//   const addArrayField = (field) => {
//     setProposal({
//       ...proposal,
//       scopeOfWork: {
//         ...proposal.scopeOfWork,
//         [field]: [...proposal.scopeOfWork[field], ""],
//       },
//     });
//   };

//   const removeArrayField = (field, index) => {
//     const newArray = [...proposal.scopeOfWork[field]];
//     newArray.splice(index, 1);
//     setProposal({
//       ...proposal,
//       scopeOfWork: { ...proposal.scopeOfWork, [field]: newArray },
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "https://proposal-backend-1dom.onrender.com/api/proposals/create",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(proposal),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to create proposal");
//       }

//       handleSuccess("Proposal Created Successfully!");
//       setTimeout(() => navigate("/dashboard"), 1000);
//     } catch (error) {
//       handleError(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full relative">
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="btn btn-close position-absolute top-0 end-0 m-3"
//           aria-label="Close"
//         ></button>

//         <h2 className="text-2xl font-semibold text-center mb-4">
//           Create Proposal
//         </h2>

//         <div className="overflow-y-auto p-4 border border-gray-300 rounded-lg max-h-[80vh]">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="col">
//               <h3 className="text-lg font-semibold">Client detail</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {[
//                   { label: "Company Name", name: "companyName" },
//                   { label: "Client Name", name: "clientName" },
//                 ].map(({ label, name }) => (
//                   <div key={name}>
//                     <label className="block text-gray-700 font-medium">
//                       {label}
//                     </label>
//                     <input
//                       type="text"
//                       name={name}
//                       value={proposal[name] || ""}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {[
//                   { label: "Expiry Date", name: "expiryDate", type: "date" },
//                   { label: "Client ID", name: "clientId", type: "text" },
//                 ].map(({ label, name, type }) => (
//                   <div key={name}>
//                     <label className="block text-gray-700 font-medium mt-4">
//                       {label}
//                     </label>
//                     <input
//                       type={type}
//                       name={name}
//                       value={proposal[name] || ""}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-medium mt-4">
//                   Proposal Description
//                 </label>
//                 <textarea
//                   name="proposalDescription"
//                   value={proposal.proposalDescription || ""}
//                   onChange={handleChange}
//                   className="w-full h-[25vh] p-2 border rounded-md focus:ring focus:ring-blue-300"
//                   required
//                 />
//               </div>

//               {/* Timeline & Deliverables */}
//               <h3 className="text-lg font-semibold">Timeline & Deliverables</h3>
//               {/* Timeline Weeks Input */}
//               <div className="mt-2 flex gap-4">
//                 <label className="font-medium">Weeks</label>
//                 <input
//                   type="number"
//                   placeholder="Start"
//                   value={proposal.timelineWeeks.startWeek}
//                   onChange={(e) =>
//                     setProposal({
//                       ...proposal,
//                       timelineWeeks: {
//                         ...proposal.timelineWeeks,
//                         startWeek: e.target.value,
//                       },
//                     })
//                   }
//                   className="p-2 border rounded-md w-20"
//                 />
//                 <input
//                   type="number"
//                   placeholder="End"
//                   value={proposal.timelineWeeks.endWeek}
//                   onChange={(e) =>
//                     setProposal({
//                       ...proposal,
//                       timelineWeeks: {
//                         ...proposal.timelineWeeks,
//                         endWeek: e.target.value,
//                       },
//                     })
//                   }
//                   className="p-2 border rounded-md w-20"
//                 />
//               </div>
//               {proposal.timelineDeliverables.map((timeline, timelineIndex) => (
//                 <div
//                   key={timelineIndex}
//                   className="border p-4 rounded-md space-y-3"
//                 >
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block font-medium">Task</label>
//                       <textarea
//                         type="text"
//                         value={timeline.task}
//                         onChange={(e) =>
//                           handleTimelineChange(e, timelineIndex, "task")
//                         }
//                         className="w-full p-2 border rounded-md h-[25vh]"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block font-medium">Deliverables</label>
//                       <textarea
//                         type="text"
//                         value={timeline.deliverables}
//                         onChange={(e) =>
//                           handleTimelineChange(e, timelineIndex, "deliverables")
//                         }
//                         className="w-full p-2 border rounded-md h-[25vh]"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Weeks */}
//                   <div className="mt-2">
//                     <h4 className="font-medium">Weeks</h4>
//                     {Object.entries(timeline.week).map(
//                       ([weekKey, value], weekIndex) => (
//                         <div key={weekIndex} className="flex gap-4 mt-1">
//                           <label className="font-medium">{weekKey}</label>
//                           <input
//                             type="number"
//                             placeholder={`Value for ${weekKey}`}
//                             value={value}
//                             onChange={(e) =>
//                               handleTimelineChange(
//                                 e,
//                                 timelineIndex,
//                                 "week",
//                                 weekKey
//                               )
//                             }
//                             className="p-2 border rounded-md w-24"
//                             required
//                           />
//                         </div>
//                       )
//                     )}
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeTimeline(timelineIndex)}
//                     className="mt-2 p-1 bg-red-500 text-white rounded"
//                   >
//                     Remove Timeline & Deliverables
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addTimeline}
//                 className="mt-4 p-2 bg-blue-500 text-white rounded-md"
//               >
//                 Add Timeline & Deliverables
//               </button>
//             </div>
//             <div className="col">
//               {/* Proposed Investment */}
//               <h3 className="text-lg font-semibold">Proposed Investment</h3>
//               {/* Timeline Weeks Input */}
//               <div className="mt-2 flex gap-4 items-center">
//                 <label className="font-medium">Cost</label>
//                 <input
//                   type="number"
//                   placeholder="Enter cost"
//                   value={proposal.proposedCost || ""}
//                   onChange={(e) =>
//                     setProposal({
//                       ...proposal,
//                       proposedCost: e.target.value,
//                     })
//                   }
//                   className="p-2 border rounded-md w-30"
//                 />
//               </div>
//               {proposal.proposedInvestment.map((proposed, Index) => (
//                 <div key={Index} className="border p-4 rounded-md space-y-3">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block font-medium">Services</label>
//                       <textarea
//                         type="text"
//                         value={proposed.services}
//                         onChange={(e) =>
//                           handleProposedChange(e, Index, "services")
//                         }
//                         className="w-full p-2 border rounded-md h-[25vh]"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block font-medium">Description</label>
//                       <textarea
//                         type="text"
//                         value={proposed.description}
//                         onChange={(e) =>
//                           handleProposedChange(e, Index, "description")
//                         }
//                         className="w-full p-2 border rounded-md h-[25vh]"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block font-medium">Cost </label>
//                       <textarea
//                         type="text"
//                         value={proposed.cost}
//                         onChange={(e) => handleProposedChange(e, Index, "cost")}
//                         className="w-full p-2 border rounded-md h-[25vh]"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeProposed(Index)}
//                     className="mt-2 p-1 bg-red-500 text-white rounded"
//                   >
//                     Remove Proposed Investment
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addProposed}
//                 className="mt-4 p-2 bg-blue-500 text-white rounded-md"
//               >
//                 Add Proposed Investment
//               </button>
//             </div>

//             <div className="col">
//               <h3 className="text-lg font-semibold">Scope of Work</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {[
//                   { label: "Title", key: "title" },
//                   { label: "Objective", key: "objective" },
//                 ].map(({ label, key }) => (
//                   <div key={key}>
//                     <label className="block text-gray-700 font-medium">
//                       {label}
//                     </label>
//                     <textarea
//                       type="text"
//                       value={proposal.scopeOfWork?.[key] || ""}
//                       onChange={(e) => handleScopeChange(e, key)}
//                       className="w-full h-[20vh]  p-2 border rounded-md focus:ring focus:ring-blue-300"
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div className="flex gap-8">
//                 {[
//                   { title: "Services", key: "services" },
//                   { title: "Description", key: "description" },
//                 ].map(({ title, key }) => (
//                   <div key={key}>
//                     <h4 className="font-medium mt-4">{title}</h4>
//                     <div className="space-y-2">
//                       {proposal.scopeOfWork?.[key]?.map((item, index) => (
//                         <div key={index} className="flex items-center gap-2">
//                           <textarea
//                             type="text"
//                             placeholder={title.slice(0, -1)}
//                             value={item}
//                             onChange={(e) => handleArrayChange(e, key, index)}
//                             className="w-[40vw] h-[20vh] p-2 border rounded-md focus:ring focus:ring-blue-300"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeArrayField(key, index)}
//                             className="bg-red-200 px-2 py-1 rounded"
//                           >
//                             <i className="bi bi-trash text-danger"></i>
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => addArrayField(key)}
//                       className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                     >
//                       + Add {title.slice(0, -1)}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-25 mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//             >
//               Create Proposal
//             </button>
//           </form>
//           <ToastContainer />
//         </div>
//       </div>
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
    timelineDeliverables: [
      {
        week: { week1: "", week2: "" }, // ✅ Fixed structure
        task: "",
        deliverables: "",
      },
    ],
    timelineWeeks: {
      startWeek: "", // ✅ Added start week
      endWeek: "", // ✅ Added end week
    },
    proposedInvestment: [
      {
        services: "",
        description: "",
        cost: "",
      },
    ],
    proposedCost: "",
    payments: [
      {
        terms: "",
        amount: "",
      },
    ],
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

  // const handleTimelineChange = (e, field, weekIndex = null, key = null) => {
  //   if (field === "week") {
  //     // Create a deep copy of the week array
  //     const newWeeks = proposal.timelineDeliverables.week.map((week, idx) =>
  //       idx === weekIndex ? { ...week, [key]: e.target.value } : week
  //     );

  //     setProposal((prevProposal) => ({
  //       ...prevProposal,
  //       timelineDeliverables: {
  //         ...prevProposal.timelineDeliverables,
  //         week: newWeeks,
  //       },
  //     }));
  //   } else {
  //     setProposal((prevProposal) => ({
  //       ...prevProposal,
  //       timelineDeliverables: {
  //         ...prevProposal.timelineDeliverables,
  //         [field]: e.target.value,
  //       },
  //     }));
  //   }
  // };

  // Handle changes in Timeline & Deliverables
  const handleTimelineChange = (e, timelineIndex, field, weekKey = null) => {
    setProposal((prev) => {
      const updatedTimeline = [...prev.timelineDeliverables];
      if (field === "week" && weekKey) {
        updatedTimeline[timelineIndex].week[weekKey] = e.target.value;
      } else {
        updatedTimeline[timelineIndex][field] = e.target.value;
      }
      return { ...prev, timelineDeliverables: updatedTimeline };
    });
  };

  const handleProposedChange = (e, index, field) => {
    setProposal((prev) => {
      const updatedProposed = [...prev.proposedInvestment];

      if (field === "Services") {
        updatedProposed[index] = e.target.value;
      } else if (updatedProposed[index]) {
        updatedProposed[index] = {
          ...updatedProposed[index],
          [field]: e.target.value,
        };
      }

      return { ...prev, proposedInvestment: updatedProposed };
    });
  };

  const handlePaymentsChange = (e, index, field) => {
    setProposal((prev) => {
      const updatedPayments = [...prev.payments];

      if (field === "Terms") {
        updatedPayments[index] = e.target.value;
      } else if (updatedPayments[index]) {
        updatedPayments[index] = {
          ...updatedPayments[index],
          [field]: e.target.value,
        };
      }

      return { ...prev, payments: updatedPayments };
    });
  };

  // Add a new Timeline & Deliverables section
  const addTimeline = () => {
    setProposal((prev) => ({
      ...prev,
      timelineDeliverables: [
        ...prev.timelineDeliverables,
        { week: { week1: "", week2: "" }, task: "", deliverables: "" },
      ],
    }));
  };

  // Add a new Proposed Investment section
  const addProposed = () => {
    setProposal((prev) => ({
      ...prev,
      proposedInvestment: [
        ...prev.proposedInvestment,
        { services: "", description: "", cost: "" },
      ],
    }));
  };

  // Add a new Payments Terms section
  const addPayments = () => {
    setProposal((prev) => ({
      ...prev,
      payments: [...prev.payments, { terms: "", amount: "" }],
    }));
  };

  // Remove a Timeline & Deliverables section
  const removeTimeline = (timelineIndex) => {
    setProposal((prev) => {
      const updatedTimeline = prev.timelineDeliverables.filter(
        (_, index) => index !== timelineIndex
      );
      return { ...prev, timelineDeliverables: updatedTimeline };
    });
  };

  // Remove a Payments Terms section
  const removePayments = (Index) => {
    setProposal((prev) => {
      const updatedPayments = prev.payments.filter(
        (_, index) => index !== Index
      );
      return { ...prev, payments: updatedPayments };
    });
  };

  // Remove a Proposed Investment section
  const removeProposed = (Index) => {
    setProposal((prev) => {
      const updatedProposed = prev.proposedInvestment.filter(
        (_, index) => index !== Index
      );
      return { ...prev, proposedInvestment: updatedProposed };
    });
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
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-[#ECEDEF] rounded-lg w-full relative">
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
        ></button>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Proposal
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
                  className="w-full h-[25vh] p-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                />
              </div>
            </div>
            <div className="col bg-white p-4 border border-gray-300 rounded-lg m-3">
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
                      onChange={(e) => handleScopeChange(e, key)}
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
            </div>
            <div className="col bg-white p-4 border border-gray-300 rounded-lg m-3">
              {/* Timeline & Deliverables */}
              <h3 className="text-lg font-semibold">Timeline & Deliverables</h3>
              {/* Timeline Weeks Input */}
              <div className="mt-2 flex gap-4">
                <label className="font-medium">Weeks</label>
                <input
                  type="number"
                  placeholder="Start"
                  value={proposal.timelineWeeks.startWeek}
                  onChange={(e) =>
                    setProposal({
                      ...proposal,
                      timelineWeeks: {
                        ...proposal.timelineWeeks,
                        startWeek: e.target.value,
                      },
                    })
                  }
                  className="p-2 border rounded-md w-20"
                />
                <input
                  type="number"
                  placeholder="End"
                  value={proposal.timelineWeeks.endWeek}
                  onChange={(e) =>
                    setProposal({
                      ...proposal,
                      timelineWeeks: {
                        ...proposal.timelineWeeks,
                        endWeek: e.target.value,
                      },
                    })
                  }
                  className="p-2 border rounded-md w-20"
                />
              </div>
              {proposal.timelineDeliverables.map((timeline, timelineIndex) => (
                <div
                  key={timelineIndex}
                  className="border p-4 rounded-md space-y-3"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Task</label>
                      <textarea
                        type="text"
                        value={timeline.task}
                        onChange={(e) =>
                          handleTimelineChange(e, timelineIndex, "task")
                        }
                        className="w-full p-2 border rounded-md h-[25vh]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Deliverables</label>
                      <textarea
                        type="text"
                        value={timeline.deliverables}
                        onChange={(e) =>
                          handleTimelineChange(e, timelineIndex, "deliverables")
                        }
                        className="w-full p-2 border rounded-md h-[25vh]"
                        required
                      />
                    </div>
                  </div>

                  {/* Weeks */}
                  <div className="mt-2">
                    <h4 className="font-medium">Weeks</h4>
                    {Object.entries(timeline.week).map(
                      ([weekKey, value], weekIndex) => (
                        <div key={weekIndex} className="flex gap-4 mt-1">
                          <label className="font-medium">{weekKey}</label>
                          <input
                            type="number"
                            placeholder={`Value for ${weekKey}`}
                            value={value}
                            onChange={(e) =>
                              handleTimelineChange(
                                e,
                                timelineIndex,
                                "week",
                                weekKey
                              )
                            }
                            className="p-2 border rounded-md w-24"
                            required
                          />
                        </div>
                      )
                    )}
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
              <button
                type="button"
                onClick={addTimeline}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md"
              >
                Add Timeline & Deliverables
              </button>
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
              {proposal.proposedInvestment.map((proposed, Index) => (
                <div key={Index} className="border p-4 rounded-md space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Services</label>
                      <textarea
                        type="text"
                        value={proposed.services}
                        onChange={(e) =>
                          handleProposedChange(e, Index, "services")
                        }
                        className="w-full p-2 border rounded-md h-[25vh]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Description</label>
                      <textarea
                        type="text"
                        value={proposed.description}
                        onChange={(e) =>
                          handleProposedChange(e, Index, "description")
                        }
                        className="w-full p-2 border rounded-md h-[25vh]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Cost </label>
                      <textarea
                        type="text"
                        value={proposed.cost}
                        onChange={(e) => handleProposedChange(e, Index, "cost")}
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
              <button
                type="button"
                onClick={addProposed}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md"
              >
                Add Proposed Investment
              </button>
            </div>
            <div className="col bg-white p-4 border border-gray-300 rounded-lg m-3">
              <h3 className="text-lg font-semibold">Payments Terms</h3>
              {proposal.payments.map((proposed, Index) => (
                <div key={Index} className="border p-4 rounded-md space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Terms</label>
                      <textarea
                        type="text"
                        value={proposed.terms}
                        onChange={(e) =>
                          handlePaymentsChange(e, Index, "terms")
                        }
                        className="w-full p-2 border rounded-md h-[25vh]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Amount</label>
                      <textarea
                        type="text"
                        value={proposed.amount}
                        onChange={(e) =>
                          handlePaymentsChange(e, Index, "amount")
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
              <button
                type="button"
                onClick={addPayments}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md"
              >
                Add Payments Terms
              </button>
            </div>

            <button
              type="submit"
              className="w-25 m-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
