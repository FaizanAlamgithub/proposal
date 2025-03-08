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

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientLogin = ({ setProposal }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/proposals/login",
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

      setProposal(data.proposal); // Store proposal details in state

      // Ensure proposal has an ID before navigating
      if (data.proposal && data.proposal._id) {
        navigate(`/proposal/${data.proposal._id}`);
      } else {
        throw new Error("Invalid proposal data received.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Client Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter Proposal Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-3"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientLogin;
