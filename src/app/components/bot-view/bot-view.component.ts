import { Component } from '@angular/core';
import { ChatboxComponent } from '../chatbox/chatbox.component';

@Component({
  selector: 'app-bot-view',
  standalone: true,
  imports: [ChatboxComponent],
  templateUrl: './bot-view.component.html',
  styleUrl: './bot-view.component.scss',
})
export class BotViewComponent {}
