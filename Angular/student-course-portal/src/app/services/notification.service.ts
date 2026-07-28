import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Provided at component level (see NotificationComponent) rather than 'root',
// so each component that provides it gets its own isolated instance.
@Injectable()
export class NotificationService {
  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  show(message: string): void {
    this.messageSubject.next(message);
  }

  clear(): void {
    this.messageSubject.next(null);
  }
}
