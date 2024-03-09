import { WebSocketService } from './../../services/web-socket.service';
import { Component } from '@angular/core';
import { SharedAngularMaterialModule } from '../../modules/shared-angular-material/shared-angular-material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Message } from './chatbox.model';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.scss',
})
export class ChatboxComponent {
  public chatInputFormControl: FormControl = new FormControl('');
  public messages: Message[] = [];
  public constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.onMessageReceived$.subscribe((message) => {
      this.pushMessage(message);
    });
  }

  sendMessage() {
    this.messages.push({
      clientType: this.webSocketService.clientType,
      message: this.chatInputFormControl.value,
    });
    this.webSocketService.sendMessage(this.chatInputFormControl.value);

    // reset value
    this.chatInputFormControl.setValue('');
  }

  pushMessage(msg: string) {
    this.messages.push({
      clientType: this.webSocketService.clientType,
      message: msg,
    });
  }
}
