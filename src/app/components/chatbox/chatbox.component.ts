import { WebSocketService } from './../../services/web-socket.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
  imports: [SharedAngularMaterialModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.scss',
})
export class ChatboxComponent {
  @ViewChild('chatboxMessages') private chatboxMessages!: ElementRef;
  public chatInputFormControl: FormControl = new FormControl('');
  public messages: Message[] = [];
  public chatInput: string = '';
  public constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.onMessageReceived$.subscribe((message) => {
      this.pushMessage(message);
    });
  }

  sendMessage() {
    if (this.chatInput.trim() !== '') {
      this.messages.push({
        clientType: this.webSocketService.clientType,
        message: this.chatInput,
        event: 'message',
      });
      this.webSocketService.sendMessage(this.chatInput);
      setTimeout(() => {
        this.chatboxMessages.nativeElement.scrollTop =
          this.chatboxMessages.nativeElement.scrollHeight;
      }, 0);
      this.chatInput = '';
    }
  }

  pushMessage(msg: Message) {
    this.messages.push({
      event: msg.event,
      clientType: msg.clientType,
      message: msg.message,
    });
    setTimeout(() => {
      this.chatboxMessages.nativeElement.scrollTop =
        this.chatboxMessages.nativeElement.scrollHeight;
    }, 0);
  }
}
