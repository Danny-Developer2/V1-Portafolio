import { Component, OnInit } from '@angular/core';
import { Project, ProjectsService } from '../../services/projects.service';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { RoleUser } from '../../services/role-user.service';
import { ProjectsComponent } from '../projects/projects.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ProjectsComponent, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private loginService: LoginService
  ) {}

  projects: Project[] = [];
  currentPage: number = 1;
  projectsPerPage: number = 3;
  paginasTotal: number = 1;
  token: string | null = null;
  role: string = '';

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    // Validación de token y sesión
    if (this.loginService.checkSession()) {
      this.loginService.logaut(token);
      return;
    }

    this.loadProjects(this.currentPage, this.projectsPerPage);
  }

  // Cargar proyectos con paginado del backend
  loadProjects(page: number, size: number) {
    this.projectsService.getProjects(page, size).subscribe({
      next: (data) => {
        this.projects = data.items;
        this.paginasTotal = data.totalPages;
        this.currentPage = data.pageNumber;
      },
      error: (error) => {
        console.error('Error al obtener los proyectos:', error);
      },
    });
  }

  // Cambiar de página
  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.paginasTotal) {
      this.loadProjects(newPage, this.projectsPerPage);
    }
  }

  // Total de páginas (getter, opcional si usas paginasTotal directamente)
  get totalPages(): number {
    return this.paginasTotal;
  }

  downloadCV() {
    window.open(
      'https://drive.google.com/file/d/1vJRv3atfRw7Qa_txBudDwWnkOp9nCB6W/view?usp=sharing',
      '_blank'
    );
  }
}