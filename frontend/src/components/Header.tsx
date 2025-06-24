import React, { useState } from "react";
import { Moon, Sun, Info, Settings, UserRound, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InfoPanel from "./InfoPanel";

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  return (
    <header className="w-full py-3 px-4 flex items-center justify-between glass-effect dark:glass-effect-dark border-b border-white/20 dark:border-white/5 z-10">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-semibold text-sm"></span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight hidden sm:block">EmpathyAI</h1>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowInfoPanel(true)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="About this app"
          >
            <Info className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fade-in">
            <button
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                toast({ title: "Profile", description: "User profile feature coming soon.", duration: 3000 });
                setIsMenuOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <UserRound className="w-4 h-4" />
                <span>Profile</span>
              </div>
            </button>
            <button
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                toast({ title: "Settings", description: "Settings feature coming soon.", duration: 3000 });
                setIsMenuOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {showInfoPanel && <InfoPanel onClose={() => setShowInfoPanel(false)} isDarkMode={isDarkMode} />}
    </header>
  );
};

export default Header;
