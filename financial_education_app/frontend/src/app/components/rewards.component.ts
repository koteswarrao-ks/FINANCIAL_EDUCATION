import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
  childId: string = '';
  rewards: any = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    // Get childId from logged-in user
    this.childId = this.userProfileService.currentChildId || '';
    if (!this.childId) {
      // If no childId, navigate to login
      this.userProfileService.navigateToLogin?.();
      return;
    }
    this.loadRewards();
  }

  loadRewards(): void {
    this.isLoading = true;
    this.error = null;
    
    this.userProfileService.getRewards(this.childId).subscribe({
      next: (response) => {
        if (response && response.success) {
          this.rewards = response;
          this.isLoading = false;
        } else {
          // Handle case where response doesn't have success flag
          this.rewards = response;
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Rewards loading error:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error details:', error.error);
        
        if (error.status === 0) {
          this.error = 'Cannot connect to backend API. Make sure it\'s running on http://localhost:8000';
        } else if (error.status === 404) {
          this.error = 'API endpoint not found. Check backend is running.';
        } else if (error.status === 500) {
          this.error = 'Server error: ' + (error.error?.detail || error.message || 'Unknown error');
        } else {
          this.error = error.error?.detail || error.message || 'Failed to load rewards';
        }
        this.isLoading = false;
      }
    });
  }

  goHome(): void {
    if (this.userProfileService) {
      (this.userProfileService as any).navigateToHome?.();
    }
  }

  goToLeaderboard(): void {
    if (this.userProfileService) {
      (this.userProfileService as any).navigateToLeaderboard?.();
    }
  }

  getLevelProgress(): number {
    if (!this.rewards) return 0;
    const currentLevelPoints = (this.rewards.level - 1) * 100;
    const nextLevelPoints = this.rewards.level * 100;
    const progress = ((this.rewards.points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
    return Math.min(100, Math.max(0, progress));
  }

  getPointsForNextLevel(): number {
    if (!this.rewards) return 100;
    return this.rewards.level * 100;
  }
}



