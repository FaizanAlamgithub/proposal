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
//     <div className="flex items-center justify-center bg-green-50 p-4">
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
//                 className="mt-4 p-2 bg-green-500 text-white rounded-md"
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
//                 className="mt-4 p-2 bg-green-500 text-white rounded-md"
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
//                       className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
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

// import React, { useState } from "react";
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
//     scopeOfWork: {
//       title: "",
//       objective: "",
//       services: [""],
//       description: [""],
//     },
//     timelineDeliverables: [
//       {
//         timelineText: "",
//         task: "",
//         deliverables: "",
//       },
//     ],
//     timelineWeeks: {
//       timeLine: "",
//     },
//     proposedInvestment: [
//       {
//         services: "",
//         description: "",
//         cost: "",
//       },
//     ],
//     proposedCost: "",
//     payments: [
//       {
//         terms: "",
//         amount: "",
//       },
//     ],
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

//   const handleTimelineChange = (e, timelineIndex, field) => {
//     setProposal((prev) => {
//       const updatedTimeline = [...prev.timelineDeliverables];

//       // Update the field directly as a string instead of treating "week" as an array
//       updatedTimeline[timelineIndex][field] = e.target.value;

//       return { ...prev, timelineDeliverables: updatedTimeline };
//     });
//   };

//   // const handleTimelineChange = (e, timelineIndex, field, weekKey = null) => {
//   //   setProposal((prev) => {
//   //     const updatedTimeline = [...prev.timelineDeliverables];
//   //     if (field === "week" && weekKey) {
//   //       updatedTimeline[timelineIndex].week[weekKey] = e.target.value;
//   //     } else {
//   //       updatedTimeline[timelineIndex][field] = e.target.value;
//   //     }
//   //     return { ...prev, timelineDeliverables: updatedTimeline };
//   //   });
//   // };

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

//   const handlePaymentsChange = (e, index, field) => {
//     setProposal((prev) => {
//       const updatedPayments = [...prev.payments];

//       if (field === "Terms") {
//         updatedPayments[index] = e.target.value;
//       } else if (updatedPayments[index]) {
//         updatedPayments[index] = {
//           ...updatedPayments[index],
//           [field]: e.target.value,
//         };
//       }

//       return { ...prev, payments: updatedPayments };
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

//   // Add a new Payments Terms section
//   const addPayments = () => {
//     setProposal((prev) => ({
//       ...prev,
//       payments: [...prev.payments, { terms: "", amount: "" }],
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

//   // Remove a Payments Terms section
//   const removePayments = (Index) => {
//     setProposal((prev) => {
//       const updatedPayments = prev.payments.filter(
//         (_, index) => index !== Index
//       );
//       return { ...prev, payments: updatedPayments };
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
//     <div className="flex items-center justify-center bg-green-50">
//       <div className="bg-[#ECEDEF] rounded w-full relative">
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="btn btn-close position-absolute top-0 end-0 m-3"
//           aria-label="Close"
//         ></button>

//         <h2 className="text-2xl font-semibold text-center mb-2">
//           Create Proposal
//         </h2>

//         <div className="">
//           <form
//             onSubmit={handleSubmit}
//             className="px-3 max-h-[95vh] overflow-y-auto"
//           >
//             <div className="col bg-white p-4 m-0 sm:p-4 sm:m-3 border border-gray-300 rounded">
//               <h3 className="text-lg font-semibold">Client detail</h3>
//               {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
//               </div> */}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-700 font-medium">
//                     Company Name
//                   </label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={proposal.companyName || ""}
//                     onChange={(e) => {
//                       const words = e.target.value.trim().split(/\s+/);
//                       if (words.length <= 5) {
//                         handleChange(e);
//                       }
//                     }}
//                     className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
//                     required
//                   />
//                   <p className="text-sm text-gray-500">
//                     {proposal.companyName
//                       ? proposal.companyName.trim().split(/\s+/).length
//                       : 0}{" "}
//                     / 5 words
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium">
//                     Client Name
//                   </label>
//                   <input
//                     type="text"
//                     name="clientName"
//                     value={proposal.clientName || ""}
//                     onChange={(e) => {
//                       const words = e.target.value.trim().split(/\s+/);
//                       if (words.length <= 5) {
//                         handleChange(e);
//                       }
//                     }}
//                     className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
//                     required
//                   />
//                   <p className="text-sm text-gray-500">
//                     {proposal.clientName
//                       ? proposal.clientName.trim().split(/\s+/).length
//                       : 0}{" "}
//                     / 5 words
//                   </p>
//                 </div>
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
//                       className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div>
//                 {/* <label className="block text-gray-700 font-medium mt-4">
//                   Proposal Description
//                 </label>
//                 <textarea
//                   name="proposalDescription"
//                   value={proposal.proposalDescription || ""}
//                   onChange={handleChange}
//                   className="w-full h-[25vh] p-2 border rounded-md focus:ring focus:ring-blue-300"
//                   required
//                 /> */}
//                 <label className="block text-gray-700 font-medium mt-4">
//                   Proposal Description
//                 </label>
//                 <textarea
//                   name="proposalDescription"
//                   value={proposal.proposalDescription || ""}
//                   onChange={(e) => {
//                     const words = e.target.value.trim().split(/\s+/);
//                     if (words.length <= 16) {
//                       handleChange(e);
//                     }
//                   }}
//                   className="w-full h-[25vh] p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
//                   required
//                 />
//                 <p className="text-sm text-gray-500">
//                   {proposal.proposalDescription
//                     ? proposal.proposalDescription.trim().split(/\s+/).length
//                     : 0}
//                   /16 words
//                 </p>
//               </div>
//             </div>
//             <div className="col bg-white p-4 m-0 sm:p-4 sm:m-3 border border-gray-300 rounded">
//               <h3 className="text-lg font-semibold">Scope of Work</h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Title Input */}
//                 <div>
//                   <label className="block text-gray-700 font-medium mt-4">
//                     Title
//                   </label>
//                   <textarea
//                     name="title"
//                     value={proposal.scopeOfWork?.title || ""}
//                     onChange={(e) => {
//                       const words = e.target.value.trim().split(/\s+/);
//                       if (words.length <= 15) {
//                         handleScopeChange(e, "title");
//                       }
//                     }}
//                     className="w-full h-[20vh] p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
//                     required
//                   />
//                   <p className="text-sm text-gray-500">
//                     {proposal.scopeOfWork?.title
//                       ? proposal.scopeOfWork?.title.trim().split(/\s+/).length
//                       : 0}
//                     /15 words
//                   </p>
//                 </div>

//                 {/* Objective Input */}
//                 <div>
//                   <label className="block text-gray-700 font-medium mt-4">
//                     Objective
//                   </label>
//                   <textarea
//                     name="objective"
//                     value={proposal.scopeOfWork?.objective || ""}
//                     onChange={(e) => {
//                       const words = e.target.value.trim().split(/\s+/);
//                       if (words.length <= 40) {
//                         handleScopeChange(e, "objective");
//                       }
//                     }}
//                     className="w-full h-[20vh] p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
//                     required
//                   />
//                   <p className="text-sm text-gray-500">
//                     {proposal.scopeOfWork?.objective
//                       ? proposal.scopeOfWork?.objective.trim().split(/\s+/)
//                           .length
//                       : 0}
//                     /40 words
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-8">
//                 {/* {[
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
//                       className="mt-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-black"
//                     >
//                       + Add {title.slice(0, -1)}
//                     </button>
//                   </div>
//                 ))} */}
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Services Input */}
//                 <div>
//                   <h4 className="font-medium mt-4">Services</h4>
//                   <div className="space-y-2">
//                     {proposal.scopeOfWork?.services?.map((item, index) => (
//                       <div key={index} className="flex items-center gap-2">
//                         <textarea
//                           type="text"
//                           placeholder="Service"
//                           value={item}
//                           onChange={(e) => {
//                             const words = e.target.value.trim().split(/\s+/);
//                             if (words.length <= 10) {
//                               handleArrayChange(e, "services", index);
//                             }
//                           }}
//                           className="w-full h-[20vh] p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeArrayField("services", index)}
//                           className="bg-red-200 px-2 py-1 rounded"
//                         >
//                           <i className="bi bi-trash text-danger"></i>
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                   {/* <p className="text-sm text-gray-500">
//                     {proposal.scopeOfWork?.services?.map(
//                       (item) => item.trim().split(/\s+/).length
//                     ) || 0}{" "}
//                     / 10 words
//                   </p> */}
//                   <p className="text-sm text-gray-500">
//                     {proposal.scopeOfWork?.services?.length
//                       ? proposal.scopeOfWork.services
//                           .map((item) =>
//                             item.trim() ? item.trim().split(/\s+/).length : 0
//                           )
//                           .reduce((a, b) => a + b, 0)
//                       : 0}{" "}
//                     / 10 words
//                   </p>

//                   <button
//                     type="button"
//                     onClick={() => addArrayField("services")}
//                     className="mt-2 px-4 py-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
//                     id="addBtn"
//                   >
//                     + Add Service
//                   </button>
//                 </div>

//                 {/* Description Input */}
//                 <div>
//                   <h4 className="font-medium mt-4">Description</h4>
//                   <div className="space-y-2">
//                     {proposal.scopeOfWork?.description?.map((item, index) => (
//                       <div key={index} className="flex items-center gap-2">
//                         <textarea
//                           type="text"
//                           placeholder="Description"
//                           value={item}
//                           onChange={(e) => {
//                             const words = e.target.value.trim().split(/\s+/);
//                             if (words.length <= 30) {
//                               handleArrayChange(e, "description", index);
//                             }
//                           }}
//                           className="w-full h-[20vh] p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeArrayField("description", index)}
//                           className="bg-red-200 px-2 py-1 rounded"
//                         >
//                           <i className="bi bi-trash text-danger"></i>
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                   {/* <p className="text-sm text-gray-500">
//                     {proposal.scopeOfWork?.description?.map(
//                       (item) => item.trim().split(/\s+/).length
//                     ) || 0}{" "}
//                     / 30 words
//                   </p> */}
//                   <p className="text-sm text-gray-500">
//                     {proposal.scopeOfWork?.description?.length
//                       ? proposal.scopeOfWork.description
//                           .map((item) =>
//                             item.trim() ? item.trim().split(/\s+/).length : 0
//                           )
//                           .reduce((a, b) => a + b, 0) // Sum word counts
//                       : 0}{" "}
//                     / 30 words
//                   </p>
//                   <button
//                     type="button"
//                     onClick={() => addArrayField("description")}
//                     className="mt-2 px-4 py-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
//                     id="addBtn"
//                   >
//                     + Add Description
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="col bg-white p-0 m-0 sm:p-4 sm:m-3 border border-gray-300 rounded">
//               {/* Timeline & Deliverables */}
//               <h3 className="text-lg font-semibold p-4">
//                 Timeline & Deliverables
//               </h3>
//               {/* Timeline Weeks Input */}
//               <div className="mt-2 flex flex-col md:block gap-4 p-4">
//                 {/* <label className="font-medium">Timeline Heading</label>
//                 <input
//                   type="text"
//                   placeholder="Start"
//                   value={proposal.timelineWeeks.timeLine}
//                   onChange={(e) =>
//                     setProposal({
//                       ...proposal,
//                       timelineWeeks: {
//                         ...proposal.timelineWeeks,
//                         startWeek: e.target.value,
//                       },
//                     })
//                   }
//                   className="p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] w-20"
//                 /> */}
//                 <label className="font-medium">Timeline Heading</label>
//                 <input
//                   type="text"
//                   placeholder="Enter timeline"
//                   value={proposal.timelineWeeks.timeLine}
//                   onChange={(e) =>
//                     setProposal({
//                       ...proposal,
//                       timelineWeeks: {
//                         ...proposal.timelineWeeks,
//                         timeLine: e.target.value, // Correct field update
//                       },
//                     })
//                   }
//                   className="p-2 border border-primary-subtle rounded focus:outline-none focus:bg-white focus:ring-0 bg-[#F5FBFF] w-40"
//                 />

//                 {/* <input
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
//                   className="p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] w-20"
//                 /> */}
//               </div>
//               {/* {proposal.timelineDeliverables.map((timeline, timelineIndex) => (
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
//               ))} */}

//               {proposal.timelineDeliverables.map((timeline, timelineIndex) => (
//                 <div
//                   key={timelineIndex}
//                   className="border p-4 rounded-md space-y-3"
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Task Input with Word Limit (10) */}
//                     <div>
//                       <label className="block font-medium">Task</label>
//                       <textarea
//                         name="task"
//                         value={timeline.task}
//                         onChange={(e) => {
//                           const words = e.target.value.trim().split(/\s+/);
//                           if (words.length <= 10) {
//                             handleTimelineChange(e, timelineIndex, "task");
//                           }
//                         }}
//                         className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[25vh]"
//                         required
//                       />
//                       <p className="text-sm text-gray-500">
//                         {timeline.task
//                           ? timeline.task.trim().split(/\s+/).length
//                           : 0}{" "}
//                         / 10 words
//                       </p>
//                     </div>

//                     {/* Deliverables Input with Word Limit (20) */}
//                     <div>
//                       <label className="block font-medium">Deliverables</label>
//                       <textarea
//                         name="deliverables"
//                         value={timeline.deliverables}
//                         onChange={(e) => {
//                           const words = e.target.value.trim().split(/\s+/);
//                           if (words.length <= 20) {
//                             handleTimelineChange(
//                               e,
//                               timelineIndex,
//                               "deliverables"
//                             );
//                           }
//                         }}
//                         className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[25vh]"
//                         required
//                       />
//                       <p className="text-sm text-gray-500">
//                         {timeline.deliverables
//                           ? timeline.deliverables.trim().split(/\s+/).length
//                           : 0}{" "}
//                         / 20 words
//                       </p>
//                     </div>
//                   </div>

//                   {/* Weeks Section */}
//                   <div className="mt-2">
//                     {/* <h4 className="font-medium">Weeks</h4> */}
//                     {/* {Object.entries(timeline.week).map(
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
//                             className="p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] w-24"
//                             required
//                           />
//                         </div>
//                       )
//                     )} */}
//                     <div className="flex items-center gap-4 mt-1">
//                       <label className="font-medium">Timeline</label>
//                       <input
//                         type="text"
//                         placeholder="Enter week range"
//                         value={timeline.timelineText || ""} // ✅ Use "timelineText" directly as a string
//                         onChange={(e) =>
//                           handleTimelineChange(e, timelineIndex, "timelineText")
//                         } // ✅ No need for extra "weeks" key
//                         className="p-2 border border-primary-subtle rounded focus:outline-none focus:bg-white focus:ring-0 bg-[#F5FBFF] w-24"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Remove Button */}
//                   <button
//                     type="button"
//                     onClick={() => removeTimeline(timelineIndex)}
//                     className="mt-2 p-1 bg-red-200 text-red-500 px-2 rounded"
//                   >
//                     Remove Timeline & Deliverables
//                   </button>
//                 </div>
//               ))}

//               <button
//                 type="button"
//                 onClick={addTimeline}
//                 className="m-4 p-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
//                 id="addBtn"
//               >
//                 Add Timeline & Deliverables
//               </button>
//             </div>
//             <div className="col bg-white p-0 m-0 sm:p-4 sm:m-3 border border-gray-300 rounded">
//               {/* Proposed Investment */}
//               <h3 className="text-lg font-semibold p-4">Proposed Investment</h3>
//               {/* Timeline Weeks Input */}
//               <div className="mt-2 flex gap-4 items-center p-4">
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
//                   className="p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] w-30"
//                 />
//               </div>
//               {/* {proposal.proposedInvestment.map((proposed, Index) => (
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
//               ))} */}
//               {proposal.proposedInvestment.map((proposed, Index) => (
//                 <div key={Index} className="border p-4 rounded-md space-y-3">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Services Input with Word Limit (10) */}
//                     <div>
//                       <label className="block font-medium">Services</label>
//                       <textarea
//                         name="services"
//                         value={proposed.services}
//                         onChange={(e) => {
//                           const words = e.target.value.trim().split(/\s+/);
//                           if (words.length <= 10) {
//                             handleProposedChange(e, Index, "services");
//                           }
//                         }}
//                         className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[25vh]"
//                         required
//                       />
//                       <p className="text-sm text-gray-500">
//                         {proposed.services
//                           ? proposed.services.trim().split(/\s+/).length
//                           : 0}{" "}
//                         / 10 words
//                       </p>
//                     </div>

//                     {/* Description Input with Word Limit (20) */}
//                     <div>
//                       <label className="block font-medium">Description</label>
//                       <textarea
//                         name="description"
//                         value={proposed.description}
//                         onChange={(e) => {
//                           const words = e.target.value.trim().split(/\s+/);
//                           if (words.length <= 20) {
//                             handleProposedChange(e, Index, "description");
//                           }
//                         }}
//                         className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[25vh]"
//                         required
//                       />
//                       <p className="text-sm text-gray-500">
//                         {proposed.description
//                           ? proposed.description.trim().split(/\s+/).length
//                           : 0}{" "}
//                         / 20 words
//                       </p>
//                     </div>

//                     {/* Cost Input (No Word Limit) */}
//                     <div>
//                       <label className="block font-medium">Cost</label>
//                       <textarea
//                         name="cost"
//                         value={proposed.cost}
//                         onChange={(e) => handleProposedChange(e, Index, "cost")}
//                         className="w-50 p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[6vh]"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Remove Button */}
//                   <button
//                     type="button"
//                     onClick={() => removeProposed(Index)}
//                     className="mt-2 p-1 bg-red-200 text-red-500 px-2 rounded"
//                   >
//                     Remove Proposed Investment
//                   </button>
//                 </div>
//               ))}

//               <button
//                 type="button"
//                 onClick={addProposed}
//                 className="m-4 p-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
//                 id="addBtn"
//               >
//                 Add Proposed Investment
//               </button>
//             </div>
//             <div className="col bg-white p-0 m-0 sm:p-4 sm:m-3 border border-gray-300 rounded">
//               <h3 className="text-lg font-semibold p-4">Payments Terms</h3>
//               {/* {proposal.payments.map((proposed, Index) => (
//                 <div key={Index} className="border p-4 rounded-md space-y-3">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block font-medium">Terms</label>
//                       <textarea
//                         type="text"
//                         value={proposed.terms}
//                         onChange={(e) =>
//                           handlePaymentsChange(e, Index, "terms")
//                         }
//                         className="w-full p-2 border rounded-md h-[25vh]"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block font-medium">Amount</label>
//                       <textarea
//                         type="text"
//                         value={proposed.amount}
//                         onChange={(e) =>
//                           handlePaymentsChange(e, Index, "amount")
//                         }
//                         className="w-full p-2 border rounded-md h-[25vh]"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removePayments(Index)}
//                     className="mt-2 p-1 bg-red-500 text-white rounded"
//                   >
//                     Remove Payments Terms
//                   </button>
//                 </div>
//               ))} */}
//               {proposal.payments.map((proposed, Index) => (
//                 <div key={Index} className="border p-4 rounded-md space-y-3">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Terms Input with Word Limit (10) */}
//                     <div>
//                       <label className="block font-medium">Terms</label>
//                       <textarea
//                         name="terms"
//                         value={proposed.terms}
//                         onChange={(e) => {
//                           const words = e.target.value.trim().split(/\s+/);
//                           if (words.length <= 10) {
//                             handlePaymentsChange(e, Index, "terms");
//                           }
//                         }}
//                         className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[25vh]"
//                         required
//                       />
//                       <p className="text-sm text-gray-500">
//                         {proposed.terms
//                           ? proposed.terms.trim().split(/\s+/).length
//                           : 0}{" "}
//                         / 10 words
//                       </p>
//                     </div>

//                     {/* Amount Input (No Word Limit) */}
//                     <div>
//                       <label className="block font-medium">Amount</label>
//                       <textarea
//                         name="amount"
//                         value={proposed.amount}
//                         onChange={(e) =>
//                           handlePaymentsChange(e, Index, "amount")
//                         }
//                         className="w-50 p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[6vh]"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Remove Button */}
//                   <button
//                     type="button"
//                     onClick={() => removePayments(Index)}
//                     className="mt-2 p-1 bg-red-200 text-red-500 px-2 rounded"
//                   >
//                     Remove Payments Terms
//                   </button>
//                 </div>
//               ))}

//               <button
//                 type="button"
//                 onClick={addPayments}
//                 className="m-4 p-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
//                 id="addBtn"
//               >
//                 Add Payments Terms
//               </button>
//             </div>

//             {/* <button
//               type="submit"
//               className="w-25 m-4 px-4 py-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
//               id="addBtn"
//             >
//               Create Proposal
//             </button> */}
//             <button
//               type="submit"
//               className="m-4 px-5 py-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
//               id="addBtn"
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
    // clientId: "",
    scopeOfWork: {
      title: "",
      objective: "",
      services: [""],
      description: [""],
    },
    timelineDeliverables: [
      {
        timelineText: "",
        task: "",
        deliverables: "",
      },
    ],
    timelineWeeks: {
      timeLine: "", // ✅ Matches the schema
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

  // Handle changes in Timeline & Deliverables

  const handleTimelineChange = (e, timelineIndex, field) => {
    setProposal((prev) => {
      return {
        ...prev,
        timelineDeliverables: prev.timelineDeliverables.map((item, index) =>
          index === timelineIndex ? { ...item, [field]: e.target.value } : item
        ),
      };
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

  const addTimeline = () => {
    setProposal((prev) => ({
      ...prev,
      timelineDeliverables: [
        ...prev.timelineDeliverables,
        { timelineText: "", task: "", deliverables: "" }, // ✅ Corrected structure
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
        "http://localhost:5000/api/proposals/create",
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
    <div className="flex items-center justify-center bg-green-50">
      <div className="bg-[#ECEDEF] rounded w-full relative">
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
            className="px-3 max-h-[95vh] overflow-y-auto"
          >
            <div className="col bg-white p-4 m-0 sm:p-4 sm:m-3 border border-gray-300 rounded">
              <h3 className="text-lg font-semibold">Client detail</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={proposal.companyName || ""}
                    onChange={(e) => {
                      const words = e.target.value.trim().split(/\s+/);
                      if (words.length <= 5) {
                        handleChange(e);
                      }
                    }}
                    className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    {proposal.companyName
                      ? proposal.companyName.trim().split(/\s+/).length
                      : 0}{" "}
                    / 5 words
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={proposal.clientName || ""}
                    onChange={(e) => {
                      const words = e.target.value.trim().split(/\s+/);
                      if (words.length <= 5) {
                        handleChange(e);
                      }
                    }}
                    className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    {proposal.clientName
                      ? proposal.clientName.trim().split(/\s+/).length
                      : 0}{" "}
                    / 5 words
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* {[
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
                      className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
                      required
                    />
                  </div>
                ))} */}
                {[
                  { label: "Expiry Date", name: "expiryDate", type: "date" },
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
                      className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
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
                  onChange={(e) => {
                    const words = e.target.value.trim().split(/\s+/);
                    if (words.length <= 16) {
                      handleChange(e);
                    }
                  }}
                  className="w-full h-[25vh] p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
                  required
                />
                <p className="text-sm text-gray-500">
                  {proposal.proposalDescription
                    ? proposal.proposalDescription.trim().split(/\s+/).length
                    : 0}
                  /16 words
                </p>
              </div>
            </div>
            <div className="col bg-white p-4 m-0 sm:p-4 sm:m-3 border border-gray-300 rounded">
              <h3 className="text-lg font-semibold">Scope of Work</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title Input */}
                <div>
                  <label className="block text-gray-700 font-medium mt-4">
                    Title
                  </label>
                  <textarea
                    name="title"
                    value={proposal.scopeOfWork?.title || ""}
                    onChange={(e) => {
                      const words = e.target.value.trim().split(/\s+/);
                      if (words.length <= 15) {
                        handleScopeChange(e, "title");
                      }
                    }}
                    className="w-full h-[20vh] p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    {proposal.scopeOfWork?.title
                      ? proposal.scopeOfWork?.title.trim().split(/\s+/).length
                      : 0}
                    /15 words
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mt-4">
                    Objective
                  </label>
                  <textarea
                    name="objective"
                    value={proposal.scopeOfWork?.objective || ""}
                    onChange={(e) => {
                      const words = e.target.value.trim().split(/\s+/);
                      if (words.length <= 40) {
                        handleScopeChange(e, "objective");
                      }
                    }}
                    className="w-full h-[20vh] p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    {proposal.scopeOfWork?.objective
                      ? proposal.scopeOfWork?.objective.trim().split(/\s+/)
                          .length
                      : 0}
                    /40 words
                  </p>
                </div>
              </div>

              <div className="flex gap-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mt-4">Services</h4>
                  <div className="space-y-2">
                    {proposal.scopeOfWork?.services?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <textarea
                          type="text"
                          placeholder="Service"
                          value={item}
                          onChange={(e) => {
                            const words = e.target.value.trim().split(/\s+/);
                            if (words.length <= 10) {
                              handleArrayChange(e, "services", index);
                            }
                          }}
                          className="w-full h-[20vh] p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayField("services", index)}
                          className="bg-red-200 px-2 py-1 rounded"
                        >
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-gray-500">
                    {proposal.scopeOfWork?.services?.length
                      ? proposal.scopeOfWork.services
                          .map((item) =>
                            item.trim() ? item.trim().split(/\s+/).length : 0
                          )
                          .reduce((a, b) => a + b, 0)
                      : 0}{" "}
                    / 10 words
                  </p>

                  <button
                    type="button"
                    onClick={() => addArrayField("services")}
                    className="mt-2 px-4 py-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
                    id="addBtn"
                  >
                    + Add Service
                  </button>
                </div>

                <div>
                  <h4 className="font-medium mt-4">Description</h4>
                  <div className="space-y-2">
                    {proposal.scopeOfWork?.description?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <textarea
                          type="text"
                          placeholder="Description"
                          value={item}
                          onChange={(e) => {
                            const words = e.target.value.trim().split(/\s+/);
                            if (words.length <= 30) {
                              handleArrayChange(e, "description", index);
                            }
                          }}
                          className="w-full h-[20vh] p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF]"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayField("description", index)}
                          className="bg-red-200 px-2 py-1 rounded"
                        >
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-gray-500">
                    {proposal.scopeOfWork?.description?.length
                      ? proposal.scopeOfWork.description
                          .map((item) =>
                            item.trim() ? item.trim().split(/\s+/).length : 0
                          )
                          .reduce((a, b) => a + b, 0) // Sum word counts
                      : 0}{" "}
                    / 30 words
                  </p>
                  <button
                    type="button"
                    onClick={() => addArrayField("description")}
                    className="mt-2 px-4 py-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
                    id="addBtn"
                  >
                    + Add Description
                  </button>
                </div>
              </div>
            </div>
            <div className="col bg-white p-0 m-0 sm:p-4 sm:m-3 border border-gray-300 rounded">
              <h3 className="text-lg font-semibold p-4">
                Timeline & Deliverables
              </h3>
              <div className="mt-2 flex flex-col md:block gap-4 p-4">
                <label className="font-medium">Timeline Heading</label>
                <input
                  type="text"
                  placeholder="Enter timeline heading"
                  value={proposal.timelineWeeks.timeLine}
                  onChange={(e) =>
                    setProposal({
                      ...proposal,
                      timelineWeeks: {
                        ...proposal.timelineWeeks,
                        timeLine: e.target.value, // Correct field update
                      },
                    })
                  }
                  className="p-2 border border-primary-subtle rounded focus:outline-none focus:bg-white focus:ring-0 bg-[#F5FBFF] w-30"
                />
              </div>

              {proposal.timelineDeliverables.map((timeline, timelineIndex) => (
                <div
                  key={timelineIndex}
                  className="border p-4 rounded-md space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Task</label>
                      <textarea
                        name="task"
                        value={timeline.task}
                        onChange={(e) => {
                          const words = e.target.value.trim().split(/\s+/);
                          if (words.length <= 10) {
                            handleTimelineChange(e, timelineIndex, "task");
                          }
                        }}
                        className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[25vh]"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        {timeline.task
                          ? timeline.task.trim().split(/\s+/).length
                          : 0}{" "}
                        / 10 words
                      </p>
                    </div>

                    <div>
                      <label className="block font-medium">Deliverables</label>
                      <textarea
                        name="deliverables"
                        value={timeline.deliverables}
                        onChange={(e) => {
                          const words = e.target.value.trim().split(/\s+/);
                          if (words.length <= 20) {
                            handleTimelineChange(
                              e,
                              timelineIndex,
                              "deliverables"
                            );
                          }
                        }}
                        className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[25vh]"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        {timeline.deliverables
                          ? timeline.deliverables.trim().split(/\s+/).length
                          : 0}{" "}
                        / 20 words
                      </p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center gap-4 mt-1">
                      <label className="font-medium">Timeline</label>
                      <input
                        type="text"
                        placeholder="Enter Timeline"
                        value={timeline.timelineText || ""}
                        onChange={(e) =>
                          handleTimelineChange(e, timelineIndex, "timelineText")
                        }
                        className="p-2 border border-primary-subtle rounded focus:outline-none focus:bg-white focus:ring-0 bg-[#F5FBFF] w-30"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeTimeline(timelineIndex)}
                    className="mt-2 p-1 bg-red-200 text-red-500 px-2 rounded"
                  >
                    Remove Timeline & Deliverables
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addTimeline}
                className="m-4 p-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
                id="addBtn"
              >
                Add Timeline & Deliverables
              </button>
            </div>
            <div className="col bg-white p-0 m-0 sm:p-4 sm:m-3 border border-gray-300 rounded">
              <h3 className="text-lg font-semibold p-4">Proposed Investment</h3>
              <div className="mt-2 flex gap-4 items-center p-4">
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
                  className="p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] w-30"
                />
              </div>

              {proposal.proposedInvestment.map((proposed, Index) => (
                <div key={Index} className="border p-4 rounded-md space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Services</label>
                      <textarea
                        name="services"
                        value={proposed.services}
                        onChange={(e) => {
                          const words = e.target.value.trim().split(/\s+/);
                          if (words.length <= 10) {
                            handleProposedChange(e, Index, "services");
                          }
                        }}
                        className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[25vh]"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        {proposed.services
                          ? proposed.services.trim().split(/\s+/).length
                          : 0}{" "}
                        / 10 words
                      </p>
                    </div>

                    <div>
                      <label className="block font-medium">Description</label>
                      <textarea
                        name="description"
                        value={proposed.description}
                        onChange={(e) => {
                          const words = e.target.value.trim().split(/\s+/);
                          if (words.length <= 20) {
                            handleProposedChange(e, Index, "description");
                          }
                        }}
                        className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[25vh]"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        {proposed.description
                          ? proposed.description.trim().split(/\s+/).length
                          : 0}{" "}
                        / 20 words
                      </p>
                    </div>

                    <div>
                      <label className="block font-medium">Cost</label>
                      <textarea
                        name="cost"
                        value={proposed.cost}
                        onChange={(e) => handleProposedChange(e, Index, "cost")}
                        className="w-50 p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[6vh]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeProposed(Index)}
                    className="mt-2 p-1 bg-red-200 text-red-500 px-2 rounded"
                  >
                    Remove Proposed Investment
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addProposed}
                className="m-4 p-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
                id="addBtn"
              >
                Add Proposed Investment
              </button>
            </div>
            <div className="col bg-white p-0 m-0 sm:p-4 sm:m-3 border border-gray-300 rounded">
              <h3 className="text-lg font-semibold p-4">Payments Terms</h3>

              {proposal.payments.map((proposed, Index) => (
                <div key={Index} className="border p-4 rounded-md space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Terms</label>
                      <textarea
                        name="terms"
                        value={proposed.terms}
                        onChange={(e) => {
                          const words = e.target.value.trim().split(/\s+/);
                          if (words.length <= 10) {
                            handlePaymentsChange(e, Index, "terms");
                          }
                        }}
                        className="w-full p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[25vh]"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        {proposed.terms
                          ? proposed.terms.trim().split(/\s+/).length
                          : 0}{" "}
                        / 10 words
                      </p>
                    </div>

                    <div>
                      <label className="block font-medium">Amount</label>
                      <textarea
                        name="amount"
                        value={proposed.amount}
                        onChange={(e) =>
                          handlePaymentsChange(e, Index, "amount")
                        }
                        className="w-50 p-2 border border-primary-subtle rounded focus:outline-none  focus:bg-white focus:ring-0 bg-[#F5FBFF] h-[6vh]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removePayments(Index)}
                    className="mt-2 p-1 bg-red-200 text-red-500 px-2 rounded"
                  >
                    Remove Payments Terms
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addPayments}
                className="m-4 p-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
                id="addBtn"
              >
                Add Payments Terms
              </button>
            </div>

            <button
              type="submit"
              className="m-4 px-5 py-2 bg-[#0d6efd] text-white rounded hover:bg-[#afcdf7]"
              id="addBtn"
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
