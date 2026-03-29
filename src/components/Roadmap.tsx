import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, PlayCircle, BookOpen, FileText, ExternalLink, ArrowLeft, Sparkles, Trophy } from 'lucide-react';
import { RoadmapStep, Resource } from '../types';
import { cn } from '../lib/utils';

export default function Roadmap({ 
  skill, 
  steps, 
  completedSteps, 
  onToggleStep, 
  onBack 
}: { 
  skill: string, 
  steps: RoadmapStep[], 
  completedSteps: string[], 
  onToggleStep: (stepTitle: string) => void,
  onBack: () => void
}) {
  const progress = (completedSteps.length / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Results
        </button>
        <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full text-sm font-bold">
          <Trophy size={18} />
          {completedSteps.length} / {steps.length} Steps
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Mastering {skill}
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl">
          Your personalized roadmap to becoming an expert. Complete each step to track your progress.
        </p>
      </div>

      <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden mb-12">
        <motion.div 
          className="h-full bg-indigo-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="space-y-8 relative">
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-100 -z-10" />
        
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.title);
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "flex gap-8 p-8 bg-white border rounded-3xl transition-all group",
                isCompleted ? "border-indigo-100 bg-indigo-50/20" : "border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50"
              )}
            >
              <button 
                onClick={() => onToggleStep(step.title)}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all flex-shrink-0",
                  isCompleted ? "bg-indigo-600 text-white" : "bg-gray-50 text-gray-300 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                )}
              >
                {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>

              <div className="space-y-6 flex-1">
                <div>
                  <h3 className={cn(
                    "text-2xl font-bold transition-colors",
                    isCompleted ? "text-indigo-900" : "text-gray-900"
                  )}>{step.title}</h3>
                  <p className="text-gray-500 mt-2 leading-relaxed">{step.description}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {step.resources.map((resource, rIdx) => (
                    <a 
                      key={rIdx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100 group/link"
                    >
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover/link:text-indigo-600 transition-colors shadow-sm">
                        {resource.type === 'video' && <PlayCircle size={20} />}
                        {resource.type === 'course' && <BookOpen size={20} />}
                        {resource.type === 'article' && <FileText size={20} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{resource.title}</p>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover/link:text-indigo-400">{resource.type}</p>
                      </div>
                      <ExternalLink size={14} className="text-gray-300 group-hover/link:text-indigo-300" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {progress === 100 && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-indigo-900 p-12 rounded-[3rem] text-center text-white space-y-6 shadow-2xl shadow-indigo-200"
        >
          <div className="w-20 h-20 bg-indigo-500/30 rounded-3xl flex items-center justify-center text-indigo-200 mx-auto mb-4">
            <Trophy size={48} />
          </div>
          <h2 className="text-4xl font-bold">Congratulations!</h2>
          <p className="text-indigo-100 text-lg max-w-lg mx-auto">
            You've completed the foundational roadmap for {skill}. You're well on your way to becoming a professional.
          </p>
          <button 
            onClick={onBack}
            className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all"
          >
            Explore More Skills
          </button>
        </motion.div>
      )}
    </div>
  );
}
