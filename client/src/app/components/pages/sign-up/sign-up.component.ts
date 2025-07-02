import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignUp() {
    this.authService
      .signup({
        name: this.name,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          console.log('Login successful', res);
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.error('Login failed', err);
        },
      });
  }
}
