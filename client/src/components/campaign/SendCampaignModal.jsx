import { useState } from "react";
import api from "../../services/api";

const SendCampaignModal = ({ campaignId, onClose }) => {
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    setSending(true);
    try {
      await api.post(`/campaigns/${campaignId}/run`, {
        execute: true,
      });

      alert("Email sent successfully 📧");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send email");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h3 className="text-lg font-bold">Send Campaign?</h3>

        <p className="text-gray-600 text-sm">
          This will immediately send the email to the recipient.
          Are you sure?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSend}
            disabled={sending}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {sending ? "Sending..." : "Send Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendCampaignModal;
