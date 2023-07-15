import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './MyCopm/todo/todo.component';
import { AboutComponent } from './MyCopm/about/about.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "/log-in", pathMatch: "full" },
  { path: "todo/:id", component: TodoComponent,canActivate: [AuthGuard] },
  { path: "about", component: AboutComponent },
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
