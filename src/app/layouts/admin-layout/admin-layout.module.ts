import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { MapsComponent } from '../../maps/maps.component';
import { LocomotivesComponent } from '../../locomotives/locomotives.component';
import { EnforcementsComponent } from '../../enforcements/enforcements.component';
import { EventsComponent } from '../../events/events.component';
import { TracksComponent } from '../../tracks/tracks.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    MapsComponent,
    LocomotivesComponent,
    EnforcementsComponent,
    EventsComponent,
    TracksComponent
  ]
})

export class AdminLayoutModule {}
