"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mic, Send, ChevronDown, ChevronUp, Play, Search, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState("");
  const [audioData, setAudioData] = useState(Array(30).fill(0));
  const animationRef = useRef();

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState(null);


  useEffect(() => {
    if (isRecording) {
      const updateAudioData = () => {
        setAudioData((prev) =>
          prev.map(() => {
            const baseHeight = 20;
            const randomHeight = Math.random() * 60;
            const sinWave = Math.sin(Date.now() / 200) * 20;
            return baseHeight + randomHeight + Math.abs(sinWave);
          })
        );
        animationRef.current = requestAnimationFrame(updateAudioData);
      };
      animationRef.current = requestAnimationFrame(updateAudioData);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setAudioData(Array(30).fill(2));
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRecording]);

  useEffect(() => {
    const fetchMessages = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMessages([
        { id: 1, text: "Hello, how can I assist you today?", sender: "agent", timestamp: "10:00 AM", hasAudio: true },
        { id: 2, text: "I need help with my account settings", sender: "user", timestamp: "10:01 AM" },
        { id: 3, text: "I'll be happy to help you with that. Which settings are you looking to adjust?", sender: "agent", timestamp: "10:02 AM", hasAudio: true },
      ]);
      setLoadingMessages(false);
    };

    const fetchNotes = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setNotes([
        { id: 1, text: "Customer mentioned issues with account settings", timestamp: "10:00 AM" },
        { id: 2, text: "Need to follow up about premium features", timestamp: "10:01 AM" },
        { id: 3, text: "Customer requested email documentation", timestamp: "10:02 AM" },
      ]);
      setLoadingNotes(false);
    };

    fetchMessages();
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => note.text.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleRecording = () => setIsRecording(!isRecording);

  const handleSend = () => {
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <main className="flex min-h-screen bg-black">
      {/* Left Side - Input Section */}
      <div className="w-1/3 border-r border-gray-800 p-6 flex flex-col">
        <Card className="p-6 flex-1 flex flex-col bg-gray-900 border-gray-800">
          <div className="flex-1">
            <Textarea
              placeholder="Type your message here..."
              className="min-h-[200px] resize-none mb-6 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-primary"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="border border-gray-800 rounded-lg p-6 mb-6 bg-gray-900/50">
              <Button
                variant={isRecording ? "destructive" : "secondary"}
                className={`w-full mb-4 ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-gray-800 hover:bg-gray-700"}`}
                onClick={toggleRecording}
              >
                <Mic className={`mr-2 h-4 w-4 ${isRecording ? "animate-pulse" : ""}`} />
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
              <div className="h-24 flex items-center justify-center gap-[2px]">
                {audioData.map((height, index) => (
                  <div
                    key={index}
                    className="w-1.5 bg-primary rounded-full transition-all duration-75"
                    style={{
                      height: `${height}%`,
                      opacity: isRecording ? "1" : "0.3",
                      transform: `scaleY(${isRecording ? "1" : "0.1"})`,
                      transition: "all 150ms ease-in-out",
                    }}
                  />
                ))}
              </div>
              {isRecording && <p className="text-sm text-primary mt-4 animate-pulse text-center">Recording in progress...</p>}
            </div>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg font-medium"
              onClick={handleSend}
              disabled={!message && !isRecording}
            >
              <Send className="mr-3 h-5 w-5" />
              Send
            </Button>
          </div>
        </Card>
      </div>

      {/* Right Side - Chat and Notes */}
      <div className="flex-1 p-6 bg-black">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="bg-[#1e2433] rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveSection(activeSection === "chat" ? null : "chat")}
              className="w-full p-4 flex items-center justify-between text-gray-200 hover:bg-[#272d3d] transition-colors"
            >
              <span>Chat History</span>
              {activeSection === "chat" ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {activeSection === "chat" && (
              <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
                {loadingMessages ? (
                  <div className="p-6 flex justify-center items-center text-gray-400">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading conversation...</span>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="max-w-[80%]">
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === "user" ? "bg-[#272d3d] text-gray-200" : "bg-[#323846] text-gray-200"
                          }`}
                        >
                          {message.text}
                        </div>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-xs text-gray-400">{message.timestamp}</span>
                          {message.hasAudio && (
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-200">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="bg-[#1e2433] rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveSection(activeSection === "notes" ? null : "notes")}
              className="w-full p-4 flex items-center justify-between text-gray-200 hover:bg-[#272d3d] transition-colors"
            >
              <span>Call Notes</span>
              {activeSection === "notes" ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {activeSection === "notes" && (
              <div className="p-4 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-[#272d3d] border-none text-gray-200 placeholder:text-gray-400"
                  />
                </div>
                {loadingNotes ? (
                  <div className="flex justify-center items-center text-gray-400 py-4">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading notes...</span>
                  </div>
                ) : filteredNotes.length > 0 ? (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {filteredNotes.map((note) => (
                      <div key={note.id} className="bg-[#272d3d] p-3 rounded-lg">
                        <p className="text-gray-200">{note.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{note.timestamp}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-4">
                    {searchQuery ? "No matching notes found" : "No notes available"}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
