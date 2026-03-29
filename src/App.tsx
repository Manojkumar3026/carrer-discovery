import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, signInWithGoogle, handleFirestoreError, OperationType } from './firebase';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import Layout from './components/Layout';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Roadmap from './components/Roadmap';
import Chat from './components/Chat';
import { UserProfile, QuizResult } from './types';
import { analyzeQuizResults } from './lib/gemini';
import { Compass, Sparkles, ArrowRight, Brain, Palette, Briefcase, MessageSquare, LineChart, Trophy, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';

function LandingPage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className="space-y-32 py-20">
      <section className="text-center space-y-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold uppercase tracking-widest"
          >
            <Sparkles size={16} />
            Discover Your Potential
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-8xl font-black text-gray-900 tracking-tight leading-[0.9]"
          >
            Career GPS <br />
            <span className="text-indigo-600">for Youth.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Stop guessing. Start growing. Our AI-powered discovery engine helps you find your hidden talents and maps out your path to success.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={async () => {
              if (!user) await signInWithGoogle();
              navigate('/quiz');
            }}
            className="bg-indigo-600 text-white px-10 py-5 rounded-3xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center gap-3 group"
          >
            Start Your Discovery
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-10 py-5 rounded-3xl font-bold text-xl text-gray-600 hover:bg-gray-50 transition-all">
            How it works
          </button>
        </motion.div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          { icon: Brain, title: "Smart Discovery", desc: "Our AI analyzes your natural inclinations through scenario-based questions." },
          { icon: Trophy, title: "Personalized Roadmap", desc: "Get a step-by-step learning path tailored to your specific strengths." },
          { icon: MessageSquare, title: "AI Mentorship", desc: "Chat with your personal career mentor anytime you need guidance." }
        ].map((feature, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 transition-transform">
              <feature.icon size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
            <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-indigo-900 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold leading-tight">
              Ready to find what you're truly good at?
            </h2>
            <p className="text-indigo-100 text-xl leading-relaxed">
              Join thousands of students who have discovered their career paths through SkillDiscovery. The first step is always the hardest—we make it easy.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-4xl font-black">10k+</p>
                <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest mt-1">Users</p>
              </div>
              <div>
                <p className="text-4xl font-black">50+</p>
                <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest mt-1">Skill Paths</p>
              </div>
              <div>
                <p className="text-4xl font-black">98%</p>
                <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest mt-1">Accuracy</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-8 border border-white/10 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center"><Star className="fill-white" /></div>
              <div>
                <p className="font-bold">"Found my passion in Design!"</p>
                <p className="text-xs text-indigo-300">Sarah, 19</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl ml-8">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center"><Zap className="fill-white" /></div>
              <div>
                <p className="font-bold">"The roadmap was so clear."</p>
                <p className="text-xs text-indigo-300">Alex, 21</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center"><Compass className="fill-white" /></div>
              <div>
                <p className="font-bold">"AI Mentor is a game changer."</p>
                <p className="text-xs text-indigo-300">James, 18</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeRoadmap, setActiveRoadmap] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/');
    if (user) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.data() as UserProfile);
        } else {
          const newProfile: UserProfile = {
            uid: user.uid,
            displayName: user.displayName || 'User',
            email: user.email || '',
            photoURL: user.photoURL || undefined,
            onboardingComplete: false,
            progress: { completedSteps: [], enrolledSkills: [] }
          };
          setDoc(doc(db, 'users', user.uid), newProfile);
          setProfile(newProfile);
        }
      }, (error) => handleFirestoreError(error, OperationType.GET, `users/${user.uid}`));
      return () => unsubscribe();
    }
  }, [user, loading, navigate]);

  const handleQuizComplete = async (answers: any) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeQuizResults(answers);
      const quizResult: QuizResult = {
        ...result,
        timestamp: Date.now()
      };
      await updateDoc(doc(db, 'users', user!.uid), {
        onboardingComplete: true,
        lastQuizResult: quizResult
      });
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleToggleStep = async (stepTitle: string) => {
    if (!profile) return;
    const currentSteps = profile.progress.completedSteps;
    const newSteps = currentSteps.includes(stepTitle)
      ? currentSteps.filter(s => s !== stepTitle)
      : [...currentSteps, stepTitle];
    
    await updateDoc(doc(db, 'users', user!.uid), {
      'progress.completedSteps': newSteps
    });
  };

  if (loading || isAnalyzing) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-indigo-100 rounded-full animate-spin border-t-indigo-600" />
          <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
            <Sparkles size={32} className="animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">{isAnalyzing ? "AI is Analyzing Your Potential..." : "Loading Your Journey..."}</h2>
          <p className="text-gray-500">This will only take a moment.</p>
        </div>
      </div>
    );
  }

  if (!profile?.onboardingComplete) {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  if (activeRoadmap) {
    const recommendation = profile.lastQuizResult?.recommendations.find(r => r.skill === activeRoadmap);
    if (recommendation) {
      return (
        <Roadmap 
          skill={activeRoadmap}
          steps={recommendation.roadmap}
          completedSteps={profile.progress.completedSteps}
          onToggleStep={handleToggleStep}
          onBack={() => setActiveRoadmap(null)}
        />
      );
    }
  }

  return <Results result={profile.lastQuizResult!} onStartRoadmap={setActiveRoadmap} />;
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
