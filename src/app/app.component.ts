import {Component, OnInit} from '@angular/core';
import {UserService} from './Services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Colis';

  constructor(private userService: UserService) {
  }

  ngOnInit() {

  }
}
