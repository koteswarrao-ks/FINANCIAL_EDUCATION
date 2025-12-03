import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {}

  onLogin(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.error = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.http.post<any>('http://localhost:8000/api/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        if (response.success) {
          // Store logged-in user info
          (this.userProfileService as any).currentChildId = response.childId;
          (this.userProfileService as any).currentUserName = response.name;
          
          // Navigate to home
          const navigateFn = (this.userProfileService as any).navigateToHome;
          if (navigateFn) {
            navigateFn();
          }
        } else {
          this.error = response.message || 'Login failed';
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.error = error.error?.detail || error.error?.message || 'Login failed. Please check your credentials.';
        this.isLoading = false;
        console.error('Login error:', error);
      }
    });
  }
}

