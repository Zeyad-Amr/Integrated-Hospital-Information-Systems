import { useEffect, useState, ReactNode } from "react";
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

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedLayout;
