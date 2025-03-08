import { useState } from "react";
import ClientLogin from "../../client/components/ClientLogin"; // Adjust path if needed
import AllPages from "../../client/components/AllPages";

function AdminDashboard() {
  const [proposal, setProposal] = useState(null);

  return (
    <div>
      {!proposal ? (
        <ClientLogin setProposal={setProposal} />
      ) : (
        <AllPages proposal={proposal} />
      )}
    </div>
  );
}

export default AdminDashboard;
