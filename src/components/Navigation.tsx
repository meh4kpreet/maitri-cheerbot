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
    <nav className="fixed left-0 top-0 h-full w-20 glass z-50 flex flex-col items-center py-8">
      <div className="flex flex-col space-y-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          const isHovered = hoveredItem === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex flex-col items-center space-y-2 p-3 rounded-2xl smooth-transition",
                "hover:bg-primary/10 hover:scale-110",
                isActive && "bg-primary/20 shadow-lg shadow-primary/20"
              )}
              onMouseEnter={() => setHoveredItem(item.to)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Icon
                className={cn(
                  "w-6 h-6 smooth-transition",
                  isActive ? "text-primary" : "text-muted-foreground",
                  "group-hover:text-primary"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium smooth-transition whitespace-nowrap",
                  isActive ? "text-primary" : "text-muted-foreground",
                  "group-hover:text-primary"
                )}
              >
                {item.label}
              </span>
              
              {/* Glow effect on hover/active */}
              {(isActive || isHovered) && (
                <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-sm -z-10 animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;