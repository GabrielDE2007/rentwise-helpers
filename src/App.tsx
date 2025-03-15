
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Housing from "./pages/Housing";
import Rights from "./pages/Rights";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Alert, AlertDescription } from "./components/ui/alert";
import { AlertTriangle } from "lucide-react";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

// Component to display Firebase configuration errors
const FirebaseConfigCheck = ({ children }: { children: React.ReactNode }) => {
  const { error } = useAuth();
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <h3 className="font-bold mb-2">Firebase Configuration Error</h3>
            <p>{error}</p>
            <p className="mt-2 text-sm">
              Make sure to create a <code>.env.local</code> file in the project root with the following variables:
            </p>
            <pre className="bg-black/10 p-2 rounded mt-2 text-xs overflow-auto">
              VITE_FIREBASE_API_KEY=your_api_key<br/>
              VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain<br/>
              VITE_FIREBASE_PROJECT_ID=your_project_id<br/>
              VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket<br/>
              VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id<br/>
              VITE_FIREBASE_APP_ID=your_app_id
            </pre>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/housing" element={<Housing />} />
        <Route path="/rights" element={<Rights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          {/* Add protected routes here */}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FirebaseConfigCheck>
          <AppRoutes />
        </FirebaseConfigCheck>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
