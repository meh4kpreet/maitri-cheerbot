import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center glass m-8 rounded-3xl">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold gradient-text">404</h1>
        <p className="text-xl text-muted-foreground">Oops! This page doesn't exist in Project Maitri</p>
        <a 
          href="/" 
          className="inline-flex items-center text-primary hover:text-accent smooth-transition underline hover:no-underline"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
