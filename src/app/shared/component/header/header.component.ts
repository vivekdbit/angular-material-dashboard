import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private authService : AuthService,
              private router : Router ) { }

  ngOnInit() {
  }

  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
