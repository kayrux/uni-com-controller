import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll, switchMap } from 'rxjs/operators';
import { EMPTY, of, Subject } from 'rxjs';
import { ClientType, Message } from '../components/chatbox/chatbox.model';
export const WS_ENDPOINT = 'ws://localhost:8080';
export const WS_ENDPOINT_2 = 'ws://10.13.173.87:8080';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private ws!: WebSocket;
  private isAlive = false;
  public clientType: ClientType = 'controller';
  public onMessageReceived$: Subject<Message> = new Subject<Message>();

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

    this.ws.onmessage = (messageEvent) => {
      const parsedData = JSON.parse(messageEvent.data);
      if (parsedData.clientType !== this.clientType) {
        switch (parsedData.event) {
          case 'message':
            this.onMessageReceived$.next(parsedData);
            break;
        }
      }
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

  public changeLanguage(botLanguage?: string, controllerLanguage?: string) {
    console.log('changed language');
    this.ws.send(
      JSON.stringify({
        event: 'language',
        botLanguage: botLanguage || 'en',
        controllerLanguage: controllerLanguage || 'en',
      })
    );
  }
}
