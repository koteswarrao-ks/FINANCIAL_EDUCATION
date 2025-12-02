import { Component, OnInit } from '@angular/core';
import { UserProfileService, Profile, ProfileAnalysisResponse, Story, StoryResponse, Quiz, QuizResponse } from '../services/user-profile.service';

@Component({
  selector: 'app-learning-journey',
  templateUrl: './learning-journey.component.html',
  styleUrls: ['./learning-journey.component.css']
})
export class LearningJourneyComponent implements OnInit {
  childId: string = 'kid_001'; // Default child ID
  
  // Profile Analysis State
  profile: Profile | null = null;
  reasoning: any = null;
  isLoadingProfile: boolean = false;
  profileError: string | null = null;
  showReasoning: boolean = false;
  
  // Story State
  currentStory: Story | null = null;
  isLoadingStory: boolean = false;
  storyError: string | null = null;
  showStory: boolean = false;
  
  // Quiz State
  currentQuiz: Quiz | null = null;
  isLoadingQuiz: boolean = false;
  quizError: string | null = null;
  showQuiz: boolean = false;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    // Auto-analyze profile on component load
    this.analyzeProfile();
  }

  analyzeProfile(): void {
    this.isLoadingProfile = true;
    this.profileError = null;
    this.showReasoning = false;
    this.profile = null;
    
    this.userProfileService.analyzeProfile(this.childId).subscribe({
      next: (response: ProfileAnalysisResponse) => {
        this.profile = response.profile;
        this.reasoning = response.reasoning;
        this.isLoadingProfile = false;
        this.showReasoning = true;
      },
      error: (error) => {
        this.profileError = error.error?.detail || 'Failed to analyze profile';
        this.isLoadingProfile = false;
        console.error('Profile analysis error:', error);
      }
    });
  }

  loadStory(): void {
    if (!this.profile) {
      this.storyError = 'Please analyze profile first';
      return;
    }
    
    this.isLoadingStory = true;
    this.storyError = null;
    this.showStory = false;
    this.currentStory = null;
    
    this.userProfileService.generateStory(this.profile).subscribe({
      next: (response: StoryResponse) => {
        this.currentStory = response.story;
        this.isLoadingStory = false;
        this.showStory = true;
      },
      error: (error) => {
        this.storyError = error.error?.detail || 'Failed to generate story';
        this.isLoadingStory = false;
        console.error('Story generation error:', error);
      }
    });
  }

  startQuiz(): void {
    if (!this.currentStory) {
      this.quizError = 'Please load a story first';
      return;
    }
    
    this.isLoadingQuiz = true;
    this.quizError = null;
    this.showQuiz = false;
    this.currentQuiz = null;
    
    this.userProfileService.generateQuiz(this.currentStory).subscribe({
      next: (response: QuizResponse) => {
        this.currentQuiz = response.quiz;
        this.isLoadingQuiz = false;
        this.showQuiz = true;
      },
      error: (error) => {
        this.quizError = error.error?.detail || 'Failed to generate quiz';
        this.isLoadingQuiz = false;
        console.error('Quiz generation error:', error);
      }
    });
  }

  resetJourney(): void {
    this.showReasoning = false;
    this.showStory = false;
    this.showQuiz = false;
    this.currentStory = null;
    this.currentQuiz = null;
    this.analyzeProfile();
  }
}



