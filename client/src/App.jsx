// import React from "react";
// import AllPages from "./components/client/AllPages";
// import Script from "../Script";
// import { Route, Routes } from "react-router-dom";

// function App() {
//   return (
//     <div>
//       <Script />
//       <Routes>
//         <Route path="/proposal/:id" element={<AllPages />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

// import { useState } from "react";
// import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
// import ClientLogin from "./components/ClientLogin";
// import AllPages from "./components/client/AllPages";

// function App() {
//   const [proposal, setProposal] = useState(null);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Login Route */}
//         <Route path="/" element={<ClientLogin setProposal={setProposal} />} />

//         {/* Proposal Route (Only accessible if proposal exists) */}
//         <Route
//           path="/proposal"
//           element={
//             proposal ? <AllPages proposal={proposal} /> : <Navigate to="/" />
//           }
//         />

//         {/* Catch-all Route - Redirects any random route to login */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import ClientLogin from "./components/ClientLogin";
import AllPages from "./components/client/AllPages";

function App() {
  const [proposal, setProposal] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route
          path="/access-proposal"
          element={<ClientLogin setProposal={setProposal} />}
        />
        <Route path="/" element={<Navigate to="/access-proposal" />} />

        {/* Proposal Route with ID */}
        <Route
          path="/proposal/:id"
          element={
            proposal ? (
              <AllPages proposal={proposal} />
            ) : (
              <Navigate to="/access-proposal" />
            )
          }
        />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
