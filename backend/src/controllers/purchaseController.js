const purchaseService = require("../services/purchaseService");

const createPurchase = async (req, res) => {
  try {
    const vehicleId = req.params.id || req.params.vehicleId;
    const buyerInfo = req.body;

    const result = await purchaseService.createPurchase(req.user, vehicleId, buyerInfo);

    res.status(201).json({
      message: "Purchase created",
      vehicle: result.vehicle,
      purchase: result.purchase,
    });
  } catch (error) {
    // Handle Mongoose validation errors with 400
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message).join("; ");
      return res.status(400).json({ message: messages });
    }

    console.error("createPurchase error:", error);
    res.status(error.status || 500).json({ message: error.message, stack: error.stack });
  }
};

const getUserPurchases = async (req, res) => {
  try {
    
    const purchases = await purchaseService.getPurchasesForUser(req.user.userId);
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await purchaseService.getAllPurchases();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReceipt = async (req, res) => {
  try {
    const purchase = await purchaseService.getPurchaseById(req.params.id);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    // allow owner or admin
    

if (
  !req.user ||
  (
    purchase.user &&
    purchase.user._id.toString() !== req.user.userId &&
    req.user.role !== "admin"
  )
) {
  return res.status(403).json({ message: "Unauthorized" });
}

    // require pdfkit lazily so server can start when dependency missing
    let PDFDocument;
    try {
      PDFDocument = require("pdfkit");
    } catch (err) {
      return res.status(500).json({ message: "PDF generation dependency is missing. Run 'npm install pdfkit' in backend." });
    }

    // generate simple PDF receipt
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=receipt-${purchase._id}.pdf`);

    doc.fontSize(20).text("Purchase Receipt", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Receipt ID: ${purchase._id}`);
    doc.text(`Date: ${purchase.createdAt.toISOString()}`);
    doc.moveDown();

    doc.text(`Buyer: ${purchase.buyerName || purchase.user?.name || "-"}`);
    doc.text(`Phone: ${purchase.phone || "-"}`);
    doc.text(`Aadhar: ${purchase.aadhar || "-"}`);
    doc.text(`Location: ${purchase.location || "-"}`);
    doc.text(`Age: ${purchase.age || "-"}`);
    doc.text(`Driving License: ${purchase.drivingLicense || "-"}`);
    doc.text(`Payment Method: ${purchase.paymentMethod}`);
    doc.text(`Payment Confirmed: ${purchase.paymentConfirmed ? "Yes" : "No"}`);

    doc.moveDown();
    doc.text(`Vehicle: ${purchase.vehicle?.make || ""} ${purchase.vehicle?.model || ""}`);
    doc.text(`Category: ${purchase.vehicle?.category || ""}`);
    doc.text(`Price: Rs.${purchase.vehicle?.price || ""}`);

    doc.end();
    doc.pipe(res);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const confirmPurchase = async (req, res) => {
  try {
    const purchase = await purchaseService.confirmPurchasePayment(req.params.id);
    res.status(200).json({ message: "Payment confirmed", purchase });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getPurchase = async (req, res) => {
  try {
    const purchase = await purchaseService.getPurchaseById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    // only admin can view arbitrary purchase via this route
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPurchase,
  getUserPurchases,
  getAllPurchases,
  getReceipt,
  confirmPurchase,
  getPurchase,
};
