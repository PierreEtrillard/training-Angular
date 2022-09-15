import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DisneyDetailComponent } from "./disney-detail/disney-detail.component";
import { DisneyListComponent } from "./disney-list/disney-list.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { FaceSnapListComponent } from "./face-snap-list/face-snap-list.component";
import { SingleFaceSnapComponent } from "./single-face-snap/single-face-snap.component";
import { CharacterFormComponent } from "./character-form/character-form.component";

const routes: Routes = [
    { path: 'home', component: LandingPageComponent },
    { path: '', redirectTo: 'home', pathMatch:'full' },
    { path: 'disney', component: DisneyListComponent },
    { path: 'disney/:id', component: DisneyDetailComponent },
    { path: 'disney/submit/:id', component: CharacterFormComponent },
    { path: 'facesnaps/:id', component: SingleFaceSnapComponent },
    { path: 'facesnaps', component: FaceSnapListComponent },
    { path: '**', component:PageNotFoundComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule{}