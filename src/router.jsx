import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";

import Home from "./Pages/Home/Home.jsx";
import Auctions from "./Pages/Auctions/Auctions.jsx";
import Auction from "./Pages/Auction/Auction.jsx";
import Upgrade from "./Pages/Upgrade/upgrade.jsx";
import Giveaways from "./Pages/Giveaways/Giveaways.jsx";
import Tournaments from "./Pages/Tournaments/Tournaments.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import Wallet from "./Pages/wallet/wallet.jsx";
import Inventory from "./Pages/Inventory/Inventory.jsx";
import Profile from "./Pages/Profile/Profil.jsx";
import Fairness from "./Pages/Fairness/Fairness.jsx";
import MyBids from "./Pages/Mybids/MyBids.jsx";
import Notifications from "./Pages/Notifications/notifications.jsx";
import ProfileSettings from "./Pages/ProfileSettings/ProfileSettings.jsx";
import DepositPage from "./Pages/Deposit/Deposit.jsx";
import Withdraw from "./Pages/Withdraw/Withdraw.jsx";

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auctions/:id" element={<Auction />} />
        <Route path="/upgrades" element={<Upgrade />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fairness" element={<Fairness />} />
        <Route path="/giveaways" element={<Giveaways />} />
        <Route path="/tournaments" element={<Tournaments />} />
       <Route path="/Mybids" element={<MyBids />} />
        <Route path="/auth" element={<Auth />} />
         <Route path="/notifications" element={<Notifications />} />
         <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route path="/wallet/deposit" element={<DepositPage />} />
            <Route path="/wallet/withdraw" element={<Withdraw />} />
      </Routes>
    </Layout>
  );
};

export default AppRouter;

