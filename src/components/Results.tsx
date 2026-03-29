import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, BookOpen, PlayCircle, FileText } from 'lucide-react';
import { QuizResult, SkillRecommendation } from '../types';
import { cn } from '../lib/utils';

export default function Results({ result, onStartRoadmap }: { result: QuizResult, onStartRoadmap: (skill: string) => void }) {
  const topSkill = result.recommendations[0];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold uppercase tracking-wider"
        >
          <Sparkles size={16} />
          Discovery Complete
        </motion.div>
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Your Career GPS is Ready.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Based on your natural inclinations and problem-solving style, we've identified your strongest potential paths.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(result.scores).map(([category, score], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50 transition-all group"
          >
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-indigo-500 transition-colors">{category}</h3>
              <span className="text-3xl font-black text-gray-900">{score}%</span>
            </div>
            <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {result.hiddenTalent && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-8 rounded-[3rem] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Sparkles size={120} className="text-amber-600" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-xs font-bold uppercase tracking-widest">
              Hidden Talent Detected
            </div>
            <h2 className="text-3xl font-bold text-amber-900">{result.hiddenTalent.title}</h2>
            <p className="text-amber-800/80 text-lg max-w-2xl leading-relaxed">
              {result.hiddenTalent.description}
            </p>
          </div>
        </motion.div>
      )}

      <div className="bg-indigo-900 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest">
              Top Recommendation
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              You are {topSkill.percentage}% suited for {topSkill.skill}
            </h2>
            <p className="text-indigo-100 text-lg leading-relaxed">
              {topSkill.description}
            </p>
            <button 
              onClick={() => onStartRoadmap(topSkill.skill)}
              className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all flex items-center gap-3 group"
            >
              Start Learning Path
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-300">Your First Steps</h4>
            <div className="space-y-3">
              {topSkill.roadmap.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-8 h-8 bg-indigo-500/30 rounded-lg flex items-center justify-center text-indigo-200 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-bold text-white">{step.title}</h5>
                    <p className="text-sm text-indigo-200">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {result.recommendations.slice(1).map((rec, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{rec.skill}</h3>
              <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-xs font-bold">{rec.percentage}% Match</span>
            </div>
            <p className="text-gray-500 mb-6 leading-relaxed">{rec.description}</p>
            <button 
              onClick={() => onStartRoadmap(rec.skill)}
              className="text-indigo-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
            >
              Explore Path <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
