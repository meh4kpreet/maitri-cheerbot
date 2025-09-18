import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative">
      <Navigation />
      <main className="ml-20 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;