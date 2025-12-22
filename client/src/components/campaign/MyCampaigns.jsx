import { useEffect, useState } from "react";
import api from "../../services/api";
import CampaignPreviewModal from "./CampaignPreviewModal";

const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const fetchCampaigns = async () => {
    try {
      const res = await api.get("/campaigns");
      setCampaigns(res.data.campaigns);
    } catch (err) {
      alert("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const sendCampaign = async (id) => {
    try {
      await api.post(`/campaigns/${id}/run`, { execute: true });
      alert("Campaign sent successfully 📧");
      fetchCampaigns();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send");
    }
  };

  if (loading) return <p>Loading campaigns...</p>;

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">My Activity</h2>

      {campaigns.length === 0 ? (
        <p className="text-gray-500">No campaigns created yet.</p>
      ) : (
        <div className="space-y-3">
          {campaigns.map((c) => (
            <div
              key={c._id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-500">
                  {c.type.toUpperCase()} • {c.status}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCampaign(c)}
                  className="px-3 py-1 text-sm bg-gray-200 rounded"
                >
                  Preview
                </button>

                {c.status !== "completed" && (
                  <button
                    onClick={() => sendCampaign(c._id)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                  >
                    Send
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCampaign && (
        <CampaignPreviewModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </div>
  );
};

export default MyCampaigns;
