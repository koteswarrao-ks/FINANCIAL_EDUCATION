import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Profile {
  childId: string;
  name: string;
  age: number;
  grade: string;
  country: string;
  personalization: {
    hobbies: string[];
    favoriteSubjects: string[];
    preferredLearningStyle: string;
    pocketMoney: {
      frequency: string;
      amount: number;
      currency: string;
    };
  };
}

export interface ProfileAnalysisResponse {
  success: boolean;
  profile: Profile;
  reasoning: {
    hobbies: string;
    subjects: string;
    learningStyle: string;
    pocketMoney: string;
  };
  llm_call_details?: any;
}

export interface Story {
  storyId: string;
  title: string;
  concept: string;
  difficulty: string;
  theme: string;
  fullStoryText: string;
  panels: Array<{
    panelId: number;
    text: string;
  }>;
  learningPoints: string[];
  nextRecommendedConcept: string;
  childId: string;
}

export interface StoryResponse {
  success: boolean;
  story: Story;
  llm_call_details?: any;
}

export interface Quiz {
  quizId: string;
  concept: string;
  difficulty: string;
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
}

export interface QuizResponse {
  success: boolean;
  quiz: Quiz;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  // Use localhost for local development, change to network IP if accessing from another device
  private apiUrl = 'http://localhost:8000/api'; // Backend API URL
  public currentProfile: Profile | null = null; // Store profile for other components
  public currentStory: Story | null = null; // Store story for other components
  public currentChildId: string | null = null; // Store logged-in child ID
  public currentChildName: string | null = null; // Store logged-in child name
  public llmCallDetails: any = null; // Store LLM call details globally
  public showLLMPanel: boolean = false; // Panel visibility state

  // Navigation functions (to be set by AppComponent)
  public navigateToHome: (() => void) | null = null;
  public navigateToStory: (() => void) | null = null;
  public navigateToQuiz: (() => void) | null = null;
  public navigateToRewards: (() => void) | null = null;
  public navigateToLeaderboard: (() => void) | null = null;
  public navigateToLogin: (() => void) | null = null;

  constructor(private http: HttpClient) {}

  analyzeProfile(childId: string): Observable<ProfileAnalysisResponse> {
    return this.http.post<ProfileAnalysisResponse>(`${this.apiUrl}/profile/analyze`, {
      child_id: childId
    }).pipe(
      tap((response) => {
        // Store LLM call details if available
        if (response.llm_call_details) {
          this.llmCallDetails = response.llm_call_details;
        }
      })
    );
  }

  generateStory(profile: Profile): Observable<StoryResponse> {
    return this.http.post<StoryResponse>(`${this.apiUrl}/story/generate`, {
      profile: profile
    }).pipe(
      tap((response) => {
        // Store LLM call details if available
        if (response.llm_call_details) {
          this.llmCallDetails = response.llm_call_details;
        }
      })
    );
  }

  generateQuiz(story: Story, profile?: Profile): Observable<QuizResponse> {
    const body: any = { story: story };
    if (profile) {
      body.profile = profile;
    }
    return this.http.post<QuizResponse>(`${this.apiUrl}/quiz/generate`, body);
  }

  startLearningJourney(childId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/start/${childId}`).pipe(
      tap((response) => {
        // Store profile and story in service
        if (response.profile) {
          this.currentProfile = response.profile;
        }
        if (response.story) {
          this.currentStory = response.story;
        }
        // Store LLM call details if available (from story agent or profile agent)
        if (response.llm_call_details) {
          this.llmCallDetails = response.llm_call_details;
        }
      })
    );
  }

  submitQuiz(childId: string, submission: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit_quiz/${childId}`, submission);
  }

  getRewards(childId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/rewards/${childId}`);
  }

  getLeaderboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/leaderboard`);
  }

  getProfilePreferences(childId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/preferences/${childId}`);
  }

  updateProfilePreferences(childId: string, hobbies: string[], favoriteSubjects: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/profile/preferences`, {
      child_id: childId,
      hobbies: hobbies,
      favoriteSubjects: favoriteSubjects
    });
  }

  /**
   * Generate a cartoon avatar URL based on the child's name
   * Uses DiceBear Avatars API (free, no API key needed)
   */
  getAvatarUrl(name: string, style: 'adventurer' | 'avataaars' | 'big-smile' | 'bottts' | 'fun-emoji' | 'lorelei' | 'micah' | 'miniavs' | 'open-peeps' | 'personas' | 'pixel-art' = 'fun-emoji'): string {
    if (!name) return '';
    // Use DiceBear Avatars - fun-emoji style for cute cartoon characters
    const seed = name.toLowerCase().replace(/\s+/g, '-');
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&size=200`;
  }

  /**
   * Get a random colorful gradient for avatar background (fallback)
   */
  getAvatarGradient(name: string): string {
    if (!name) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    ];
    // Use name to consistently pick a gradient
    const index = name.charCodeAt(0) % gradients.length;
    return gradients[index];
  }
}

