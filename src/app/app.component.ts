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

  connect() {
    console.log('connecting...');
    this.webSocketService.connect();
  }

  helloWorld() {
    this.webSocketService.sendMessage('Hello World');
  }

  a() {
    this.webSocketService.sendMessage('a');
  }
}
