import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private route = 'data.json';
  public projets:Array<any> = [];

  constructor(public router: Router) {
    this.start();
  }

  ngOnInit(): void {
    console.log('============= ininininini')
  }

  private start(): void {
    fetch(this.route)
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.projets = data;
      console.log(this.projets);
    });
  }

  public redirect(projet: any): void {
    this.router.navigate([projet.link, { state: { projet: projet } }]);
  }

}
