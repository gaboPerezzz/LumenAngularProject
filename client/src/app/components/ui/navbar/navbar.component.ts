import { Component } from '@angular/core';
import { ModalService } from '../../../service/modalService/modal.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  style =
    'rounded-[50%] p-4 text-white bg-black hover:scale-110 transition-all duration-300 cursor-pointer';
  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private router: Router
  ) {}

  openModal() {
    this.modalService.open('add', null);
    console.log(this.modalService, 'open');
  }

  logout() {
    try {
      this.authService.logout();
      console.log('Logout successful');
      this.router.navigate(['/']);
    } catch (err) {
      console.error('Logout failed', err);
    }
  }
}
