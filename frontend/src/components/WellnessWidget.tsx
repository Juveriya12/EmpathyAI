import React, { useEffect, useState } from "react";
import { Heart, Award, Brain, BookOpen, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WellnessWidgetProps {
  className?: string;
  style?: React.CSSProperties;
}

interface TipType {
  id: number;
  category: string;
  text: string;
  icon: React.ReactNode;
}

const wellnessTips: TipType[] = [
  {
    id: 1,
    category: "Mindfulness",
    text: "Take 5 deep breaths, focusing on each inhale and exhale.",
    icon: <Brain className="w-4 h-4 text-primary" />,
  },
  {
    id: 2,
    category: "Self-Care",
    text: "Drink a glass of water and stretch for 2 minutes.",
    icon: <Heart className="w-4 h-4 text-primary" />,
  },
  {
    id: 3,
    category: "Reflection",
    text: "Write down 3 things you're grateful for today.",
    icon: <BookOpen className="w-4 h-4 text-primary" />,
  },
];

const encouragementMessages = [
  "You're crushing it! 🎉",
  "Small steps lead to big changes! 💪",
  "You're unstoppable! 🚀",
  "That was amazing! Keep going! ✨",
];

const WellnessWidget: React.FC<WellnessWidgetProps> = ({ className = "", style = {} }) => {
  const { toast } = useToast();
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const LOCAL_STORAGE_KEY = "wellnessProgress";

  // Function to check if it's a new day
  const isNewDay = (storedDate: string) => {
    const today = new Date().toDateString();
    return storedDate !== today;
  };

  useEffect(() => {
    // Load progress from localStorage
    const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");

    if (savedData?.date && !isNewDay(savedData.date)) {
      setCompletedTasks(savedData.tasks || []);
    } else {
      // If it's a new day, reset progress
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage
    const today = new Date().toDateString();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ tasks: completedTasks, date: today }));
  }, [completedTasks]);

  const handleCompleteTip = () => {
    if (completedTasks.length >= wellnessTips.length) return;

    setProgress(100);

    setTimeout(() => {
      setShowConfetti(true);
      toast({
        title: "🎉 Activity Completed!",
        description: encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)],
        duration: 3000,
      });

      setTimeout(() => {
        setShowConfetti(false);
        setProgress(0);

        setCompletedTasks((prev) => {
          const newCompleted = [...prev, prev.length];

          if (newCompleted.length >= wellnessTips.length) {
            setTimeout(() => {
              toast({
                title: "Daily Tasks Completed!",
                description: "Great job! Come back tomorrow for new activities!",
                duration: 5000,
              });
            }, 1000);
          }

          return newCompleted;
        });
      }, 2000);
    }, 1000);
  };

  const remainingTask = wellnessTips.find((_, index) => !completedTasks.includes(index));

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow ${className}`} style={style}>
      <div className="p-4 relative">
        {showConfetti && (
          <div className="absolute inset-0 animate-confetti bg-transparent pointer-events-none"></div>
        )}

        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-sm flex items-center gap-1">
            <Award className="w-4 h-4 text-primary" />
            <span>Wellness Activity</span>
          </h3>
          <button
            className="text-xs text-gray-500 dark:text-gray-400"
            disabled
          >
            <Clock className="w-3.5 h-3.5" />
          </button>
        </div>

        {remainingTask ? (
          <>
            <div className="mb-4">
              <div className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 text-xs font-medium py-1 px-2 rounded-md inline-flex items-center mb-2">
                {remainingTask.icon}
                <span className="ml-1">{remainingTask.category}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out">
                {remainingTask.text}
              </p>
            </div>

            {/* Fake Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              onClick={handleCompleteTip}
              className="w-full py-2 px-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              I did this
            </button>
          </>
        ) : (
          <div className="text-center text-sm text-gray-700 dark:text-gray-300">
            🎉 <strong>Daily Tasks Completed!</strong> <br />
            Come back tomorrow for new activities!
          </div>
        )}
      </div>
    </div>
  );
};

export default WellnessWidget;
