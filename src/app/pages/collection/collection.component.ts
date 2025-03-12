import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';


@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {
  collectionName: string | null = '';
  collection:Array<any> | null = null;
  projetRecu: any;
  public currentProject: any = null;
  private sub: any;


  constructor( private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer le paramètre de l'URL
    // if (this.router.getCurrentNavigation()?.extras.state) {
    //   this.projetRecu = this.router.getCurrentNavigation()?.extras.state?.['projet'];
    // }
    // this.sub = this.route
    //   .data
    //   .subscribe(v => {
    //     console.log(v)
    //     debugger;
    //     return v;
    //   });
    // this.getData();
  }

  private getData(): void {
      fetch('/data.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        debugger;
        this.currentProject = data;
      });
  }

}
