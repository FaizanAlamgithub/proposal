const Proposal = require("../models/Proposal");

// Generate a random password
// const generatePassword = () => Math.random().toString(36).slice(-8);

const generatePassword = () => Math.floor(1000 + Math.random() * 9000);

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

// exports.createProposal = async (req, res) => {
//   try {
//     const {
//       companyName,
//       clientName,
//       expiryDate,
//       proposalDescription,
//       scopeOfWork, // Keep scopeOfWork
//       timelineDeliverables,
//       timelineWeeks,
//       proposedInvestment,
//       proposedCost,
//       payments,
//     } = req.body;

//     if (
//       !companyName ||
//       !clientName ||
//       !expiryDate ||
//       !proposalDescription ||
//       !scopeOfWork ||
//       !timelineDeliverables ||
//       !timelineWeeks ||
//       !proposedInvestment ||
//       !proposedCost ||
//       !payments
//     ) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     // Generate auto password
//     const proposalPassword = generatePassword();

//     // Create a new Proposal
//     const newProposal = new Proposal({
//       companyName,
//       clientName,
//       expiryDate: new Date(expiryDate),
//       proposalDescription,
//       proposalPassword,
//       isAccepted: false,
//       createdDate: new Date(),
//       scopeOfWork, // Save scopeOfWork inside Proposal
//       timelineDeliverables,
//       timelineWeeks,
//       proposedInvestment,
//       proposedCost,
//       payments,
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
      scopeOfWork,
      timelineDeliverables,
      timelineWeeks,
      proposedInvestment,
      proposedCost,
      payments,
    } = req.body;

    // Validation: Check for required fields
    if (
      !companyName ||
      !clientName ||
      !expiryDate ||
      !proposalDescription ||
      !scopeOfWork ||
      !timelineDeliverables ||
      !timelineWeeks ||
      !proposedInvestment ||
      !proposedCost ||
      !payments
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Additional validation for nested required fields (optional, based on schema)
    if (
      !scopeOfWork.title ||
      !scopeOfWork.objective ||
      !timelineWeeks.timeLine
    ) {
      return res
        .status(400)
        .json({ error: "Nested required fields are missing." });
    }

    // Generate auto password
    const proposalPassword = generatePassword();

    // Log the incoming data for debugging
    console.log("Received proposal data:", JSON.stringify(req.body, null, 2));

    // Create a new Proposal
    const newProposal = new Proposal({
      companyName,
      clientName,
      expiryDate: new Date(expiryDate), // Ensure proper Date conversion
      proposalDescription,
      proposalPassword,
      isAccepted: false, // Default value already in schema, but explicit here
      createdDate: new Date(), // Explicitly set, though schema default works too
      scopeOfWork,
      timelineDeliverables,
      timelineWeeks,
      proposedInvestment,
      proposedCost,
      payments,
    });

    // Save to database
    await newProposal.save();

    // Success response
    res.status(201).json({
      message: "Proposal created successfully",
      proposal: newProposal,
    });
  } catch (error) {
    console.error("Error creating proposal:", error);
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

// // Get All Archived Proposals
// exports.getAllArchivedProposals = async (req, res) => {
//   try {
//     console.log("Fetching archived proposals...");

//     const archivedProposals = await Proposal.find({ isArchived: true });

//     if (archivedProposals.length === 0) {
//       return res.status(404).json({ message: "No archived proposals found" });
//     }

//     res.status(200).json(archivedProposals);
//   } catch (error) {
//     console.error("Error fetching archived proposals:", error);
//     res.status(500).json({
//       message: "Error retrieving archived proposals",
//       error: error.message,
//     });
//   }
// };

// Get All Archived Proposals
exports.getAllArchivedProposals = async (req, res) => {
  try {
    const archivedProposals = await Proposal.find({ isArchived: true });

    // ✅ Return an empty array instead of a 404 error
    if (archivedProposals.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(archivedProposals);
  } catch (error) {
    console.error("Error fetching archived proposals:", error.message);
    res.status(500).json({
      message: "Internal server error. Please try again.",
      error: error.message,
    });
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
      return res.status(201).json({ error: "Invalid proposal password." });
    }

    if (proposal.isArchived) {
      return res.status(201).json({ message: "This proposal is archived." });
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
// exports.updateProposal = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { companyName, clientName, expiryDate, description, clientId } =
//       req.body;

//     const updatedProposal = await Proposal.findByIdAndUpdate(
//       id,
//       { companyName, clientName, expiryDate, description, clientId },
//       { new: true, runValidators: true }
//     );

//     if (!updatedProposal) {
//       return res.status(404).json({ error: "Proposal not found" });
//     }

//     res.json({
//       message: "Proposal updated successfully",
//       proposal: updatedProposal,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// };

exports.updateProposal = async (req, res) => {
  try {
    const { id } = req.params;
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
      payments,
    } = req.body;

    // Create an update object with only provided fields
    const updateFields = {};
    if (companyName) updateFields.companyName = companyName;
    if (clientName) updateFields.clientName = clientName;
    if (expiryDate) updateFields.expiryDate = new Date(expiryDate);
    if (proposalDescription)
      updateFields.proposalDescription = proposalDescription;
    if (clientId) updateFields.clientId = clientId;
    if (scopeOfWork) updateFields.scopeOfWork = scopeOfWork;
    if (timelineDeliverables)
      updateFields.timelineDeliverables = timelineDeliverables;
    if (timelineWeeks) updateFields.timelineWeeks = timelineWeeks;
    if (proposedInvestment)
      updateFields.proposedInvestment = proposedInvestment;
    if (proposedCost) updateFields.proposedCost = proposedCost;
    if (payments) updateFields.payments = payments;

    const updatedProposal = await Proposal.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedProposal) {
      return res.status(404).json({ error: "Proposal not found." });
    }

    res.json({
      message: "Proposal updated successfully.",
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

// Archive a Proposal
exports.archiveProposal = async (req, res) => {
  try {
    const { id } = req.params;

    // Find proposal by ID and update archived to true
    const proposal = await Proposal.findByIdAndUpdate(
      id,
      { isArchived: true },
      { new: true } // Return updated proposal
    );

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res
      .status(200)
      .json({ message: "Proposal archived successfully", proposal });
  } catch (error) {
    console.error("Error archiving proposal:", error);
    res.status(500).json({ message: "Error archiving proposal", error });
  }
};

// Unarchive a Proposal
exports.UnArchiveProposal = async (req, res) => {
  try {
    const { id } = req.params;

    // Find proposal by ID and update archived to true
    const proposal = await Proposal.findByIdAndUpdate(
      id,
      { isArchived: false },
      { new: true } // Return updated proposal
    );

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res
      .status(200)
      .json({ message: "Proposal archived successfully", proposal });
  } catch (error) {
    console.error("Error archiving proposal:", error);
    res.status(500).json({ message: "Error archiving proposal", error });
  }
};
