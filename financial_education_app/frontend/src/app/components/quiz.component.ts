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
    
    if (this.story) {
      this.loadQuiz();
    } else {
      this.error = 'No story available. Please read a story first.';
    }
  }

  loadQuiz(): void {
    if (!this.story) return;
    
    this.isLoading = true;
    this.error = null;
    
    const request: any = { story: this.story };
    if (this.profile) {
      request.profile = this.profile;
    }
    
    this.userProfileService.generateQuiz(this.story, this.profile).subscribe({
      next: (response) => {
        if (response.success) {
          this.quiz = response.quiz;
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.error = error.error?.detail || 'Failed to load quiz';
        this.isLoading = false;
        console.error('Quiz loading error:', error);
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

