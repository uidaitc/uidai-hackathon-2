import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn: boolean;

  private apiServerUrl: string = environment.apiURL;  
  private httpOptions:object = {
    responseType: 'text',
  };

  constructor(private http: HttpClient) {
    if(localStorage. getItem('uid') != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  public signIn(details: any): Observable<string> {
    return this.http.post<string>(`${this.apiServerUrl}/otp/send`, details, this.httpOptions);
  }

  public verifyOTP(details: any): Observable<string> {
    return this.http.post<string>(`${this.apiServerUrl}/otp/verify`, details, this.httpOptions);
  }

  public logout(): void {
    localStorage.removeItem('uid');
    this.isLoggedIn = false;
  }
}
