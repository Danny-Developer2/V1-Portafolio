import { Component, OnInit } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { PagedResult, Project, ProjectsService } from '../../services/projects.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent implements OnInit {

  projects: Project[] = []; // Ya viene paginado del backend
  currentPage: number = 1;
  projectsPerPage: number = 3;
  totalPages: number = 1;

  token: string | null = null;
  role: string = '';
  projectsFroms: FormGroup;
  pagedProjects!: PagedResult<Project>;

  constructor(
    private projectsService: ProjectsService,
    private fb: FormBuilder
  ) {
    this.projectsFroms = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      technology: ['', Validators.required],
      url: ['', Validators.required],
      imgUrl: ['', Validators.required],
      skills: this.fb.array([this.createSkillsGroup()]),
      experience: this.fb.array([this.createExperienceGroup()])
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    this.role = sessionStorage.getItem('role')!;

    this.loadProjects(this.currentPage, this.projectsPerPage);
  }

  // Cargar proyectos paginados desde el backend
  loadProjects(page: number, size: number) {
    this.projectsService.getProjects(page, size).subscribe(data => {
      this.projects = data.items;
      this.totalPages = data.totalPages;
      this.currentPage = data.pageNumber; // Actualiza la página actual
    });
  }

  // Cambiar de página
  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.loadProjects(newPage, this.projectsPerPage);
    }
  }

  // Crear grupo de skills
  createSkillsGroup(): FormGroup {
    return this.fb.group({
      id: [0],
      name: ['', Validators.required],
      percentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      iconUrl: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Crear grupo de experiencia
  createExperienceGroup(): FormGroup {
    return this.fb.group({
      id: [0],
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
}