import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterModule } from '@angular/router';
import { GetSkillsService } from '../../services/get-skills.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,  // El componente se puede utilizar sin Angular CLI
  imports: [RouterLink, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  skills: any;

  constructor(public getSkills: GetSkillsService) {}

  ngOnInit(): void {
    try {
      this.getSkills.getSkills().subscribe((skills) => {
        this.skills = skills;
      });
    } catch (error) {
      console.error('Error obteniendo skills:', error);
    }
  }

  isSidebarHidden = true;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
