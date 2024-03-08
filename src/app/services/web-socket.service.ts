import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll, switchMap } from 'rxjs/operators';
import { EMPTY, of, Subject } from 'rxjs';
export const WS_ENDPOINT = 'ws://localhost:8080';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private ws!: WebSocket;

  public connect() {
    this.ws = new WebSocket(WS_ENDPOINT);

    this.ws.onopen = () => {
      console.log('socket connection established...');
      this.establishSender();
    };

    this.ws.onclose = () => {
      console.log('socket disconnected...');
    };
  }

  public constructor() {}

  public establishSender() {
    this.ws.send(
      JSON.stringify({
        event: 'identify',
        sender: 'controller',
      })
    );
  }

  public sendMessage(msg: string) {
    if (this.ws && this.ws.OPEN) {
      console.log('sending message...');
      this.ws.send(
        JSON.stringify({
          event: 'message',
          sender: 'controller',
          message: msg,
        })
      );
    } else {
      console.log('no connection found...');
    }
  }
}
