import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'IPL Tracker';
  isLoggedIn = false;
  isAdmin = false;
  showRegister = false;
  showAdminDashboard = false;
  hidePassword = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.userService.getCurrentUser();
      this.isAdmin = user?.isAdmin || false;
    }
  }

  toggleRegister() {
    this.showRegister = !this.showRegister;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoggedIn = true;
          this.isAdmin = response.user.isAdmin;
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        },
        error: (error) => {
          this.snackBar.open(error.error.message || 'Login failed!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Registration successful! Please login.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.showRegister = false;
          this.registerForm.reset();
        },
        error: (error) => {
          this.snackBar.open(error.error.message || 'Registration failed!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.showAdminDashboard = false;
    this.snackBar.open('Logged out successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
