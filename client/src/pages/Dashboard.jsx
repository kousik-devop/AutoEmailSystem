import Navbar from "../components/Layout/Navbar";
import CampaignForm from "../components/campaign/CampaignForm";
import MyCampaigns from "../components/campaign/MyCampaigns";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">
        <CampaignForm />
        <MyCampaigns />
      </div>
    </div>
  );
}

export default Dashboard;
