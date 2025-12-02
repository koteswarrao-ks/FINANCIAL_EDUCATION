import { Component } from '@angular/core';
import { UserProfileService } from './services/user-profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Financial Education App';
  currentScreen: 'home' | 'profile' | 'story' | 'quiz' | 'rewards' = 'home';

  constructor(private userProfileService: UserProfileService) {
    // Setup navigation methods in service
    (this.userProfileService as any).navigateToHome = () => this.navigateToHome();
    (this.userProfileService as any).navigateToStory = () => this.navigateToStory();
    (this.userProfileService as any).navigateToQuiz = () => this.navigateToQuiz();
    (this.userProfileService as any).navigateToRewards = () => this.navigateToRewards();
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
}

