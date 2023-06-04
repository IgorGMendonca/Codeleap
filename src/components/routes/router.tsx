import { Route, Routes } from "react-router-dom";

import { LoginScreen } from "../../pages/login/loginScreen";
import { Feed } from "../../pages/feed/feed";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginScreen />} ></Route>
            <Route path="/feed" element={<Feed />}></Route>
        </Routes>
    )
}
