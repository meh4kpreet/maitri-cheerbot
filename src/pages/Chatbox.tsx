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
    <div className="min-h-screen p-8 flex gap-6">
      {/* Camera Section - Smaller */}
      <div className="w-80 flex flex-col space-y-4">
        <Card className="glass p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Camera Feed</h3>
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

        <Card className="glass p-4">
          <h4 className="font-medium mb-2 text-secondary">Crew Status</h4>
          <p className="text-sm text-muted-foreground mb-2">
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
        <Card className="glass flex-1 flex flex-col p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold gradient-text">MAITRI Assistant</h2>
            <p className="text-muted-foreground">
              Astronaut well-being monitoring & support system
            </p>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 mb-4 pr-4">
            <div className="space-y-4">
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
                      "max-w-[80%] p-4 rounded-2xl smooth-transition",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-12"
                        : "glass mr-12"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Report your status or concerns..."
              className="flex-1 glass border-0"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              className="px-6 bg-gradient-primary hover:scale-105 smooth-transition"
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chatbox;