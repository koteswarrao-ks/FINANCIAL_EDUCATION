import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:8000/api'; // Backend API URL

  constructor(private http: HttpClient) {}

  analyzeProfile(childId: string): Observable<ProfileAnalysisResponse> {
    return this.http.post<ProfileAnalysisResponse>(`${this.apiUrl}/profile/analyze`, {
      child_id: childId
    });
  }

  generateStory(profile: Profile): Observable<StoryResponse> {
    return this.http.post<StoryResponse>(`${this.apiUrl}/story/generate`, {
      profile: profile
    });
  }

  generateQuiz(story: Story, profile?: Profile): Observable<QuizResponse> {
    const body: any = { story: story };
    if (profile) {
      body.profile = profile;
    }
    return this.http.post<QuizResponse>(`${this.apiUrl}/quiz/generate`, body);
  }

  startLearningJourney(childId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/start/${childId}`);
  }

  submitQuiz(childId: string, submission: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit_quiz/${childId}`, submission);
  }

  getRewards(childId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/rewards/${childId}`);
  }
}

