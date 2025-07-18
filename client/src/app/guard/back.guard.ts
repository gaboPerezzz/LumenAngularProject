import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/authService/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BackGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedin = !!localStorage.getItem('token');

    if (!isLoggedin) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
