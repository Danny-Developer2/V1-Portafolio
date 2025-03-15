import { Component, OnInit } from '@angular/core';
import { Project, ProjectsService } from '../../services/projects.service';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { RoleUser } from '../../services/role-user.service';
import { ProjectsComponent } from '../projects/projects.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true, // El componente se puede utilizar sin Angular CLI
  imports: [ProjectsComponent, ProjectsComponent, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private loginService: LoginService
  ) {}
  projects: Project[] = [];
  displayedProjects: Project[] = []; // Proyectos visibles en la página actual
  currentPage: number = 1;
  projectsPerPage: number = 4; // Número de proyectos por página
  paginasTotal: number = 1; //
  token: string | null = null;
  role: string = '';

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
      // Llamar al servicio para obtener los proyectos
      this.projectsService.getProjects().subscribe((data: Project[]) => {
        // const token = localStorage.getItem('token');

        this.projects = data;
        // this.setToken.setExpToken(token!)
        // this.role = this.roleUser.readTokenData(token!);

        this.updateDisplayedProjects();
      });
      //TODO Se encarga de validar que el token sea valido si no lo es cierra la session
      this.loginService.checkSession() && this.loginService.logaut(this.token!);
    }
    try {
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    }
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
