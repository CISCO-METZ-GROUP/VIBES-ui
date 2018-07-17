import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private subjectOEM: Rx.Subject<MessageEvent>;
  private wsOEM: WebSocket;
  private subjectT1: Rx.Subject<MessageEvent>;
  private wsT1: WebSocket;

  constructor() { }

  public connectOEM(url: string): Rx.Subject<MessageEvent> {
      if (!this.subjectOEM) {
          this.subjectOEM = this.createOEM(url);
      }
      return this.subjectOEM;
  }

  public connectT1(url: string): Rx.Subject<MessageEvent> {
    if (!this.subjectT1) {
        this.subjectT1 = this.createT1(url);
    }
    return this.subjectT1;
}

  public closeOEM() {
    this.wsOEM.close();
    this.subjectOEM = null;
  }

  public closeT1() {
    this.wsT1.close();
    this.subjectT1 = null;
  }

  private createOEM(url): Rx.Subject<MessageEvent> {
      this.wsOEM = new WebSocket(url);

      const observable = Rx.Observable.create(
        (obs: Rx.Observer<MessageEvent>) => {
            this.wsOEM.onmessage = obs.next.bind(obs);
            this.wsOEM.onerror = obs.error.bind(obs);
            this.wsOEM.onclose = obs.complete.bind(obs);

            return this.wsOEM.close.bind(this.wsOEM);
        }
      );

      const observer = {
          next: (data: Object) => {
              if (this.wsOEM.readyState === WebSocket.OPEN) {
                this.wsOEM.send(JSON.stringify(data));
              }
          }
      };

      return Rx.Subject.create(observer, observable);
  }

  private createT1(url): Rx.Subject<MessageEvent> {
    this.wsT1 = new WebSocket(url);

    const observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
          this.wsT1.onmessage = obs.next.bind(obs);
          this.wsT1.onerror = obs.error.bind(obs);
          this.wsT1.onclose = obs.complete.bind(obs);

          return this.wsT1.close.bind(this.wsT1);
      }
    );

    const observer = {
        next: (data: Object) => {
            if (this.wsT1.readyState === WebSocket.OPEN) {
              this.wsT1.send(JSON.stringify(data));
            }
        }
    };

    return Rx.Subject.create(observer, observable);
}

}
