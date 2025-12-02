import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserProfileService, Profile, ProfileAnalysisResponse } from '../services/user-profile.service';

@Component({
  selector: 'app-profile-analysis',
  templateUrl: './profile-analysis.component.html',
  styleUrls: ['./profile-analysis.component.css']
})
export class ProfileAnalysisComponent implements OnInit {
  @Output() readStories = new EventEmitter<void>();
  
  childId: string = '';
  
  profile: Profile | null = null;
  reasoning: any = null;
  isLoading: boolean = false;
  error: string | null = null;
  showResults: boolean = false;
  
  // Edit mode states
  editingHobbies: boolean = false;
  editingSubjects: boolean = false;
  newHobby: string = '';
  newSubject: string = '';

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    // Get childId from logged-in user
    this.childId = (this.userProfileService as any).currentChildId || 'kid_001';
    
    if (!this.childId) {
      this.error = 'Please login first';
      return;
    }
    
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
        // Load and merge saved preferences after profile analysis
        this.loadAndMergePreferences();
      },
      error: (error) => {
        this.error = error.error?.detail || 'Failed to analyze profile';
        this.isLoading = false;
        console.error('Profile analysis error:', error);
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
        }
      },
      error: (error) => {
        console.warn('Could not load user preferences, using analyzed profile:', error);
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
      this.profile.personalization.hobbies = this.profile.personalization.hobbies.filter(h => h !== hobby);
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
      this.profile.personalization.favoriteSubjects = this.profile.personalization.favoriteSubjects.filter(s => s !== subject);
      this.savePreferences();
    }
  }

  savePreferences(): void {
    if (this.profile) {
      this.userProfileService.updateProfilePreferences(
        this.profile.childId,
        this.profile.personalization.hobbies || [],
        this.profile.personalization.favoriteSubjects || []
      ).subscribe({
        next: (response) => {
          console.log('Preferences saved successfully', response);
          // Update the stored profile in service so story agent uses updated data
          (this.userProfileService as any).currentProfile = this.profile;
          // Reload preferences to ensure UI is in sync
          this.loadAndMergePreferences();
        },
        error: (error) => {
          console.error('Failed to save preferences:', error);
          this.error = 'Failed to save preferences. Please try again.';
        }
      });
    }
  }
}

