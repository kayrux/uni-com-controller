import { WebSocketService } from './../../services/web-socket.service';
import { Component } from '@angular/core';
import { ChatboxComponent } from '../chatbox/chatbox.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedAngularMaterialModule } from '../../modules/shared-angular-material/shared-angular-material.module';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [ChatboxComponent, SharedAngularMaterialModule],
  templateUrl: './controller.component.html',
  styleUrl: './controller.component.scss',
})
export class ControllerComponent {
  public languageCodeToFriendlyNameMap: { [key: string]: string } = {
    en: 'English',
    de: 'German',
    fr: 'French',
    hi: 'Hindi',
    it: 'Italian',
    ja: 'Japanese',
  };

  public botLanguageFormControl: FormControl = new FormControl('en');
  public controllerLanguageFormControl: FormControl = new FormControl('en');

  public constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.botLanguageFormControl.valueChanges.subscribe(() => {
      this.changeLanguage();
    });

    this.controllerLanguageFormControl.valueChanges.subscribe(() => {
      this.changeLanguage();
    });
  }

  public changeLanguage() {
    this.webSocketService.changeLanguage(
      this.botLanguageFormControl.value,
      this.controllerLanguageFormControl.value
    );
  }
}
