import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-admin',
  template: `
    <div class="admin-container">
      <h2>Admin Dashboard</h2>
      <div class="users-list">
        <table mat-table [dataSource]="users" class="mat-elevation-z8">
          <ng-container matColumnDef="username">
            <th mat-header-cell *matHeaderCellDef>Username</th>
            <td mat-cell *matCellDef="let user">{{user.username}}</td>
          </ng-container>

          <ng-container matColumnDef="isAdmin">
            <th mat-header-cell *matHeaderCellDef>Admin Status</th>
            <td mat-cell *matCellDef="let user">
              <mat-slide-toggle
                [checked]="user.isAdmin"
                (change)="toggleAdminStatus(user)"
                >
              </mat-slide-toggle>
            </td>
          </ng-container>

          <ng-container matColumnDef="createdAt">
            <th mat-header-cell *matHeaderCellDef>Created At</th>
            <td mat-cell *matCellDef="let user">{{user.createdAt | date}}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 20px;
    }
    .users-list {
      margin-top: 20px;
    }
    table {
      width: 100%;
    }
  `]
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['username', 'isAdmin', 'createdAt'];

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        this.snackBar.open(error.error.message || 'Failed to load users', 'Close', {
          duration: 3000
        });
      }
    });
  }

  toggleAdminStatus(user: User) {
    this.adminService.setAdminStatus(user._id, !user.isAdmin).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex(u => u._id === updatedUser._id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.snackBar.open('Admin status updated successfully', 'Close', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackBar.open(error.error.message || 'Failed to update admin status', 'Close', {
          duration: 3000
        });
      }
    });
  }
} 