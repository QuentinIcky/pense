import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-collection',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})

export class CollectionComponent implements OnInit {
  public currentCollection: any = null;
  private dataPath = 'data.json';
  public allCollections: Array<any> = [] ;
  private currentId: string | null = '';

  constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
      console.log(params);
      this.currentId = params.get('id');

      this.getData();
    });
  }

  private getData(): void {
    console.log('ininin')
    fetch(this.dataPath)
    .then(response => response.json())
    .then(data => {
      this.allCollections = data[1].collections;
      this.getCurrentProjet();
    });
  }

  private getCurrentProjet(): void {
    this.allCollections.forEach((collection: any) => {
      if (collection.id === this.currentId) {
        this.currentCollection = collection;
        console.log('this.currentCollection', this.currentCollection);
      }
    })
  }

  public redirect(id: string): void {
    console.log('----id ;', id);
    this.router.navigate([`collections/${id}`]);
  }
  
  public getYoutubeEmbedUrl(clipId: string): SafeResourceUrl {
      // Vérifie que l'ID est valide
      if (!/^[a-zA-Z0-9_-]{11}$/.test(clipId)) {
        console.warn(`ID vidéo non valide détecté : ${clipId}`);
        return ''; // Retourne une URL vide si l'ID est incorrect
      }
  
      // Crée l'URL YouTube de manière sécurisée
      const url = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(clipId)}`;
  
      // Assainit l'URL avant de la renvoyer
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public moveSlider(direction: 'prev' | 'next') {
    const slider = document.querySelector('.project-clips');
    if (slider) {
      const scrollAmount = direction === 'next' ? slider.scrollWidth / 3 : -slider.scrollWidth / 3;
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

}
