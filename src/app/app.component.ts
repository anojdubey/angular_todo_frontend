import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo List';
  count=0;
  constructor(public authService: AuthService){
    setTimeout(() => {
      this.title = 'Changed by setTimeout';
      this.count = this.count + 1;
    }, 1000);
  }
  logout() {
    this.authService.doLogout()
  }
}
