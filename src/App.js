import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Help from "./pages/Help";
import DisorderPage from "./pages/DisorderPage";
import Chatbot from "./components/Chatbot";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Counselors from "./pages/Counselors";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:id" element={<DisorderPage />} />
          <Route path="/help" element={<Help />} />
          <Route path="/chatbot" element={<Chatbot />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/counselors" element={<Counselors />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;