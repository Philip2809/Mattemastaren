import { Navigate, Route, Routes } from "react-router";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import MathGame from "./MathGame";
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

function Router() {

    return (
        <>
            <Navbar currentPage={'home'} /><Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<MathGame />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="*" element={<Navigate to='/' replace />} />
            </Routes>
        </>
    )
}

export default Router
