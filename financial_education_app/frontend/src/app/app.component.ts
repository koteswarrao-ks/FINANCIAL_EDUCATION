import { Component } from '@angular/core';
import { UserProfileService } from './services/user-profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Financial Education App';
  currentScreen: 'login' | 'home' | 'profile' | 'story' | 'quiz' | 'rewards' | 'leaderboard' = 'login';
  expandedSections: Record<string, boolean> = {
    input: true,
    output: true,
    reasoning: true
  };

  constructor(public userProfileService: UserProfileService) {
    // Setup navigation methods in service
    this.userProfileService.navigateToHome = () => this.navigateToHome();
    this.userProfileService.navigateToStory = () => this.navigateToStory();
    this.userProfileService.navigateToQuiz = () => this.navigateToQuiz();
    this.userProfileService.navigateToRewards = () => this.navigateToRewards();
    this.userProfileService.navigateToLeaderboard = () => this.navigateToLeaderboard();
    this.userProfileService.navigateToLogin = () => this.navigateToLogin();
    
    // Check if user is already logged in
    if (this.userProfileService.currentChildId) {
      this.currentScreen = 'home';
    }
  }

  navigateToLogin(): void {
    this.currentScreen = 'login';
  }

  navigateToHome(): void {
    this.currentScreen = 'home';
  }

  navigateToProfile(): void {
    this.currentScreen = 'profile';
  }

  navigateToStory(): void {
    this.currentScreen = 'story';
  }

  navigateToQuiz(): void {
    this.currentScreen = 'quiz';
  }

  navigateToRewards(): void {
    this.currentScreen = 'rewards';
  }

  navigateToLeaderboard(): void {
    this.currentScreen = 'leaderboard';
  }

  toggleLLMPanel(): void {
    this.userProfileService.showLLMPanel = !this.userProfileService.showLLMPanel;
  }

  toggleLLMSection(section: string): void {
    if (this.expandedSections.hasOwnProperty(section)) {
      this.expandedSections[section] = !this.expandedSections[section];
    } else {
      this.expandedSections[section] = true;
    }
  }
}

