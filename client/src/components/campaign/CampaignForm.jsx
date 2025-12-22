import { useState } from "react";
import api from "../../services/api";
import SendCampaignModal from "./SendCampaignModal";

const CampaignForm = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [campaignId, setCampaignId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "email",
    prompt: "",
    to_email: "",
    company_name: "",
    sender_name: "",
    website: "",
    tone: "professional",
    cta: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: form.name,
        type: form.type,
        prompt: form.prompt,
        meta: {
          brand: {
            company_name: form.company_name,
            sender_name: form.sender_name,
            website: form.website,
          },
          tone: form.tone,
          cta: form.cta,
          ...(form.type === "email" && { to_email: form.to_email }),
        },
      };

      const res = await api.post("/campaigns", payload);

      alert("Campaign Created Successfully 🚀");
      console.log(res.data);

      // ✅ store campaign id
      setCampaignId(res.data.campaign._id);
      setShowModal(true);

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-5"
      >
      <h2 className="text-xl font-bold">Create Campaign</h2>

      <input
        name="name"
        placeholder="Campaign Name"
        className="input"
        onChange={handleChange}
        required
      />

      <select name="type" className="input" onChange={handleChange}>
        <option value="email">Email</option>
        <option value="social">Social</option>
        <option value="whatsapp">WhatsApp</option>
      </select>

      {form.type === "email" && (
        <input
          name="to_email"
          type="email"
          placeholder="Recipient Email"
          className="input"
          onChange={handleChange}
          required
        />
      )}

      <textarea
        name="prompt"
        rows="4"
        placeholder="Campaign Prompt"
        className="input"
        onChange={handleChange}
        required
      />

      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="company_name"
          placeholder="Company Name"
          className="input"
          onChange={handleChange}
        />
        <input
          name="sender_name"
          placeholder="Sender Name"
          className="input"
          onChange={handleChange}
        />
      </div>

      <input
        name="website"
        placeholder="Website"
        className="input"
        onChange={handleChange}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <select name="tone" className="input" onChange={handleChange}>
          <option value="professional">Professional</option>
          <option value="friendly">Friendly</option>
          <option value="marketing">Marketing</option>
        </select>

        <input
          name="cta"
          placeholder="CTA (Enroll Now)"
          className="input"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
      >
        {loading ? "Creating..." : "Create Campaign"}
      </button>
    </form>

    {/* ✅ POPUP MODAL */}
      {showModal && (
        <SendCampaignModal
          campaignId={campaignId}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default CampaignForm;


