import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Project, ProjectsService } from '../../services/projects.service';
import { LoginService } from '../../services/login.service';
import { RoleUser } from '../../services/role-user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  displayedProjects: Project[] = []; // Proyectos visibles en la página actual
  currentPage: number = 1; 
  projectsPerPage: number = 3; // Número de proyectos por página
  paginasTotal: number = 1; //
  token: string | null = null;
  role: string = '';
  projectsFroms:FormGroup


     constructor(private projectsService: ProjectsService,private loginService:LoginService,private router: Router, private roleUser:RoleUser,private fb: FormBuilder) { 
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
 // Método para crear un grupo de habilidades basado en la interfaz Skill
 createSkillsGroup(): FormGroup {
  return this.fb.group({
    id: [0], // Puede ser opcional o generado automáticamente
    name: ['', Validators.required], // Nombre de la habilidad
    percentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]], // Nivel en porcentaje
    iconUrl: ['', Validators.required], // URL del icono de la habilidad
    description: ['', Validators.required] // Breve descripción
  });
}

// Método para crear un grupo de experiencia basado en la interfaz Experience
createExperienceGroup(): FormGroup {
  return this.fb.group({
    id: [0], // Identificador único
    companyName: ['', Validators.required], // Nombre de la empresa
    position: ['', Validators.required], // Cargo desempeñado
    startDate: ['', Validators.required], // Fecha de inicio
    endDate: ['', Validators.required], // Fecha de finalización
    description: ['', Validators.required] // Descripción de la experiencia
  });
}

   ngOnInit()  {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      
      const formRegisterProject = {
        ...this.projectsFroms.value,
      }

      try {
        // Llamar al servicio para obtener los proyectos
        this.projectsService.getProjects().subscribe((data = formRegisterProject) => {
          const role = sessionStorage.getItem('role');
          this.role = role!
          this.projects = data;
          // console.log(data)
          this.updateDisplayedProjects();
        });
        //TODO Se encarga de validar que el token sea valido si no lo es cierra la session
        this.loginService.checkSession() && this.loginService.logaut(this.token!);
        // console.log(this.loginService.checkSession());

      }
      catch (error) {
        console.error('Error en la obtención de proyectos:', error);
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
    return this.paginasTotal= Math.max(1, Math.ceil(this.projects.length / this.projectsPerPage));
  }
  

}
