import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.scss'
})
export class ProjetsComponent implements OnInit {

  private dataPath = 'data.json';
  // private dataPath = '/assets/data.json';
  public allProjects: Array<any> = [];
  public currentProject: any = null;
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
    fetch(this.dataPath)
    .then(response => response.json())
    .then(data => {
      this.allProjects = data[0].projects;
      this.getCurrentProjet();
    });
  }

  private getCurrentProjet(): void {
    this.allProjects.forEach((project: any) => {
      if (project.id === this.currentId) {
        this.currentProject = project;
        console.log('this.currentProject', this.currentProject);
      }
    })
  }

  public redirect(id: string): void {
    console.log('----id ;', id);
    this.router.navigate([`collections/${id}`]);
  }

  public shuffleAndPickThree<T>(array: T[]): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
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
