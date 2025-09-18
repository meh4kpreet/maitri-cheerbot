import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, MessageCircle } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    {
      to: "/",
      label: "Home",
      icon: Home,
    },
    {
      to: "/chatbox",
      label: "Chatbox",
      icon: MessageCircle,
    },
  ];

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
      <div className="glass p-6 rounded-3xl space-y-3 cosmic-glow">
        <Link 
          to="/" 
          className={cn(
            "block px-6 py-4 rounded-2xl font-space font-light tracking-wider smooth-transition text-center",
            location.pathname === "/" 
              ? "bg-gradient-primary text-primary-foreground cosmic-glow" 
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          )}
        >
          Home
        </Link>
        <Link 
          to="/chatbox" 
          className={cn(
            "block px-6 py-4 rounded-2xl font-space font-light tracking-wider smooth-transition text-center",
            location.pathname === "/chatbox" 
              ? "bg-gradient-primary text-primary-foreground cosmic-glow" 
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          )}
        >
          Chatbox
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;