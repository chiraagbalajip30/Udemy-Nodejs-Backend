import { useState, useRef, useEffect } from "react";
import { Mic, Square } from "lucide-react";

const CreateNote = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const recognitionRef = useRef(null);

  // ✅ Initialize Speech Recognition properly
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // ✅ Handle voice result (NO DUPLICATES)
    recognition.onresult = (event) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        setContent((prev) =>
          prev ? prev + " " + finalTranscript.trim() : finalTranscript.trim(),
        );
      }
    };

    // 🔁 Restart automatically if still recording
    recognition.onend = () => {
      if (recognitionRef.current && isRecording) {
        recognitionRef.current.start();
      }
    };

    recognitionRef.current = recognition;

    // 🧹 Cleanup
    return () => {
      recognition.stop();
    };
  }, [isRecording]);

  // 🎤 Start Recording
  const startRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    setIsRecording(true);
    recognitionRef.current.start();
  };

  // ⏹ Stop Recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  // ➕ Create Note
  const handleSubmit = () => {
    if (!title.trim()) return;

    onCreate(title, content);

    setTitle("");
    setContent("");
  };

  return (
    <div className="mb-8 rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6 shadow-xl">
      <h2 className="mb-5 text-lg font-medium text-slate-100">
        Create New Note
      </h2>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Title</label>
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 transition"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Content</label>
          <textarea
            placeholder="Write your note or use voice input..."
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 resize-y transition"
          />
        </div>

        {/* 🎤 Voice Recording Button */}
        <div className="pt-2">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="w-full flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 text-slate-200 font-medium py-3 px-5 rounded-xl transition-all active:scale-95"
            >
              <Mic className="w-5 h-5 text-cyan-400" />
              <span>Start Voice Recording</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="w-full flex items-center justify-center gap-2.5 bg-red-600/90 hover:bg-red-700 text-white font-medium py-3 px-5 rounded-xl transition-all active:scale-95 animate-pulse"
            >
              <Square className="w-4 h-4" fill="white" />
              <span>Stop Recording</span>
              <div className="w-2 h-2 rounded-full bg-white animate-ping" />
            </button>
          )}
        </div>

        {/* Add Note */}
        <button
          onClick={handleSubmit}
          className="w-full mt-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 rounded-xl transition active:scale-95"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default CreateNote;
