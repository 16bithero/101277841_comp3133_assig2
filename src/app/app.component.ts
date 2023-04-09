import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavbar = false;
  
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/login') && !event.url.includes('/signup') && !event.url.includes('/');;
      }      
    });
  }

  logout(): void {
    this.showNavbar = false;
    this.router.navigate(['/login']);
  }

  title = 'Windstars';
}
