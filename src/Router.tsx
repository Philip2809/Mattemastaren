import { Navigate, Route, Routes } from "react-router";
import Home from "./Home";
import MathGame from "./MathGame";
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import StatisticsPage from "./components/StatisticsPage";

function Router() {

    return (
        <>
            <Navbar /><Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<MathGame />} />
                <Route path="/exercises" element={<MathGame />} />
                <Route path="/statistics" element={<StatisticsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="*" element={<Navigate to='/' replace />} />
            </Routes>
        </>
    )
}

export default Router
