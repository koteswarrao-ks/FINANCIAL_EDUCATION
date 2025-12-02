import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserProfileService, Profile, ProfileAnalysisResponse } from '../services/user-profile.service';

@Component({
  selector: 'app-profile-analysis',
  templateUrl: './profile-analysis.component.html',
  styleUrls: ['./profile-analysis.component.css']
})
export class ProfileAnalysisComponent implements OnInit {
  @Output() readStories = new EventEmitter<void>();
  
  childId: string = 'kid_001';
  
  profile: Profile | null = null;
  reasoning: any = null;
  isLoading: boolean = false;
  error: string | null = null;
  showResults: boolean = false;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    // Auto-analyze on component load
    this.analyzeProfile();
  }

  analyzeProfile(): void {
    this.isLoading = true;
    this.error = null;
    this.showResults = false;
    this.profile = null;
    this.reasoning = null;
    
    this.userProfileService.analyzeProfile(this.childId).subscribe({
      next: (response: ProfileAnalysisResponse) => {
        this.profile = response.profile;
        this.reasoning = response.reasoning;
        this.isLoading = false;
        this.showResults = true;
      },
      error: (error) => {
        this.error = error.error?.detail || 'Failed to analyze profile';
        this.isLoading = false;
        console.error('Profile analysis error:', error);
      }
    });
  }

  onReadStories(): void {
    if (this.profile) {
      // Store profile in service for story component to use
      (this.userProfileService as any).currentProfile = this.profile;
      this.readStories.emit();
    }
  }
}

