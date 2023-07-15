import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'guaybeer-ui';

  constructor(private authService: AuthService, private userService: UserService) {
    this.authService.loginAs('8d906da9-1aab-11ee-aab2-3c7c3f299a76'); // Felipe
    //this.authService.loginAs('9be04e2f-1aab-11ee-aab2-3c7c3f299a76'); // Kaue
    //this.authService.logout(); // Not logged in
  }
}
