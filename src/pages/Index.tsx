import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import gradientBg from "@/assets/gradient-background.png";

const Index = () => {
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${gradientBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/20" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-12 max-w-4xl fade-in">
          {/* Main Title */}
          <div className="space-y-6">
            <h1 className="text-8xl md:text-9xl font-black tracking-tight">
              <span className="block text-white drop-shadow-2xl">PROJECT</span>
              <span className="block gradient-text drop-shadow-2xl">MAITRI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
              AI-powered emotional support through video emotion recognition. 
              Let us understand and support your feelings in real-time.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto slide-up">
            <Card className="glass p-6 text-center space-y-4 glow-hover smooth-transition">
              <Heart className="w-8 h-8 mx-auto text-accent" />
              <h3 className="font-semibold text-white">Emotional Intelligence</h3>
              <p className="text-sm text-white/70">Advanced AI analyzes your emotions</p>
            </Card>
            
            <Card className="glass p-6 text-center space-y-4 glow-hover smooth-transition">
              <Sparkles className="w-8 h-8 mx-auto text-secondary" />
              <h3 className="font-semibold text-white">Real-time Support</h3>
              <p className="text-sm text-white/70">Instant emotional assistance</p>
            </Card>
            
            <Card className="glass p-6 text-center space-y-4 glow-hover smooth-transition">
              <ArrowRight className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-semibold text-white">Personalized Care</h3>
              <p className="text-sm text-white/70">Tailored responses for your needs</p>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="slide-up">
            <Link to="/chatbox">
              <Button 
                size="lg" 
                className="px-12 py-6 text-lg bg-gradient-primary hover:scale-110 bounce-transition shadow-2xl"
              >
                Start Your Journey
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Subtitle */}
          <p className="text-white/60 text-sm font-light">
            Experience the future of emotional AI support
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
