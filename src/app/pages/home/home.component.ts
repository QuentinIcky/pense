import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private route = 'data.json';
  public projets:Array<any> = [];
  public collections:Array<any> = [];

  constructor(public router: Router) {
    this.start();
  }

  ngOnInit(): void {
  }

  private start(): void {
    fetch(this.route)
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.projets = data[0].projects;
      this.collections = data[1].collections;
      console.log('projets : ', this.projets);
      console.log('collections : ', this.collections);
    });
  }

  public redirect(type:string, projet: any): void {
    this.router.navigate([`/${type}/${projet.id}`]);
    window.scroll(0,0);
  }

}
