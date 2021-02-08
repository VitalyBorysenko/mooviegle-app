import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";

import { ClientFooterComponent } from "./client-footer/client-footer.component";
import { ClientHeaderComponent } from "./client-header/client-header.component";
import { SocialMenuComponent } from './social-menu/social-menu.component';

@NgModule({
  declarations: [
    ClientHeaderComponent,
    ClientFooterComponent,
    SocialMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
  ],
  exports:[
    ClientHeaderComponent,
    ClientFooterComponent,
    MatDialogModule,
    
  ]
})

export class LayoutModule { }