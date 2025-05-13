import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IntegrationsComponent } from './components/integrations/integrations.component';
import { AuthComponent } from './components/auth/auth.component';
import { AccountComponent } from './components/account/account.component';

export const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'manage', component: DashboardComponent},
	{path: 'integrations', component: IntegrationsComponent},
	{path: 'account', component: AccountComponent},
	{path: 'auth', component: AuthComponent},
];
