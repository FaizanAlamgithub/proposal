import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ proposal }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!proposal) {
      navigate("/");
    }
  }, [proposal, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Proposal Details</h2>
        {proposal ? (
          <div className="mt-4">
            <p>
              <strong>Company:</strong> {proposal.companyName}
            </p>
            <p>
              <strong>Client:</strong> {proposal.clientName}
            </p>
            <p>
              <strong>Description:</strong> {proposal.description}
            </p>
            <p>
              <strong>Expiry Date:</strong>{" "}
              {new Date(proposal.expiryDate).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>No proposal data available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
