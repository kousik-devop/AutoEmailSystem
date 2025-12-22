import { useEffect, useState } from "react";
import api from "../../services/api";

const CampaignPreviewModal = ({ campaign, onClose }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreview = async () => {
      try {
        const res = await api.post(
          `/campaigns/${campaign._id}/run`,
          { execute: false }
        );
        setPreview(res.data.aiResult);
      } catch {
        alert("Failed to generate preview");
      } finally {
        setLoading(false);
      }
    };

    loadPreview();
  }, [campaign]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl space-y-4 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-bold">Email Preview</h3>

        {loading ? (
          <p>Generating preview...</p>
        ) : (
          <>
            <p className="font-semibold">
              Subject: {preview?.subject || "AI Generated"}
            </p>

            <div className="text-sm whitespace-pre-wrap border p-3 rounded">
              {preview?.content || preview?.body}
            </div>
          </>
        )}

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignPreviewModal;
