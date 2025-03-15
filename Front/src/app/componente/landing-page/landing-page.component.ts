import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Project, ProjectsService } from '../../services/projects.service';
import { jwtDecode } from 'jwt-decode';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { RoleUser } from '../../services/role-user.service';
import { ImageValidateUrlService } from '../../services/image-validate-url.service';
import { ProjectsComponent } from '../projects/projects.component';
import { CommonModule } from '@angular/common';
// import { SetExpToken } from '../../services/set-token.service';

@Component({
  selector: 'app-landing-page',
  imports: [ProjectsComponent, ProjectsComponent,CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private loginService: LoginService,
    private router: Router,
    private roleUser: RoleUser,
    // private setToken:SetExpToken
  ) {}
  projects: Project[] = [];
  displayedProjects: Project[] = []; // Proyectos visibles en la página actual
  currentPage: number = 1;
  projectsPerPage: number = 4; // Número de proyectos por página
  paginasTotal: number = 1; //
  token: string | null = null;
  role: string = '';

  // ngOnInit(): void {
  //   this.projectsService.getProjects().subscribe({
  //     next: (projects: Project[]) => {
  //       this.projects = projects;  // Almacena los proyectos en el componente para mostrarlos en la vista
  //       console.log('Proyectos obtenidos:', projects);
  //     },
  //     error: (error) => {
  //       console.error('Error al obtener los proyectos:', error);
  //     }
  //   });
  // }

  ngOnInit():void {
    // Llamar al servicio para obtener los proyectos
    this.projectsService.getProjects().subscribe((data: Project[]) => {
      const token = localStorage.getItem('token');
      this.projects = data;
      // this.setToken.setExpToken(token!)
      // this.role = this.roleUser.readTokenData(token!);
     
    
    
      this.updateDisplayedProjects();
    });
    //TODO Se encarga de validar que el token sea valido si no lo es cierra la session
    this.loginService.checkSession() && this.loginService.logaut(this.token!);
    // console.log(this.loginService.checkSession());
  }

  // Función para actualizar la lista de proyectos según la página actual
  updateDisplayedProjects() {
    const startIndex = (this.currentPage - 1) * this.projectsPerPage;
    const endIndex = startIndex + this.projectsPerPage;
    this.displayedProjects = this.projects.slice(startIndex, endIndex);
  }

  // Función para cambiar de página
  changePage(newPage: number) {
    this.currentPage = newPage;
    this.updateDisplayedProjects();
  }

  // Obtener el total de páginas
  // Obtener el total de páginas asegurando que siempre haya al menos 1 página
  get totalPages(): number {
    return (this.paginasTotal = Math.max(
      1,
      Math.ceil(this.projects.length / this.projectsPerPage)
    ));
  }

  downloadCV() {
    window.open(
      'https://drive.google.com/file/d/1vJRv3atfRw7Qa_txBudDwWnkOp9nCB6W/view?usp=sharing',
      '_blank'
    );
  }
}
