import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Hardcoded for now, per Hands-On 7 Task 2.
  isLoggedIn = true;
}
