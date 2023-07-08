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
    this.authService.loginAs('9f84099f-5316-11ed-a2eb-3c7c3f299a76'); // Admin
    //this.authService.logout(); // Not logged in
    this.userService.refreshCurrentUser(this.authService.getUserUuid());
  }
}
