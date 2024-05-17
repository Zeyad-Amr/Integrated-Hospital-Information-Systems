import { useEffect, useState, ReactNode } from "react";
import LoginPage from "@/modules/auth/presentation/pages/login";
import { useRouter } from "next/navigation";

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated ? <>{children}</> : <LoginPage />;
};

export default ProtectedLayout;
