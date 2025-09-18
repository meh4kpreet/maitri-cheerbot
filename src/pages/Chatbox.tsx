import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Camera, CameraOff, Play, Square, Upload, Video, Eye, Send as ProcessIcon } from "lucide-react";
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
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const toggleRecording = () => {
    const newRecordingState = !isRecording;
    setIsRecording(newRecordingState);
    // Auto-activate camera when recording starts
    setIsCameraOn(newRecordingState);
    
    // Simulate recording completion and create a mock video URL
    if (!newRecordingState && isRecording) {
      // Simulate recorded video (in real implementation, this would be the actual recorded blob URL)
      setRecordedVideo("mock-recorded-video.mp4");
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setUploadedVideo(file);
      setIsCameraOn(true); // Activate camera when video is uploaded
      setRecordedVideo(null); // Clear any recorded video
    }
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleProcess = async () => {
    if (!uploadedVideo && !recordedVideo) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // Add AI response about the processed video
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I've analyzed your ${uploadedVideo ? 'uploaded' : 'recorded'} video. Based on facial expressions and body language, I detect you appear calm but slightly fatigued. I recommend taking a 10-minute relaxation break and some deep breathing exercises. Your emotional state shows resilience, which is excellent for mission operations.`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 3000);
  };

  return (
    <div className="min-h-screen p-8 flex gap-6">
      {/* Recording Section - Smaller */}
      <div className="w-80 flex flex-col space-y-4">
        <Card className="glass p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recording Area</h3>
            <div className="flex gap-2">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
                id="video-upload"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('video-upload')?.click()}
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            {showPreview && (uploadedVideo || recordedVideo) ? (
              <div className="w-full h-full bg-black/20 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Video className="w-12 h-12 mx-auto text-primary" />
                  <p className="text-sm text-primary font-medium">Video Preview</p>
                  <p className="text-xs text-muted-foreground">
                    {uploadedVideo ? uploadedVideo.name : "Recorded Video"}
                  </p>
                </div>
              </div>
            ) : uploadedVideo ? (
              <div className="text-center space-y-2">
                <Video className="w-8 h-8 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground">Video uploaded</p>
                <p className="text-xs text-primary font-medium">{uploadedVideo.name}</p>
              </div>
            ) : recordedVideo ? (
              <div className="text-center space-y-2">
                <Video className="w-8 h-8 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground">Video recorded</p>
                <p className="text-xs text-primary font-medium">Ready for analysis</p>
              </div>
            ) : isCameraOn ? (
              <div className="text-center space-y-2">
                <Camera className="w-8 h-8 mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">
                  {isRecording ? "Recording..." : "Camera ready"}
                </p>
                {isRecording && (
                  <div className="w-2 h-2 bg-red-500 rounded-full mx-auto animate-pulse" />
                )}
              </div>
            ) : (
              <div className="text-center space-y-2">
                <CameraOff className="w-8 h-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Start recording or upload video</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="glass p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-secondary">Recording Controls</h4>
          </div>
          <div className="flex justify-center gap-2 mb-3">
            <Button
              variant={isRecording ? "destructive" : "default"}
              size="sm"
              onClick={toggleRecording}
              className="smooth-transition"
            >
              {isRecording ? (
                <Square className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span className="ml-1">
                {isRecording ? "Stop" : "Start"}
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
              disabled={!uploadedVideo && !recordedVideo}
              className={cn(
                "smooth-transition",
                showPreview ? "bg-primary text-primary-foreground" : ""
              )}
            >
              <Eye className="w-4 h-4" />
              <span className="ml-1">Preview</span>
            </Button>
          </div>
          
          <div className="flex justify-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleProcess}
              disabled={(!uploadedVideo && !recordedVideo) || isProcessing}
              className="smooth-transition w-full"
            >
              <ProcessIcon className="w-4 h-4" />
              <span className="ml-2">
                {isProcessing ? "Processing..." : "Upload & Process"}
              </span>
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {isProcessing ? "Analyzing video for emotional state..." :
             isRecording ? "Recording in progress..." : 
             (uploadedVideo || recordedVideo) ? "Video ready for analysis" :
             "Record or upload video to begin"}
          </p>
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