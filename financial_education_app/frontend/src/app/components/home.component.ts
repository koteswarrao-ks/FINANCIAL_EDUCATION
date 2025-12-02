import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  childId: string = '';
  isLoading: boolean = false;
  isLoadingProfile: boolean = false;
  error: string | null = null;
  rewards: any = null;
  profile: any = null;
  reasoning: any = null;
  
  // Edit mode states
  editingHobbies: boolean = false;
  editingSubjects: boolean = false;
  newHobby: string = '';
  newSubject: string = '';

  constructor(
    private userProfileService: UserProfileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get childId from logged-in user
    this.childId = (this.userProfileService as any).currentChildId || 'kid_001';
    
    if (!this.childId) {
      this.error = 'Please login first';
      return;
    }
    
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
    
    // Add timeout to prevent infinite loading (increased to 180 seconds for LLM calls)
    const timeout = setTimeout(() => {
      if (this.isLoadingProfile && !this.profile) {
        // Only set error if profile hasn't loaded yet
        console.error('Profile loading timeout!');
        this.error = 'Profile loading timed out. The LLM call may be taking longer than expected. Please try again.';
        this.isLoadingProfile = false;
        this.cdr.detectChanges();
      }
    }, 180000); // 180 second timeout (3 minutes) to allow for LLM processing
    
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
              // LLM call details are automatically stored in service via tap operator
              this.error = null; // Clear any previous errors
              // Store in service for other components
              this.userProfileService.currentProfile = response.profile;
              console.log('Profile loaded successfully:', this.profile);
              console.log('Profile name:', this.profile?.name);
              this.isLoadingProfile = false;
              this.loadAndMergePreferences(); // Load and merge preferences
              this.cdr.detectChanges();
              return;
            } else if (response.profile) {
              // Sometimes API might return profile directly
              this.profile = response.profile;
              this.reasoning = response.reasoning;
              // LLM call details are automatically stored in service via tap operator
              this.error = null; // Clear any previous errors
              this.userProfileService.currentProfile = response.profile;
              console.log('Profile loaded (direct):', this.profile);
              this.isLoadingProfile = false;
              this.loadAndMergePreferences(); // Load and merge preferences
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

  loadAndMergePreferences(): void {
    if (!this.profile) return;

    this.userProfileService.getProfilePreferences(this.childId).subscribe({
      next: (response) => {
        if (response.success && response.preferences) {
          // Merge preferences: user-defined override LLM-inferred
          // Always use saved preferences, even if they are empty arrays
          if (Array.isArray(response.preferences.hobbies)) {
            this.profile!.personalization.hobbies = response.preferences.hobbies;
          }
          if (Array.isArray(response.preferences.favoriteSubjects)) {
            this.profile!.personalization.favoriteSubjects = response.preferences.favoriteSubjects;
          }
          // Update the stored profile in service
          (this.userProfileService as any).currentProfile = this.profile;
          this.cdr.detectChanges();
        } else {
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.warn('Could not load user preferences, using analyzed profile:', error);
        this.cdr.detectChanges();
      }
    });
  }

  onStartStory(): void {
    // Navigate to profile analysis first, then story
    this.isLoading = true;
    this.error = null;
    
    console.log('Starting learning journey for:', this.childId);
    
    if (!this.childId) {
      this.error = 'Please login first';
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }
    
    this.userProfileService.startLearningJourney(this.childId).subscribe({
      next: (response) => {
        console.log('Learning journey response:', response);
        
        if (response && response.success && !response.completed) {
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
            
            // Navigate to story screen
            const navigateFn = (this.userProfileService as any).navigateToStory;
            if (navigateFn) {
              console.log('Navigating to story screen...');
              this.isLoading = false;
              this.cdr.detectChanges();
              setTimeout(() => {
                navigateFn();
              }, 100); // Small delay to ensure data is stored
            } else {
              console.error('Navigation function not found!');
              this.error = 'Navigation not available. Please refresh the page.';
              this.isLoading = false;
              this.cdr.detectChanges();
            }
          } else {
            console.error('No story in response!');
            this.error = 'Story not found in response. Please try again.';
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        } else if (response && response.completed) {
          this.error = response.message || 'All topics completed!';
          this.isLoading = false;
          this.cdr.detectChanges();
        } else {
          this.error = 'Invalid response from server. Please try again.';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Start journey error:', error);
        console.error('Error details:', error.error);
        this.error = error.error?.detail || error.message || 'Failed to start learning journey. Make sure the backend API is running on http://localhost:8000';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }


  onViewRewards(): void {
    // Navigate to rewards screen
    if (this.userProfileService) {
      (this.userProfileService as any).navigateToRewards?.();
    }
  }

  onViewLeaderboard(): void {
    // Navigate to leaderboard screen
    if (this.userProfileService) {
      (this.userProfileService as any).navigateToLeaderboard?.();
    }
  }

  // Hobbies management
  startEditingHobbies(): void {
    this.editingHobbies = true;
  }

  cancelEditingHobbies(): void {
    this.editingHobbies = false;
    this.newHobby = '';
  }

  addHobby(): void {
    if (this.newHobby.trim() && this.profile) {
      const hobby = this.newHobby.trim();
      // Initialize hobbies array if it doesn't exist
      if (!this.profile.personalization.hobbies) {
        this.profile.personalization.hobbies = [];
      }
      if (!this.profile.personalization.hobbies.includes(hobby)) {
        this.profile.personalization.hobbies.push(hobby);
        this.savePreferences();
      }
      this.newHobby = '';
    }
  }

  deleteHobby(hobby: string): void {
    if (this.profile) {
      this.profile.personalization.hobbies = this.profile.personalization.hobbies.filter((h: string) => h !== hobby);
      this.savePreferences();
    }
  }

  // Favorite Subjects management
  startEditingSubjects(): void {
    this.editingSubjects = true;
  }

  cancelEditingSubjects(): void {
    this.editingSubjects = false;
    this.newSubject = '';
  }

  addSubject(): void {
    if (this.newSubject.trim() && this.profile) {
      const subject = this.newSubject.trim();
      // Initialize favoriteSubjects array if it doesn't exist
      if (!this.profile.personalization.favoriteSubjects) {
        this.profile.personalization.favoriteSubjects = [];
      }
      if (!this.profile.personalization.favoriteSubjects.includes(subject)) {
        this.profile.personalization.favoriteSubjects.push(subject);
        this.savePreferences();
      }
      this.newSubject = '';
    }
  }

  deleteSubject(subject: string): void {
    if (this.profile) {
      this.profile.personalization.favoriteSubjects = this.profile.personalization.favoriteSubjects.filter((s: string) => s !== subject);
      this.savePreferences();
    }
  }

  savePreferences(): void {
    if (this.profile) {
      this.userProfileService.updateProfilePreferences(
        this.profile.childId,
        this.profile.personalization.hobbies,
        this.profile.personalization.favoriteSubjects
      ).subscribe({
        next: (response) => {
          console.log('Preferences saved successfully', response);
          // Update the stored profile in service so story agent uses updated data
          (this.userProfileService as any).currentProfile = this.profile;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Failed to save preferences:', error);
          this.error = 'Failed to save preferences. Please try again.';
          this.cdr.detectChanges();
        }
      });
    }
  }

}

