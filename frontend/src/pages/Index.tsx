
import { useState, useEffect } from "react";
import { Compass, Heart, Brain, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
// import MoodTracker from "@/components/MoodTracker";
import ResourceCard from "@/components/ResourceCard";
import WellnessWidget from "@/components/WellnessWidget";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for user's preferred color scheme
  useEffect(() => {
    const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(darkModePreference);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Add/remove dark class based on state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="h-screen flex flex-col bg-background dark:bg-background overflow-hidden">
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      <main className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-4 pr-4 max-lg:p-0">
        {/* Chat Interface - Central Column */}
        <div className="lg:col-span-8 xl:col-span-8 flex flex-col h-full overflow-scroll">
          <ChatInterface className="flex-1 shadow-sm animate-fade-in" />
        </div>

        {/* Side Panel - Right Column */}
        <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-4 h-full overflow-y-auto py-4 max-lg:hidden">
          {/* Mood Tracker */}
          {/* <MoodTracker className="animate-fade-in" style={{ animationDelay: "100ms" }} /> */}

          {/* Wellness Activity */}
          <WellnessWidget className="animate-fade-in" style={{ animationDelay: "200ms" }} />

          {/* Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h3 className="font-medium text-sm mb-3">Resources</h3>
            <div className="space-y-3">
              <ResourceCard
                title="Understanding Anxiety"
                description="Learn about the symptoms, causes, and treatments for anxiety disorders."
                icon={<Brain className="w-4 h-4 text-primary" />}
                link={"https://www.medicalnewstoday.com/articles/323454"}
              />
              <ResourceCard
                title="Mindfulness Techniques"
                description="Practical mindfulness exercises you can incorporate into your daily routine."
                icon={<Brain className="w-4 h-4 text-primary" />}
                link={"https://www.calm.com/blog/mindfulness-exercises"}
              />
              <ResourceCard
                title="Self-Care Practices"
                description="Simple self-care strategies to support your mental health and wellbeing."
                icon={<Heart className="w-4 h-4 text-primary" />}
                link={"https://positivepsychology.com/mindfulness-exercises-techniques-activities/"}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
