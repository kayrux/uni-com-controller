import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'uni-com-controller';
  public constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {}

  connectAsController() {
    console.log('connecting as controller...');
    this.webSocketService.connect('controller');
  }

  connectAsBot() {
    console.log('connecting as bot...');
    this.webSocketService.connect('bot');
  }

  helloWorld() {
    this.webSocketService.sendMessage('Hello World');
  }

  a() {
    this.webSocketService.sendMessage('a');
  }
}
