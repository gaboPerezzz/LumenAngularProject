import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotesPageComponent } from './components/pages/notes-page/notes-page.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';
import { BackGuard } from './guard/back.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [BackGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [BackGuard] },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: NotesPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
