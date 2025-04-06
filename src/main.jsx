import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Student from "./components/Student";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLogged, isAdmin } = useAuth();
  if (!isLogged) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return children;
};

const RedirectHandler = () => {
  const { isLogged, isAdmin } = useAuth();
  console.log("RedirectHandler - isLogged:", isLogged, "isAdmin:", isAdmin);

  if (!isLogged) {
    console.log("Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (isAdmin) {
    console.log("Redirecting to /admin");
    return <Navigate to="/admin" replace />;
  }

  console.log("Redirecting to /user");
  return <Navigate to="/user" replace />;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RedirectHandler />, // Redirect based on isLogged and isAdmin
  },
  {
    path: "/login",
    element: <Login />, // Login page
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly>
        <Admin />
      </ProtectedRoute>
    ), // Protect the Admin route
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <Student />
      </ProtectedRoute>
    ), // Protect the User route
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </StrictMode>
);
