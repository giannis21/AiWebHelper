import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { Provider } from "react-redux";
import { reduxStore, persistor } from "./redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={reduxStore}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          {/* Authentication layout */}
          <Route path="/auth/*" element={<AuthLayout />} />

          {/* Admin layout */}
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Redirect to login if no matching route */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
