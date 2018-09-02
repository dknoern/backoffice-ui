import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { MapsComponent } from '../../maps/maps.component';
import { LocomotivesComponent } from '../../locomotives/locomotives.component';
import { EnforcementsComponent } from '../../enforcements/enforcements.component';
import { EventsComponent } from '../../events/events.component';
import { TracksComponent } from '../../tracks/tracks.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'locomotives',    component: LocomotivesComponent },
    { path: 'enforcements',         component: EnforcementsComponent },
    { path: 'events',         component: EventsComponent },
    { path: 'tracks',         component: TracksComponent },
];

