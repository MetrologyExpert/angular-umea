import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {


  constructor(public auth: AuthService) { 
  }

  logout() {
      this.auth.logout();
  }

}
