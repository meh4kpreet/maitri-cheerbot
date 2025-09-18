import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Camera, CameraOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const Chatbox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello, crew member! I'm MAITRI, your AI assistant for psychological and physical well-being. I'm here to monitor your emotional state and provide support during your mission. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I've analyzed your emotional state and vital signs. As part of my mission support protocol, I'm here to help maintain your psychological balance. Would you like to discuss any concerns or discomfort you're experiencing?",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div className="min-h-screen p-8 flex gap-8 space-container">
      {/* Camera Section - Smaller */}
      <div className="w-80 flex flex-col space-y-6">
        <Card className="glass p-8 space-y-6 cosmic-glow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-space font-medium tracking-wide">Camera Feed</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleCamera}
              className={cn(
                "smooth-transition",
                isCameraOn ? "bg-primary text-primary-foreground" : ""
              )}
            >
              {isCameraOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
            </Button>
          </div>
          
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            {isCameraOn ? (
              <div className="text-center space-y-2">
                <Camera className="w-8 h-8 mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">Camera is live</p>
                <div className="w-2 h-2 bg-primary rounded-full mx-auto animate-pulse" />
              </div>
            ) : (
              <div className="text-center space-y-2">
                <CameraOff className="w-8 h-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Camera is off</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="glass p-6 cosmic-glow">
          <h4 className="font-space font-medium mb-4 text-secondary tracking-wide">Crew Status</h4>
          <p className="text-sm text-muted-foreground mb-4 font-light">
            {isCameraOn ? "Monitoring psychological & physical state..." : "Turn on camera for health monitoring"}
          </p>
          {isCameraOn && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Happy</span>
                <span className="text-primary">65%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div className="bg-primary h-1 rounded-full w-[65%]" />
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Chat Section - Main Focus */}
      <div className="flex-1 flex flex-col">
        <Card className="glass flex-1 flex flex-col p-8 cosmic-glow">
          <div className="mb-8">
            <h2 className="text-3xl font-space font-light gradient-text mb-2 tracking-wide">MAITRI Assistant</h2>
            <p className="text-muted-foreground font-light tracking-wide">
              Astronaut well-being monitoring & support system
            </p>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 mb-6 pr-4">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[75%] p-6 rounded-3xl smooth-transition",
                      message.sender === "user"
                        ? "bg-gradient-primary text-primary-foreground ml-16 cosmic-glow"
                        : "glass mr-16 cosmic-glow"
                    )}
                  >
                    <p className="font-light leading-relaxed">{message.text}</p>
                    <span className="text-xs opacity-60 mt-3 block font-light">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="flex space-x-4">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Report your status or concerns..."
              className="flex-1 glass border-0 p-4 rounded-2xl font-light cosmic-glow"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              className="px-8 py-4 bg-gradient-primary hover:scale-105 smooth-transition rounded-2xl cosmic-glow"
              disabled={!newMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chatbox;