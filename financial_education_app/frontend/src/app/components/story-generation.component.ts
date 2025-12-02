import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UserProfileService, Profile, Story, StoryResponse } from '../services/user-profile.service';

@Component({
  selector: 'app-story-generation',
  templateUrl: './story-generation.component.html',
  styleUrls: ['./story-generation.component.css']
})
export class StoryGenerationComponent implements OnInit {
  @Output() backToProfile = new EventEmitter<void>();
  
  profile: Profile | null = null;
  currentStory: Story | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  showStory: boolean = false;
  currentPanelIndex: number = 0;

  constructor(
    private userProfileService: UserProfileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Story component initialized');
    
    // Get profile and story from service (set by home component)
    this.profile = (this.userProfileService as any).currentProfile;
    this.currentStory = (this.userProfileService as any).currentStory;
    
    console.log('Profile from service:', this.profile);
    console.log('Story from service:', this.currentStory);
    
    if (this.currentStory && this.currentStory.title) {
      // Story already loaded from API, just display it
      console.log('Using existing story from service');
      console.log('Story title:', this.currentStory.title);
      console.log('Story panels:', this.currentStory.panels?.length);
      this.showStory = true;
      this.isLoading = false;
      this.error = null;
      this.cdr.detectChanges();
      console.log('Story displayed:', this.currentStory);
      return;
    } else if (this.profile) {
      // Profile exists but no story, try to get it from startLearningJourney
      console.log('Profile exists but no story. Fetching story...');
      this.isLoading = true;
      this.userProfileService.startLearningJourney(this.profile.childId || 'kid_001').subscribe({
        next: (response) => {
          console.log('Story fetch response:', response);
          if (response.success && response.story) {
            this.currentStory = response.story;
            (this.userProfileService as any).currentStory = response.story;
            this.showStory = true;
            this.isLoading = false;
            this.error = null;
            this.cdr.detectChanges();
            console.log('Story loaded and displayed:', this.currentStory);
          } else {
            this.error = 'Failed to load story';
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Failed to fetch story:', error);
          this.error = error.error?.detail || 'Failed to load story';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      console.error('No profile or story available');
      this.error = 'No profile or story available. Please start from the home screen.';
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  generateStory(): void {
    if (!this.profile) {
      this.error = 'No profile available';
      return;
    }
    
    this.isLoading = true;
    this.error = null;
    this.showStory = false;
    this.currentStory = null;
    this.currentPanelIndex = 0;
    
    this.userProfileService.generateStory(this.profile).subscribe({
      next: (response: StoryResponse) => {
        this.currentStory = response.story;
        this.isLoading = false;
        this.showStory = true;
      },
      error: (error) => {
        this.error = error.error?.detail || 'Failed to generate story';
        this.isLoading = false;
        console.error('Story generation error:', error);
      }
    });
  }

  nextPanel(): void {
    if (this.currentStory && this.currentPanelIndex < this.currentStory.panels.length - 1) {
      this.currentPanelIndex++;
    }
  }

  previousPanel(): void {
    if (this.currentPanelIndex > 0) {
      this.currentPanelIndex--;
    }
  }

  goToPanel(index: number): void {
    if (this.currentStory && index >= 0 && index < this.currentStory.panels.length) {
      this.currentPanelIndex = index;
    }
  }

  onStartQuiz(): void {
    // Store story in service and navigate to quiz
    if (this.currentStory) {
      (this.userProfileService as any).currentStory = this.currentStory;
      if (this.userProfileService) {
        (this.userProfileService as any).navigateToQuiz?.();
      }
    }
  }

  goBackToProfile(): void {
    this.backToProfile.emit();
  }
}

