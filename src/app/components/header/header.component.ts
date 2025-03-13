import { Component, HostListener } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isScrolled = false;
  private scrollTimeout: any;


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 30;
    clearTimeout(this.scrollTimeout);

    // Supprime la classe après 1s d'inactivité
    this.scrollTimeout = setTimeout(() => {
      this.isScrolled = false;
    }, 1000);
  }

}
