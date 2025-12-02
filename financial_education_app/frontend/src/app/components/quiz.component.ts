import { Component, OnInit } from '@angular/core';
import { UserProfileService, Quiz, Story } from '../services/user-profile.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Quiz | null = null;
  story: Story | null = null;
  profile: any = null;
  isLoading: boolean = false;
  error: string | null = null;
  selectedAnswers: { [key: number]: string } = {};
  isSubmitted: boolean = false;
  score: number = 0;
  totalQuestions: number = 0;
  correctAnswers: number = 0;
  passed: boolean = false;
  showResults: boolean = false;
  submissionResult: any = null;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    // Get story and profile from service
    this.story = (this.userProfileService as any).currentStory;
    this.profile = (this.userProfileService as any).currentProfile;
    
    console.log('Quiz component initialized');
    console.log('Story from service:', this.story);
    console.log('Profile from service:', this.profile);
    
    if (this.story) {
      // Verify story has required fields
      if (!this.story.difficulty) {
        console.warn('Story missing difficulty field, using default');
        this.story.difficulty = 'medium';
      }
      if (!this.story.fullStoryText) {
        console.warn('Story missing fullStoryText field');
      }
      this.loadQuiz();
    } else {
      this.error = 'No story available. Please read a story first.';
      this.isLoading = false;
      console.error('No story available in service');
    }
  }

  loadQuiz(): void {
    if (!this.story) {
      this.error = 'No story available. Please read a story first.';
      this.isLoading = false;
      return;
    }
    
    this.isLoading = true;
    this.error = null;
    
    console.log('Loading quiz for story:', this.story);
    console.log('Story has difficulty:', this.story.difficulty);
    console.log('Profile available:', !!this.profile);
    
    this.userProfileService.generateQuiz(this.story, this.profile).subscribe({
      next: (response) => {
        console.log('Quiz response:', response);
        if (response && response.success && response.quiz) {
          this.quiz = response.quiz;
          this.isLoading = false;
        } else if (response && response.quiz) {
          // Handle case where success field might be missing but quiz exists
          this.quiz = response.quiz;
          this.isLoading = false;
        } else {
          this.error = 'Invalid quiz response from server';
          this.isLoading = false;
          console.error('Invalid quiz response:', response);
        }
      },
      error: (error) => {
        this.error = error.error?.detail || error.message || 'Failed to load quiz';
        this.isLoading = false;
        console.error('Quiz loading error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
      }
    });
  }

  selectAnswer(questionId: number, answer: string): void {
    if (!this.isSubmitted) {
      this.selectedAnswers[questionId] = answer;
    }
  }

  submitQuiz(): void {
    if (!this.quiz || !this.story) return;
    
    // Build correct answers map
    const correctAnswers: { [key: number]: string } = {};
    this.quiz.questions.forEach(q => {
      correctAnswers[q.id] = q.correctAnswer;
    });
    
    const submission = {
      quizId: this.quiz.quizId,
      concept: this.quiz.concept || this.story?.concept || null, // Include concept from quiz or story
      answers: this.selectedAnswers,
      correctAnswers: correctAnswers
    };
    
    this.isLoading = true;
    const childId = this.story.childId || 'kid_001';
    
    this.userProfileService.submitQuiz(childId, submission).subscribe({
      next: (response) => {
        this.score = response.score;
        this.totalQuestions = response.totalQuestions;
        this.correctAnswers = response.correctAnswers;
        this.passed = response.passed;
        this.submissionResult = response;
        this.isSubmitted = true;
        this.showResults = true;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.error?.detail || 'Failed to submit quiz';
        this.isLoading = false;
        console.error('Quiz submission error:', error);
      }
    });
  }

  isAnswerSelected(questionId: number, answer: string): boolean {
    return this.selectedAnswers[questionId] === answer;
  }

  isCorrect(questionId: number, answer: string): boolean {
    if (!this.quiz || !this.showResults) return false;
    const question = this.quiz.questions.find(q => q.id === questionId);
    return question?.correctAnswer === answer;
  }

  isWrong(questionId: number, answer: string): boolean {
    if (!this.quiz || !this.showResults) return false;
    return this.selectedAnswers[questionId] === answer && 
           !this.isCorrect(questionId, answer);
  }

  goBack(): void {
    // Navigate back
    if (this.userProfileService) {
      (this.userProfileService as any).navigateToStory?.();
    }
  }

  continueLearning(): void {
    // Navigate to next story or home
    if (this.userProfileService) {
      (this.userProfileService as any).navigateToHome?.();
    }
  }

  // Helper methods for template
  getCharCode(index: number): string {
    return String.fromCharCode(65 + index);
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getSelectedAnswersCount(): number {
    return Object.keys(this.selectedAnswers).length;
  }
}

