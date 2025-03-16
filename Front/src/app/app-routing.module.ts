import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './componente/landing-page/landing-page.component';
import { RegisterProjectComponent } from './componente/registerProjects/registerProject.component';
import { AuthGuard } from './componente/auth/auth.component';
import { DetailProjectComponent } from './componente/detail-project/detail-project.component';
import { EditarProjectComponent } from './componente/editar-project/editar-project.component';
import { Error404Component } from './componente/error-404/error-404.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';



export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'register-projects', component: RegisterProjectComponent,
    canActivate: [AuthGuard]  // Protege la ruta
  },
  { path: '404', component: Error404Component },
  { path: 'test-error', component: TestErrorsComponent},
  { path: 'server-error', component: ServerErrorComponent }, 
  
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
  },
  // Aquí irán las rutas
  {
    path: 'edit',
    loadChildren: () => import('./pages/edit/edit.module').then(m => m.EditModule),
    canActivate: [AuthGuard]  // Protege la ruta
  },
  {
    path: 'detail',
    loadChildren: () => import('./pages/detail/detail.module').then(m => m.DetailModule),
    canActivate: [AuthGuard]  // Protege la ruta
  },
  { path: '**', redirectTo: '404' }, // Esta debe ir al final
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Para rutas globales
  exports: [RouterModule],
})
export class AppRoutingModule {}
