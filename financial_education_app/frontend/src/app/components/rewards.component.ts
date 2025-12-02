import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
  childId: string = 'kid_001';
  rewards: any = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.loadRewards();
  }

  loadRewards(): void {
    this.isLoading = true;
    this.error = null;
    
    this.userProfileService.getRewards(this.childId).subscribe({
      next: (response) => {
        if (response.success) {
          this.rewards = response;
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.error = error.error?.detail || 'Failed to load rewards';
        this.isLoading = false;
        console.error('Rewards loading error:', error);
      }
    });
  }

  goHome(): void {
    if (this.userProfileService) {
      (this.userProfileService as any).navigateToHome?.();
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



