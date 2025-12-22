import axios from "axios";

export const runAgent = async (req, res, next) => {
  try {
    const { agent, prompt } = req.body;
    const files = req.files;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const payload = {
      agent_type: agent,
      prompt: prompt,
      execute: false, // Default value
      meta: {},
    };

    if (files && files.length > 0) {
      payload.meta.files = files.map((file) => ({
        filename: file.originalname,
        content: file.buffer.toString("base64"),
      }));
    }

    const aiServiceUrl = process.env.AI_SERVICE_URL || "http://localhost:8000";

    const response = await axios.post(`${aiServiceUrl}/agent/run`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error running agent:", error);
    next(error);
  }
};
