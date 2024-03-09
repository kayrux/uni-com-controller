export interface Message {
  clientType: string;
  message: string;
  event: string;
}

export type ClientType = 'controller' | 'bot';
