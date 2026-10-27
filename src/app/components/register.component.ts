
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CropDataService } from '../services/crop-data.service';
import { Crop } from '../models';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="register-scene">
      <div class="form-panel register-panel">
        <div class="form-emblem">♧</div>
        <h1>Farmer Registration</h1>
        <p class="form-intro">
          Join our portal and get expert advice, market updates<br>
          and more.
        </p>

        <form #f="ngForm" (ngSubmit)="save(f)">
          <label>♙ &nbsp; Full Name <em>*</em>
            <input name="name" [(ngModel)]="name" required
              placeholder="Enter your name">
          </label>

          <label>♟ &nbsp; Age <em>*</em>
            <input name="age" [(ngModel)]="age" required
              type="number" min="13" max="100"
              placeholder="Enter your age">
          </label>

          <label>📍 &nbsp; Village / Location <em>*</em>
            <input name="village" [(ngModel)]="village" required
              placeholder="Enter your village">
          </label>

          <label>☎ &nbsp; Mobile Number <em>*</em>
            <input name="mobile" [(ngModel)]="mobile" required
              pattern="[0-9]{10}" inputmode="numeric"
              placeholder="Enter your mobile number">
          </label>

          <label>🌱 &nbsp; Select Crop <em>*</em>
            <select name="crop" [(ngModel)]="crop" required>
              <option value="">-- Select Crop --</option>
              @for (c of crops; track c.id) {
                <option [value]="c.id">{{ c.name }}</option>
              }
            </select>
          </label>

          <button class="btn full-btn" [disabled]="f.invalid || loading">
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        </form>

        @if (done) {
          <div class="success">
            ✓ &nbsp; Registration successful!
            <small>Your details have been saved.</small>
          </div>
        }

        @if (errorMessage) {
          <div class="error-message">{{ errorMessage }}</div>
        }
      </div>
    </section>
  `
})
export class RegisterComponent {
  private ds = inject(CropDataService);
  private http = inject(HttpClient);

  crops: Crop[] = [];
  name = '';
  age: number | null = null;
  village = '';
  mobile = '';
  crop = '';
  done = false;
  loading = false;
  errorMessage = '';

  constructor() {
    this.ds.getData().subscribe(d => this.crops = d.crops);
  }

  save(f: any) {
    if (f.invalid || this.loading) return;

    this.loading = true;
    this.done = false;
    this.errorMessage = '';

    const farmer = {
      name: this.name.trim(),
      age: this.age,
      village: this.village.trim(),
      phone: this.mobile.trim(),
      crop: this.crop
    };

    this.http.post<any>(
      'http://localhost:3000/api/farmers/register',
      farmer
    ).subscribe({
      next: (response) => {
        this.done = true;
        this.loading = false;

        localStorage.setItem(
          'farmerDetails',
          JSON.stringify({
            ...farmer,
            mobile: farmer.phone,
            id: response.farmer?.id
          })
        );

        f.resetForm();
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error.error?.message ||
          'Registration failed. Please check that the backend is running.';
      }
    });
  }
}
