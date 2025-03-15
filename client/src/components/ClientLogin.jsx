// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ClientLogin = ({ setProposal }) => {
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/proposals/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ proposalPassword: password }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Login failed. Try again.");
//       }

//       setProposal(data.proposal);
//       navigate("/proposal");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-4">Client Login</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Enter Proposal Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border p-2 w-full mb-3"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ClientLogin;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ClientLogin = ({ setProposal }) => {
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "https://proposal-backend-1dom.onrender.com/api/proposals/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ proposalPassword: password }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Login failed. Try again.");
//       }

//       setProposal(data.proposal); // Store proposal details in state

//       // Ensure proposal has an ID before navigating
//       if (data.proposal && data.proposal._id) {
//         navigate(`/proposal/${data.proposal._id}`);
//       } else {
//         throw new Error("Invalid proposal data received.");
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     // <div className="flex justify-center items-center h-screen bg-gray-100">
//     //   <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[60vh] h-[40vh]">
//     //     <h2 className="text-2xl font-bold mb-4">Access Proposal</h2>
//     //     {error && <p className="text-red-500">{error}</p>}
//     //     <form onSubmit={handleLogin} className="pt-5">
//     //       <input
//     //         type="password"
//     //         placeholder="Enter Proposal Code"
//     //         value={password}
//     //         onChange={(e) => setPassword(e.target.value)}
//     //         className="border p-2 w-full mb-3"
//     //       />
//     //       <button
//     //         type="submit"
//     //         className="bg-blue-500 text-white px-4 py-2 rounded"
//     //       >
//     //         Next
//     //       </button>
//     //     </form>
//     //   </div>
//     // </div>
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[60vh] h-[50vh]">
//         {/* Title Container with Bottom Border */}
//         <div className="border-b border-gray-300 pb-5">
//           <h2 className="text-2xl font-medium text-[#606060]">Access Proposal</h2>
//         </div>

//         {error && <p className="text-red-500 mt-2">{error}</p>}

//         <form onSubmit={handleLogin} className="pt-4">
//           <input
//             type="password"
//             placeholder="Enter Proposal Code"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="bg-gray-100 border-none rounded p-3 w-full mb-3 focus:outline-none mt-5"
//           />
//           <button
//             type="submit"
//             className="bg-[#363636] text-white px-4 py-3 rounded w-full mt-5"
//           >
//             Next
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ClientLogin;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ClientLogin = ({ setProposal }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://proposal-backend-1dom.onrender.com/api/proposals/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ proposalPassword: password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed. Try again.");
      }

      if (!data.proposal || !data.proposal._id) {
        throw new Error("Invalid proposal data received.");
      }

      setProposal(data.proposal);
      navigate(`/proposal/${data.proposal._id}`);
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />

      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[350px] h-[300px]">
        {/* Title Container with Bottom Border */}
        <div className="border-b border-gray-300 pb-5">
          <h2 className="text-2xl font-medium text-[#606060]">
            Access Proposal
          </h2>
        </div>

        <form onSubmit={handleLogin} className="pt-4">
          <input
            type="password"
            placeholder="Enter Proposal Code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-100 border-none rounded-lg p-3 w-full mb-3 focus:outline-none mt-5"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-3 rounded-lg w-full mt-5"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientLogin;
