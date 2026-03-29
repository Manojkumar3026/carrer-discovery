import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Send, Sparkles, Brain, Palette, Briefcase, MessageSquare, LineChart } from 'lucide-react';
import { cn } from '../lib/utils';

const questions = [
  {
    id: 1,
    text: "What do you enjoy doing most in your free time?",
    options: [
      { text: "Solving puzzles or logic games", category: "coding", icon: Brain },
      { text: "Drawing, painting, or designing things", category: "design", icon: Palette },
      { text: "Planning events or organizing groups", category: "business", icon: Briefcase },
      { text: "Writing stories or talking to people", category: "communication", icon: MessageSquare },
      { text: "Analyzing data or finding patterns", category: "analytical", icon: LineChart },
    ]
  },
  {
    id: 2,
    text: "When faced with a problem, what's your first instinct?",
    options: [
      { text: "Break it down into small, logical steps", category: "coding", icon: Brain },
      { text: "Visualize a creative solution", category: "design", icon: Palette },
      { text: "Look for the most efficient way to solve it", category: "business", icon: Briefcase },
      { text: "Explain it to others and brainstorm", category: "communication", icon: MessageSquare },
      { text: "Research and gather more information", category: "analytical", icon: LineChart },
    ]
  },
  {
    id: 3,
    text: "Which of these sounds like your dream project?",
    options: [
      { text: "Building a complex app or game", category: "coding", icon: Brain },
      { text: "Designing a beautiful brand identity", category: "design", icon: Palette },
      { text: "Starting and running a small business", category: "business", icon: Briefcase },
      { text: "Hosting a popular podcast or writing a book", category: "communication", icon: MessageSquare },
      { text: "Conducting a scientific study", category: "analytical", icon: LineChart },
    ]
  },
  {
    id: 4,
    text: "How do you prefer to work?",
    options: [
      { text: "Deep focus on technical details", category: "coding", icon: Brain },
      { text: "Experimenting with colors and layouts", category: "design", icon: Palette },
      { text: "Leading and coordinating a team", category: "business", icon: Briefcase },
      { text: "Collaborating and sharing ideas", category: "communication", icon: MessageSquare },
      { text: "Systematically testing hypotheses", category: "analytical", icon: LineChart },
    ]
  },
  {
    id: 5,
    text: "What kind of impact do you want to make?",
    options: [
      { text: "Create tools that solve technical problems", category: "coding", icon: Brain },
      { text: "Make the world more beautiful and intuitive", category: "design", icon: Palette },
      { text: "Build a successful and sustainable organization", category: "business", icon: Briefcase },
      { text: "Inspire and connect people through stories", category: "communication", icon: MessageSquare },
      { text: "Discover new insights and truths", category: "analytical", icon: LineChart },
    ]
  },
  {
    id: 6,
    text: "Which of these subjects did you enjoy most in school?",
    options: [
      { text: "Mathematics or Computer Science", category: "coding", icon: Brain },
      { text: "Art or Graphic Design", category: "design", icon: Palette },
      { text: "Economics or Business Studies", category: "business", icon: Briefcase },
      { text: "English, Drama, or Social Studies", category: "communication", icon: MessageSquare },
      { text: "Physics, Chemistry, or Statistics", category: "analytical", icon: LineChart },
    ]
  },
  {
    id: 7,
    text: "How do you like to spend your weekends?",
    options: [
      { text: "Learning a new programming language or building a small script", category: "coding", icon: Brain },
      { text: "Visiting an art gallery or working on a creative project", category: "design", icon: Palette },
      { text: "Networking or planning a new venture", category: "business", icon: Briefcase },
      { text: "Meeting new people or volunteering for a cause", category: "communication", icon: MessageSquare },
      { text: "Reading a non-fiction book or solving complex problems", category: "analytical", icon: LineChart },
    ]
  },
  {
    id: 8,
    text: "What's your favorite way to learn?",
    options: [
      { text: "Hands-on coding and debugging", category: "coding", icon: Brain },
      { text: "Visual tutorials and creative exercises", category: "design", icon: Palette },
      { text: "Case studies and real-world business examples", category: "business", icon: Briefcase },
      { text: "Group discussions and interactive workshops", category: "communication", icon: MessageSquare },
      { text: "In-depth research and data analysis", category: "analytical", icon: LineChart },
    ]
  },
  {
    id: 9,
    text: "Which of these tools would you rather master?",
    options: [
      { text: "VS Code or a powerful IDE", category: "coding", icon: Brain },
      { text: "Figma or Adobe Creative Cloud", category: "design", icon: Palette },
      { text: "Excel, CRM, or Project Management tools", category: "business", icon: Briefcase },
      { text: "Social media platforms or public speaking", category: "communication", icon: MessageSquare },
      { text: "Python for data science or statistical software", category: "analytical", icon: LineChart },
    ]
  },
  {
    id: 10,
    text: "What's your ideal work environment?",
    options: [
      { text: "A quiet space with high-performance hardware", category: "coding", icon: Brain },
      { text: "A vibrant, visually inspiring studio", category: "design", icon: Palette },
      { text: "A fast-paced, high-stakes office or startup", category: "business", icon: Briefcase },
      { text: "A collaborative space with lots of interaction", category: "communication", icon: MessageSquare },
      { text: "A research lab or a data-driven environment", category: "analytical", icon: LineChart },
    ]
  },
  {
    id: 11,
    text: "Scenario: You're stranded on a deserted island. What's your first move?",
    options: [
      { text: "Build a systematic signal fire and shelter", category: "analytical", icon: Sparkles },
      { text: "Organize the other survivors and assign roles", category: "business", icon: Sparkles },
      { text: "Create a beautiful map of the island", category: "design", icon: Sparkles },
      { text: "Invent a new way to catch fish using local materials", category: "coding", icon: Sparkles },
      { text: "Keep everyone's spirits up with stories and songs", category: "communication", icon: Sparkles },
    ]
  },
  {
    id: 12,
    text: "Scenario: You find a mysterious locked box. How do you open it?",
    options: [
      { text: "Look for patterns or hidden mechanisms", category: "coding", icon: Sparkles },
      { text: "Try to find the history of the box for clues", category: "analytical", icon: Sparkles },
      { text: "Appreciate the craftsmanship before trying anything", category: "design", icon: Sparkles },
      { text: "Negotiate with others to help solve it together", category: "communication", icon: Sparkles },
      { text: "Think about the value of what might be inside", category: "business", icon: Sparkles },
    ]
  },
  {
    id: 13,
    text: "Scenario: You're given a blank canvas and 1 hour. What do you do?",
    options: [
      { text: "Sketch a detailed blueprint of a new invention", category: "coding", icon: Sparkles },
      { text: "Paint an abstract representation of your feelings", category: "design", icon: Sparkles },
      { text: "Write a compelling pitch for a new product", category: "business", icon: Sparkles },
      { text: "Draft a speech that could change the world", category: "communication", icon: Sparkles },
      { text: "Create a complex timeline of historical events", category: "analytical", icon: Sparkles },
    ]
  },
  {
    id: 14,
    text: "Scenario: A friend is upset. How do you help?",
    options: [
      { text: "Listen deeply and offer emotional support", category: "communication", icon: Sparkles },
      { text: "Help them analyze the situation logically", category: "analytical", icon: Sparkles },
      { text: "Suggest a creative distraction to cheer them up", category: "design", icon: Sparkles },
      { text: "Offer practical solutions to fix the problem", category: "coding", icon: Sparkles },
      { text: "Help them see the bigger picture and opportunities", category: "business", icon: Sparkles },
    ]
  },
  {
    id: 15,
    text: "Scenario: You're at a party where you don't know anyone. What do you do?",
    options: [
      { text: "Observe the room and find an interesting person to talk to", category: "analytical", icon: Sparkles },
      { text: "Start a conversation and introduce people to each other", category: "communication", icon: Sparkles },
      { text: "Notice the decor and lighting of the venue", category: "design", icon: Sparkles },
      { text: "Think about how the event was organized and its cost", category: "business", icon: Sparkles },
      { text: "Find a quiet corner and think about a project you're working on", category: "coding", icon: Sparkles },
    ]
  }
];

export default function Quiz({ onComplete }: { onComplete: (answers: any) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (category: string) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: category };
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Question {currentStep + 1} of {questions.length}</span>
          <span className="text-xs font-bold text-gray-400">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            {questions[currentStep].text}
          </h2>

          <div className="grid gap-4">
            {questions[currentStep].options.map((option, idx) => {
              const Icon = option.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option.category)}
                  className="group flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-50 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 group-hover:text-indigo-900">{option.text}</p>
                  </div>
                  <div className="w-6 h-6 border-2 border-gray-200 rounded-full flex items-center justify-center group-hover:border-indigo-600 transition-colors">
                    <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex justify-between">
        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
          className={cn(
            "flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors",
            currentStep === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-indigo-600"
          )}
        >
          <ChevronLeft size={18} />
          Back
        </button>
      </div>
    </div>
  );
}
