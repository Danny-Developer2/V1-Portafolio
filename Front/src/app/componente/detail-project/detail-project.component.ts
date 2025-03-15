import { Component } from '@angular/core';
import { Project, ProjectsService } from '../../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-detail-project',
  standalone: true,   // El componente se puede utilizar sin Angular CLI
  imports: [
    CommonModule
  ],
  templateUrl: './detail-project.component.html',
  styleUrl: './detail-project.component.scss'
})



export class DetailProjectComponent {

  // project!: Project;
  project?: Project 
  id: number = 0;
  role: string = '';
  token: string | null = null // Obtiene el token actual
  

  constructor(private projectService:ProjectsService,  private route: ActivatedRoute,  private redirect: Router, private toastr: ToastrService,){}

  
  
  ngOnInit(id: number) {
    if(id === null){
      this.toastr.error('Error al obtener el proyecto', '',{
        timeOut: 5000,
        positionClass: 'toast-top-right',
      });
      return;  // Salir del método si no hay id
    }

    try{

      this.route.paramMap.subscribe(params => {
        const idParam = params.get('id'); // Obtener el id de la URL
        if (idParam) {
          this.id = +idParam; // Convertir a número
          this.getProjectDetail(this.id);
        }
      });
    }
    catch(error){
      console.error('Error al obtener los proyectos:', error);
    }
  }

    // Llamar al servicio para obtener los proyectos
  
    getProjectDetail(id: number) {
      if(id === null){
        this.toastr.error('Error al obtener el proyecto', '',{
          timeOut: 5000,
          positionClass: 'toast-top-right',
        });
        return;  // Salir del método si no hay id
      }
      try {

        this.projectService.getProjectById(id).subscribe(
          (data: Project) => {
            // Aquí asumimos que la API retorna un solo proyecto, no un arreglo
            this.project =data; // Si no existe el proyecto, se asigna null
            // console.log(this.project.imgUrl);
          },
          (error) => {
            console.error('Error al obtener los detalles del proyecto:', error);
          }
        );
      }
      catch (error) {
        console.error('Error al obtener los detalles del proyecto:', error);
      }
    }
  //  aqui tienes que poner toda la logica despues de la eliminacion
    deleteProject(id: number) {
      if(!id){
        this.toastr.error('Error al eliminar el poryecto', '',{
          timeOut: 5000,
          positionClass: 'toast-top-right',
        });
        return;  // Salir del método si no hay id
      }
      if(this.projectService.deleteProject(id) !== null){
        this.toastr.success('Proyecto Eliminado con exito ', '',{
          timeOut: 5000,
          positionClass: 'toast-top-right',
        });
        this.redirect.navigate(['/']); // Redirigir al listado de proyectos
      
      }else{
        this.toastr.error('Error al eliminar el proyecto', '',{
          timeOut: 5000,
          positionClass: 'toast-top-right',
        });
        return;  // Salir del método si el proyecto no se pudo eliminar
      }

       
    }
    
    confirmDelete(id: number): void {
      if(id === null ) {
        this.toastr.error('Error al confirmar la eliminación', '',{
          timeOut: 5000,
          positionClass: 'toast-top-right',
        });
        return;  // Salir del método si no hay id  // No es necesario, ya que el método deleteProject retorna null si el proyecto no se pudo eliminar
      }
      try{

        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este proyecto?');
        
        if (confirmDelete) {
          this.deleteProject(id); 
        }
      }
      catch(error){
        console.error('Error al confirmar la eliminación:', error);
      }
    }


    getToken(){
      const token = sessionStorage.getItem('role');
      if(!token) {
        return '';  // No hay token, retornar vacío
      }
      return token;
    }
  
    
    
    
  }


