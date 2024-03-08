import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './services/web-socket.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
type State = 'selection' | 'controller' | 'bot';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'uni-com-controller';
  public currentState: State = 'selection';
  public constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {}

  connectAsController() {
    console.log('connecting as controller...');
    this.webSocketService.connect('controller');
    this.currentState = 'controller';
  }

  connectAsBot() {
    console.log('connecting as bot...');
    this.webSocketService.connect('bot');
    this.currentState = 'bot';
  }

  returnToSelection() {
    this.currentState = 'selection';
  }

  helloWorld() {
    this.webSocketService.sendMessage('Hello World');
  }

  a() {
    this.webSocketService.sendMessage('a');
  }
}
