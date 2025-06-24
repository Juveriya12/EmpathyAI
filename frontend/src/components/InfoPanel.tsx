import React from 'react';
import { X } from 'lucide-react';

interface InfoPanelProps {
    onClose: () => void;
    isDarkMode: boolean;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ onClose, isDarkMode }) => {
    return (
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center bg-opacity-50 z-10 w-full`}>
            <div className={`p-6 rounded-lg max-sm:w-[90%] w-[500px] shadow-gray-200 shadow-[0px_0px_2px]  ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">About EmpathyAI</h2>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="space-y-4">
                    <p>
                        EmpathyAI is a mental health companion designed to provide support, guidance, and tools to help maintain emotional well-being.
                    </p>
                    <h3 className="font-bold text-lg">Features:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Supportive conversation with an AI companion</li>
                        <li>Mood tracking to monitor your emotional state</li>
                        <li>Breathing exercises for stress reduction</li>
                        <li>Personalized suggestions based on your needs</li>
                    </ul>
                    <p className="text-sm text-gray-500 mt-4">
                        This application is designed as an educational project and is not a substitute for professional mental health care. If you're experiencing severe distress, please contact a mental health professional.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoPanel;