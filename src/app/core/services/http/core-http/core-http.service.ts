import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreHttpService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  protected get<T>(slug: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${slug}`);
  }

  protected post<T>(slug: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${slug}`, body);
  }

  protected put<T>(slug: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${slug}`, body);
  }

  protected delete<T>(slug: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${slug}`);
  }
}
