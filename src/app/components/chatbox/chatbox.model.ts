export interface Message {
  clientType: string;
  message: string;
  event: string;
  translatedText?: string;
  translationLanguageCode?: string;
}

export type ClientType = 'controller' | 'bot';
