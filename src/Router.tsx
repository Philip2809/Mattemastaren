import { Navigate, Route, Routes } from "react-router";
import App from "./App";
import Register from "./Register";

function Router() {

    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
    )
}

export default Router
