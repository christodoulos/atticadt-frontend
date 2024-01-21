import { Injectable, inject, signal } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  socialAuthService = inject(SocialAuthService);
  http = inject(HttpClient);

  user = signal(<SocialUser | null>null);

  constructor() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        console.log(user);
        const { idToken } = user;
        // this.http
        //   .post('http://localhost:3456/api/auth/google-login', {
        //     idToken,
        //   })
        //   .subscribe((res) => {
        //     console.log(res);
        //   });
        this.user.set(user);
      }
    });
  }

  signOut() {
    this.socialAuthService.signOut();
    this.user.set(null);
  }
}
