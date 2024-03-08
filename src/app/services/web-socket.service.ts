import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll, switchMap } from 'rxjs/operators';
import { EMPTY, of, Subject } from 'rxjs';
export const WS_ENDPOINT = 'ws://localhost:8080';
type ClientType = 'controller' | 'bot';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private ws!: WebSocket;
  private isAlive = false;
  private clientType: ClientType = 'controller';

  public connect(clientType: ClientType) {
    this.clientType = clientType;
    if (this.ws && this.isAlive) {
      console.log('A connection already exists');
      return;
    }
    this.ws = new WebSocket(WS_ENDPOINT);

    this.ws.onopen = () => {
      console.log('socket connection established...');
      this.isAlive = true;
      this.establishClientType();
    };

    this.ws.onclose = () => {
      this.isAlive = false;
      console.log('socket disconnected...');
    };

    this.ws.onmessage = (message) => {
      console.log('received: %s', JSON.stringify(message));
      console.log(message.data);
    };
  }

  public disconnect() {
    if (this.ws && this.isAlive) {
      this.ws.close();
      return;
    }
  }

  public constructor() {}

  public establishClientType() {
    this.ws.send(
      JSON.stringify({
        event: 'identify',
        clientType: this.clientType,
      })
    );
  }

  public sendMessage(msg: string) {
    if (this.ws && this.ws.OPEN) {
      console.log('sending message...');
      this.ws.send(
        JSON.stringify({
          event: 'message',
          clientType: this.clientType,
          message: msg,
        })
      );
    } else {
      console.log('no connection found...');
    }
  }
}
