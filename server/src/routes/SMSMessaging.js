const express = require("express");
const router = express.Router();
const twilio = require("twilio");

const accountSid = "AC5f24dcbff461e658d4fd41654a15d8ec";
const authToken = "f022f28afd122877859f7d7cfdcb17c4";
const client = twilio(accountSid, authToken);

router.post("/send-sms", async (req, res) => {
  const { phoneNumber, message } = req.body;

  try {
    const response = await client.messages.create({
      body: message,
      from: "+13156233137",
      to: phoneNumber,
    });
    console.log("SMS sent successfully", response.sid);
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending SMS", error);
    res.status(500).json({ error: "Failed to send SMS" });
  }
});

module.exports = router;
