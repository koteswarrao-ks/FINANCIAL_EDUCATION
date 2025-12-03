import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserProfileService } from '../services/user-profile.service';

export interface LeaderboardEntry {
  childId: string;
  name: string;
  points: number;
  level: number;
  badges: string[];
  rank: number;
}

export interface LeaderboardResponse {
  success: boolean;
  leaderboard: LeaderboardEntry[];
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: LeaderboardEntry[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  currentChildId: string | null = null;

  constructor(
    private userProfileService: UserProfileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentChildId = this.userProfileService.currentChildId;
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    this.isLoading = true;
    this.error = null;
    
    this.userProfileService.getLeaderboard().subscribe({
      next: (response: LeaderboardResponse) => {
        if (response.success && response.leaderboard) {
          this.leaderboard = response.leaderboard;
          this.isLoading = false;
          this.cdr.detectChanges();
        } else {
          this.error = 'Failed to load leaderboard';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        this.error = error.error?.detail || 'Failed to load leaderboard';
        this.isLoading = false;
        console.error('Leaderboard loading error:', error);
        this.cdr.detectChanges();
      }
    });
  }

  goHome(): void {
    if (this.userProfileService) {
      this.userProfileService.navigateToHome?.();
    }
  }

  goToRewards(): void {
    if (this.userProfileService) {
      this.userProfileService.navigateToRewards?.();
    }
  }

  getRankIcon(rank: number): string {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  }

  isCurrentUser(entry: LeaderboardEntry): boolean {
    return entry.childId === this.currentChildId;
  }
}

