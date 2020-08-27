
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  messages: string[] = [];

  add(message: any) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}