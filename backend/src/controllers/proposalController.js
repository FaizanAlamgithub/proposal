const Proposal = require("../models/Proposal");

// Generate a random password
const generatePassword = () => Math.random().toString(36).slice(-8);

// Create a new proposal (POST)
// exports.createProposal = async (req, res) => {
//   try {
//     const { companyName, clientName, expiryDate, proposalDescription, clientId, scopeOfWork } =
//       req.body;

//     if (
//       !companyName ||
//       !clientName ||
//       !expiryDate ||
//       !proposalDescription ||
//       !clientId
//     ) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     // Generate auto password
//     const proposalPassword = generatePassword();

//     const newProposal = new Proposal({
//       companyName,
//       clientName,
//       expiryDate: new Date(expiryDate),
//       description,
//       clientId,
//       proposalPassword,
//       isAccepted: false, // Default to false
//       createdDate: new Date(), // Store the current date
//       brands: brands || []
//     });

//     await newProposal.save();
//     res.status(201).json({
//       message: "Proposal created successfully",
//       proposal: newProposal,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.createProposal = async (req, res) => {
  try {
    const {
      companyName,
      clientName,
      expiryDate,
      proposalDescription,
      clientId,
      scopeOfWork, // Keep scopeOfWork
      timelineDeliverables,
      timelineWeeks,
      proposedInvestment,
      proposedCost,
    } = req.body;

    if (
      !companyName ||
      !clientName ||
      !expiryDate ||
      !proposalDescription ||
      !clientId ||
      !scopeOfWork ||
      !timelineDeliverables ||
      !timelineWeeks ||
      !proposedInvestment ||
      !proposedCost
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Generate auto password
    const proposalPassword = generatePassword();

    // Create a new Proposal
    const newProposal = new Proposal({
      companyName,
      clientName,
      expiryDate: new Date(expiryDate),
      proposalDescription,
      clientId,
      proposalPassword,
      isAccepted: false,
      createdDate: new Date(),
      scopeOfWork, // Save scopeOfWork inside Proposal
      timelineDeliverables,
      timelineWeeks,
      proposedInvestment,
      proposedCost,
    });

    await newProposal.save();
    res.status(201).json({
      message: "Proposal created successfully",
      proposal: newProposal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all proposals (for Admin)
exports.getProposals = async (req, res) => {
  try {
    const isAdmin = req.query.admin === "true"; // Admin check
    const proposals = await Proposal.find();

    // If admin, show all passwords; otherwise, hide them
    res.json(
      proposals.map((proposal) => ({
        ...proposal._doc,
        proposalPassword: isAdmin ? proposal.proposalPassword : "*****",
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get a single proposal by ID
exports.getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ error: "Proposal not found" });
    }

    res.json(proposal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept a proposal (update isAccepted to true)
exports.acceptProposal = async (req, res) => {
  try {
    const { id } = req.params; // Keep ID consistent
    const updatedProposal = await Proposal.findByIdAndUpdate(
      id,
      { isAccepted: true },
      { new: true, runValidators: true }
    );

    if (!updatedProposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.json({
      message: "Proposal accepted successfully",
      proposal: updatedProposal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Client login using proposal password
exports.clientLogin = async (req, res) => {
  try {
    const { proposalPassword } = req.body;

    if (!proposalPassword) {
      return res.status(400).json({ error: "Proposal password is required." });
    }

    // Find proposal by matching the exact proposalPassword
    const proposal = await Proposal.findOne({ proposalPassword }).lean();

    if (!proposal) {
      return res.status(401).json({ error: "Invalid proposal password." });
    }

    // Send proposal details (without password)
    const { proposalPassword: _, ...proposalData } = proposal;

    res.status(200).json({
      message: "Login successful",
      proposal: proposalData, // Send proposal details except password
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Update a proposal (PUT) - Now uses "/proposals/edit/:id"
exports.updateProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, clientName, expiryDate, description, clientId } =
      req.body;

    const updatedProposal = await Proposal.findByIdAndUpdate(
      id,
      { companyName, clientName, expiryDate, description, clientId },
      { new: true, runValidators: true }
    );

    if (!updatedProposal) {
      return res.status(404).json({ error: "Proposal not found" });
    }

    res.json({
      message: "Proposal updated successfully",
      proposal: updatedProposal,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Delete a proposal (DELETE) - Now uses "/proposals/delete/:id"
exports.deleteProposal = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProposal = await Proposal.findByIdAndDelete(id);
    if (!deletedProposal) {
      return res.status(404).json({ error: "Proposal not found" });
    }

    res.json({ message: "Proposal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
