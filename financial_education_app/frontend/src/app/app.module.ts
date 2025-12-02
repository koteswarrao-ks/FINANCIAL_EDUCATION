import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { ProfileAnalysisComponent } from './components/profile-analysis.component';
import { StoryGenerationComponent } from './components/story-generation.component';
import { QuizComponent } from './components/quiz.component';
import { RewardsComponent } from './components/rewards.component';
import { UserProfileService } from './services/user-profile.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileAnalysisComponent,
    StoryGenerationComponent,
    QuizComponent,
    RewardsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }

