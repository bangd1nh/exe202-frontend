import React from "react";
import {
    Route,
    Routes,
    // useLocation,
} from "react-router-dom";
import Navbar from "./components/partials/Navbar";
import WaitingList from "./components/photograper/WaitingList";
import AcceptedList from "./components/photograper/AcceptedList";
import FinishList from "./components/photograper/FinishList";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
// import PhotographerProfile from "./pages/PhotographerProfile";
import PaymentPage from "./pages/PaymentPage";
import Photographer from "./pages/Photographer";
import Photo from "./pages/Photo";
import Register from "./pages/Register";
import ContactForm from "./components/customer/ContactForm";
import WishlistView from "./components/customer/WishlistView";
import PhotographerProfile from "./pages/PhotographerProfile";
import Footer from "./components/partials/Footer";
import {
    FacebookOutlined,
    WhatsAppOutlined,
    TwitterOutlined,
} from "@ant-design/icons";
import ChatingPage from "./pages/ChatingPage";
import About from "./pages/About";
import UserProfile from "./pages/UserProfile";
import Notfound from "./pages/Notfound";

function App() {
    // const location = useLocation();
    // const hideNavbar =
    //     location.pathname === "/login" || location.pathname === "/register";

    return (
        <>
            {/* {!hideNavbar && <Navbar />} */}
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/waiting-list" element={<WaitingList />} />
                <Route path="/accepted-list" element={<AcceptedList />} />
                <Route path="/finish-list" element={<FinishList />} />
                <Route path="/photographer" element={<Photographer />} />
                <Route
                    path="/contactForm/:photographerId"
                    element={<ContactForm />}
                />
                <Route path="/wishlist" element={<WishlistView />} />
                <Route path="/photos" element={<Photo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/photographer-profile/:photographerId"
                    element={<PhotographerProfile />}
                />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/chat" element={<ChatingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:userId" element={<UserProfile />} />
                <Route path="/*" element={<Notfound />} />
            </Routes>
            <div className="fixed right-0 top-52 z-50 p-3 flex-col flex gap-10 rounded-l-3xl border-gray-500 bg-white">
                <FacebookOutlined className="text-3xl hover:scale-150 duration-300 hover:cursor-pointer" />
                <WhatsAppOutlined className="text-3xl hover:scale-150 duration-300 hover:cursor-pointer" />
                <TwitterOutlined className="text-3xl hover:scale-150 duration-300 hover:cursor-pointer" />
            </div>
            <Footer />
        </>
    );
}

export default App;
