import { Component } from '@angular/core';
import { ChatboxComponent } from '../chatbox/chatbox.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedAngularMaterialModule } from '../../modules/shared-angular-material/shared-angular-material.module';

@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [ChatboxComponent, SharedAngularMaterialModule],
  templateUrl: './controller.component.html',
  styleUrl: './controller.component.scss',
})
export class ControllerComponent {}
