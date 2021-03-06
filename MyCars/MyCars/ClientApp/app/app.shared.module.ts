import { AuthGuard } from './services/auth-guard.service';
import { ProgressService, BrowserXhrWithProgress } from './services/progress.service';
import { PhotoService } from './services/photo.service';
import * as Raven from 'raven-js';
import { FormsModule }  from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import { CommonModule } from '@angular/common';
import { HttpModule, BrowserXhr } from '@angular/http';
import { VehicleService } from './services/vehicle.service';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './app.error-handler';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './shared/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { AuthService } from './services/auth.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';

Raven.config('https://c4c75e3fea7945e8b2b59af0f2fdca33@sentry.io/294069').install();

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        CommonModule,
        HttpModule,         
        ChartModule,   
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [ AuthGuard ]},
            { path: 'vehicles/edit/:id', component: ViewVehicleComponent, canActivate: [ AuthGuard ]},
            { path: 'vehicles/:id', component: ViewVehicleComponent, canActivate: [ AuthGuard ]},
            { path: 'vehicles', component: VehicleListComponent, canActivate: [ AuthGuard ]},
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },        
        AuthGuard,
        AUTH_PROVIDERS,
        AuthService,
        VehicleService,
        PhotoService              
    ]
})
export class AppModuleShared {
}
