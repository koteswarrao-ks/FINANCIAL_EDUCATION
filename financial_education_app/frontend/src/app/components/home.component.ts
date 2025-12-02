import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  childId: string = 'kid_001';
  isLoading: boolean = false;
  isLoadingProfile: boolean = false;
  error: string | null = null;
  rewards: any = null;
  profile: any = null;
  reasoning: any = null;

  constructor(
    private userProfileService: UserProfileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRewards();
    this.loadProfile();
  }

  loadRewards(): void {
    this.userProfileService.getRewards(this.childId).subscribe({
      next: (response) => {
        if (response && response.success) {
          this.rewards = response;
        } else {
          // Set default rewards if API fails
          this.rewards = { points: 0, level: 1, badges: [] };
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load rewards:', error);
        // Set default rewards on error
        this.rewards = { points: 0, level: 1, badges: [] };
        this.cdr.detectChanges();
      }
    });
  }

  loadProfile(): void {
    this.isLoadingProfile = true;
    this.error = null;
    this.profile = null;
    
    console.log('Loading profile for:', this.childId);
    console.log('API URL:', 'http://localhost:8000/api/profile/analyze');
    
    // First check if backend is reachable
    fetch('http://localhost:8000/')
      .then(() => {
        console.log('Backend is reachable');
      })
      .catch(() => {
        console.error('Backend is NOT reachable!');
        this.error = 'Backend API is not running. Please start it with: cd backend && ./start_api.sh';
        this.isLoadingProfile = false;
        this.cdr.detectChanges();
        return;
      });
    
    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (this.isLoadingProfile) {
        console.error('Profile loading timeout!');
        this.error = 'Profile loading timed out. Make sure backend is running on http://localhost:8000';
        this.isLoadingProfile = false;
        this.cdr.detectChanges();
      }
    }, 15000); // 15 second timeout
    
    this.userProfileService.analyzeProfile(this.childId).subscribe({
      next: (response) => {
        clearTimeout(timeout);
        console.log('Profile response received:', response);
        console.log('Response type:', typeof response);
        console.log('Response keys:', Object.keys(response || {}));
        
        try {
          if (response) {
            if (response.success === true && response.profile) {
              this.profile = response.profile;
              this.reasoning = response.reasoning;
              // Store in service for other components
              (this.userProfileService as any).currentProfile = response.profile;
              console.log('Profile loaded successfully:', this.profile);
              console.log('Profile name:', this.profile?.name);
              this.isLoadingProfile = false;
              this.cdr.detectChanges();
              return;
            } else if (response.profile) {
              // Sometimes API might return profile directly
              this.profile = response.profile;
              this.reasoning = response.reasoning;
              (this.userProfileService as any).currentProfile = response.profile;
              console.log('Profile loaded (direct):', this.profile);
              this.isLoadingProfile = false;
              this.cdr.detectChanges();
              return;
            }
          }
          
          console.error('Invalid profile response structure:', response);
          this.error = 'Failed to load profile: Invalid response structure';
          this.isLoadingProfile = false;
          this.cdr.detectChanges();
        } catch (e) {
          console.error('Error processing profile response:', e);
          this.error = 'Error processing profile data';
          this.isLoadingProfile = false;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        clearTimeout(timeout);
        console.error('Profile loading error:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error details:', error.error);
        
        if (error.status === 0) {
          this.error = 'Cannot connect to backend API. Make sure it\'s running on http://localhost:8000';
        } else if (error.status === 404) {
          this.error = 'API endpoint not found. Check backend is running.';
        } else if (error.status === 500) {
          this.error = 'Server error: ' + (error.error?.detail || error.message);
        } else {
          this.error = error.error?.detail || error.message || 'Failed to load profile';
        }
        this.isLoadingProfile = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        clearTimeout(timeout);
        console.log('Profile loading observable completed');
        if (this.isLoadingProfile && !this.profile) {
          console.warn('Observable completed but no profile loaded!');
          this.isLoadingProfile = false;
          this.cdr.detectChanges();
        }
      }
    });
  }

  onStartStory(): void {
    // Navigate to profile analysis first, then story
    this.isLoading = true;
    this.error = null;
    
    console.log('Starting learning journey for:', this.childId);
    
    this.userProfileService.startLearningJourney(this.childId).subscribe({
      next: (response) => {
        console.log('Learning journey response:', response);
        
        if (response.success && !response.completed) {
          // Store profile and story in service
          if (response.profile) {
            (this.userProfileService as any).currentProfile = response.profile;
            console.log('Profile stored:', response.profile);
          }
          
          if (response.story) {
            (this.userProfileService as any).currentStory = response.story;
            console.log('Story stored:', response.story);
            console.log('Story title:', response.story.title);
            console.log('Story panels:', response.story.panels?.length);
          } else {
            console.error('No story in response!');
            this.error = 'Story not found in response';
            this.isLoading = false;
            return;
          }
          
          // Navigate to story screen
          const navigateFn = (this.userProfileService as any).navigateToStory;
          if (navigateFn) {
            console.log('Navigating to story screen...');
            setTimeout(() => {
              navigateFn();
            }, 100); // Small delay to ensure data is stored
          } else {
            console.error('Navigation function not found!');
            this.error = 'Navigation not available. Please refresh the page.';
          }
        } else if (response.completed) {
          this.error = response.message || 'All topics completed!';
        } else {
          this.error = 'Invalid response from server';
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Start journey error:', error);
        this.error = error.error?.detail || error.message || 'Failed to start learning journey. Make sure the backend API is running on http://localhost:8000';
        this.isLoading = false;
      }
    });
  }


  onViewRewards(): void {
    // Navigate to rewards screen
    if (this.userProfileService) {
      (this.userProfileService as any).navigateToRewards?.();
    }
  }
}

