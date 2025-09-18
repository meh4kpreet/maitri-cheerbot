import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import gradientBg from "@/assets/gradient-background.png";

const Index = () => {
  return (
    <div 
      className="min-h-screen relative overflow-hidden space-container"
      style={{
        backgroundImage: `url(${gradientBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/30" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8 py-16">
        <div className="text-center space-y-20 max-w-5xl fade-in">
          {/* Main Title */}
          <div className="space-y-10">
            <h1 className="text-7xl md:text-8xl font-space font-extralight tracking-wider">
              <span className="block text-white/95 drop-shadow-2xl">PROJECT</span>
              <span className="block gradient-text drop-shadow-2xl font-light">MAITRI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 font-light max-w-3xl mx-auto leading-loose tracking-wide">
              AI Assistant for Psychological & Physical Well-Being of Astronauts<br/>
              <span className="text-white/60 text-base">Multimodal emotion detection and adaptive conversations for space crews</span>
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto slide-up">
            <Card className="glass p-8 text-center space-y-6 glow-hover smooth-transition cosmic-glow">
              <Heart className="w-12 h-12 mx-auto text-accent" />
              <h3 className="font-space font-medium text-white text-lg tracking-wide">Multimodal Detection</h3>
              <p className="text-white/70 font-light leading-relaxed">Audio-video emotion & health analysis</p>
            </Card>
            
            <Card className="glass p-8 text-center space-y-6 glow-hover smooth-transition cosmic-glow">
              <Sparkles className="w-12 h-12 mx-auto text-secondary" />
              <h3 className="font-space font-medium text-white text-lg tracking-wide">Space-Ready AI</h3>
              <p className="text-white/70 font-light leading-relaxed">Offline standalone system for BAS</p>
            </Card>
            
            <Card className="glass p-8 text-center space-y-6 glow-hover smooth-transition cosmic-glow">
              <ArrowRight className="w-12 h-12 mx-auto text-primary" />
              <h3 className="font-space font-medium text-white text-lg tracking-wide">Crew Support</h3>
              <p className="text-white/70 font-light leading-relaxed">Psychological companionship & intervention</p>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="slide-up">
            <Link to="/chatbox">
              <Button 
                size="lg" 
                className="px-16 py-8 text-lg font-space font-light tracking-wider bg-gradient-primary hover:scale-105 bounce-transition shadow-2xl cosmic-glow rounded-2xl"
              >
                Connect with MAITRI
                <ArrowRight className="ml-4 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Subtitle */}
          <p className="text-white/50 font-light tracking-wide">
            Supporting astronaut well-being in space missions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
