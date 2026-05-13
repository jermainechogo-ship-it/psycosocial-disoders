import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Help from "./pages/Help";
import DisorderPage from "./pages/DisorderPage";
import Chatbot from "./components/Chatbot";

import AdminDashboard from "./pages/AdminDashboard";
import Counselors from "./pages/Counselors";
import Assessment from "./pages/Assessment";

import TicketSystem from "./components/TicketSystem";
import BookingSystem from "./components/BookingSystem";
import CounselorDashboard from "./components/CounselorDashboard";
import Auth from "./pages/Auth";

import ProtectedRoute from "./components/ProtectedRoute";
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
          <Route path="/auth" element={<Auth />} />

         {/* ADMIN ONLY */}
<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

{/* ADMIN + COUNSELOR */}
<Route
  path="/counselors"
  element={
    <ProtectedRoute allowedRoles={["admin", "counselor"]}>
      <Counselors />
    </ProtectedRoute>
  }
/>

{/* EVERYONE LOGGED IN */}
<Route
  path="/assessment"
  element={
    <ProtectedRoute
      allowedRoles={["user", "counselor", "admin"]}
    >
      <Assessment />
    </ProtectedRoute>
  }
/>

<Route
  path="/tickets"
  element={
    <ProtectedRoute
      allowedRoles={["user", "counselor", "admin"]}
    >
      <TicketSystem />
    </ProtectedRoute>
  }
/>

<Route
  path="/booking"
  element={
    <ProtectedRoute
      allowedRoles={["user", "counselor", "admin"]}
    >
      <BookingSystem />
    </ProtectedRoute>
  }
/>

{/* COUNSELOR + ADMIN */}
<Route
  path="/dashboard"
  element={
    <ProtectedRoute
      allowedRoles={["counselor", "admin"]}
    >
      <CounselorDashboard />
    </ProtectedRoute>
  }
/>        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;