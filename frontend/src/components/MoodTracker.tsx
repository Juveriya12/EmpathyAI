
import React, { useState } from "react";
import { BarChart, Calendar, Smile, SmilePlus, LineChart } from "lucide-react";

interface MoodTrackerProps {
  className?: string;
  style: {}
}

const moodEntries = [
  { date: "Mon", mood: 3 },
  { date: "Tue", mood: 4 },
  { date: "Wed", mood: 2 },
  { date: "Thu", mood: 3 },
  { date: "Fri", mood: 4 },
  { date: "Sat", mood: 5 },
  { date: "Sun", mood: 4 },
];

const moodColors = [
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-blue-400",
];

const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Excellent"];

const MoodTracker: React.FC<MoodTrackerProps> = ({ className = "", style = {} }) => {
  const [selectedView, setSelectedView] = useState<"chart" | "calendar">("chart");
  const [activeMood, setActiveMood] = useState<number | null>(null);

  const handleAddMood = (level: number) => {
    setActiveMood(level);
    // In a real app, you would save this to your backend
    console.log(`Mood recorded: ${level}`);

    // Reset after a moment
    setTimeout(() => setActiveMood(null), 1000);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 ${className}`} style={style}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-sm">Mood Tracker</h3>
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
          <button
            className={`px-2.5 py-1 text-xs rounded-md transition-colors ${selectedView === "chart" ? "bg-white dark:bg-gray-600 shadow-sm" : ""
              }`}
            onClick={() => setSelectedView("chart")}
          >
            <LineChart className="w-3.5 h-3.5" />
          </button>
          <button
            className={`px-2.5 py-1 text-xs rounded-md transition-colors ${selectedView === "calendar" ? "bg-white dark:bg-gray-600 shadow-sm" : ""
              }`}
            onClick={() => setSelectedView("calendar")}
          >
            <Calendar className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {selectedView === "chart" ? (
        <div className="h-24 flex items-end justify-between mt-2 mb-1">
          {moodEntries.map((entry, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div
                className="w-5 bg-primary/30 dark:bg-primary/20 rounded-t-sm"
                style={{ height: `${entry.mood * 20}%` }}
              ></div>
              <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">{entry.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1 mt-2 mb-1">
          {moodEntries.map((entry, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full ${moodColors[entry.mood - 1]} opacity-80`}></div>
              <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">{entry.date}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-xs font-medium mb-2">How are you feeling today?</h4>
        <div className="flex justify-between px-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => handleAddMood(level)}
              className={`mood-tracker-dot w-6 h-6 rounded-full flex items-center justify-center ${activeMood === level ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-800" : ""
                }`}
            >
              <div className={`w-4 h-4 rounded-full ${moodColors[level - 1]}`}></div>
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-1 px-1">
          {moodLabels.map((label, idx) => (
            <span key={idx} className="text-[10px] text-gray-500 dark:text-gray-400" style={{ maxWidth: "40px", textAlign: "center" }}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
