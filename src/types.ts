export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  onboardingComplete: boolean;
  lastQuizResult?: QuizResult;
  progress: Progress;
}

export interface QuizResult {
  scores: {
    coding: number;
    design: number;
    business: number;
    communication: number;
    analytical: number;
  };
  recommendations: SkillRecommendation[];
  hiddenTalent?: {
    title: string;
    description: string;
  };
  timestamp: number;
}

export interface SkillRecommendation {
  skill: string;
  percentage: number;
  description: string;
  roadmap: RoadmapStep[];
}

export interface RoadmapStep {
  title: string;
  description: string;
  resources: Resource[];
  completed: boolean;
}

export interface Resource {
  title: string;
  url: string;
  type: 'video' | 'course' | 'article';
}

export interface Progress {
  completedSteps: string[]; // IDs or titles of completed roadmap steps
  enrolledSkills: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
