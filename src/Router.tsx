import { Navigate, Route, Routes } from "react-router";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";

function Router() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
    )
}

export default Router
