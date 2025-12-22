import axios from "axios";

export const runAIAgent = async (payload) => {
  const response = await axios.post(
    "http://localhost:8000/agent/run",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.result;
};
