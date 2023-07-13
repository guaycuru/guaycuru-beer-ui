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
    this.authService.loginAs('af9c4c2d-1aab-11ee-aab2-3c7c3f299a76'); // Felipe
    //this.authService.loginAs('14e03311-21cc-11ee-88ae-ac1f6bbcd3b3'); // Kaue
    //this.authService.logout(); // Not logged in
    this.userService.refreshCurrentUser(this.authService.getUserUuid());
  }
}
