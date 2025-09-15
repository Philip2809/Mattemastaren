import { Navigate, Route, Routes } from "react-router";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import MathGame from "./MathGame";

function Router() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<MathGame />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
    )
}

export default Router
