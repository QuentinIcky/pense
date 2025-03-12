import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  private allProjects = [];
  public currentProject: any = null;
  private currentId: string | null = '';

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
     // Récupérer le paramètre de l'URL
     this.route.paramMap.subscribe(params => {
      console.log(params);
      this.currentId = params.get('id');

      this.getData();
    });
  }

  private getData(): void {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
      this.allProjects = data;
      console.log(this.allProjects);
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
