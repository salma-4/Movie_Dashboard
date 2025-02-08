import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Movie }  from '../../model/movie.model' ;
import { MovieResponse } from '../../model/movie-response.model';
import { MovieDetails } from '../../model/movie-details.model';
@Injectable({
  providedIn: 'root' // service is globally available
})
export class MovieService {
  private apiUrl = 'http://localhost:8081/dashboard-api/v1/user/movies';
  private static readonly STATIC_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb25lZUBleGFtcGxlLmNvbSIsInJvbGUiOiJST0xFX1VTRVIiLCJleHAiOjE3Mzk2MTM5NjgsImlhdCI6MTczOTAwOTE2OH0.LvL5_QIaxX9aC3gewLhtr30eDanUFkW-YQgGncWOA7c';
    //localStorage.getItem('authToken'); // Retrieve token from local storage

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${MovieService.STATIC_TOKEN}`
    });
  }

  getMovies(page: number, size: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}?page=${page}&size=${size}`,
      { headers: this.getHeaders() }
    );
  }
   
      // Fetch details for a single movie 
      getMovieDetails(id: number): Observable<MovieDetails> {
        return this.http.get<MovieDetails>(`${this.apiUrl}/${id}`
          ,{ headers: this.getHeaders() }
           ).pipe(
          catchError((error) => {
            console.error('API Error:', error);
            return throwError(() => new Error('Failed to fetch movie details'));
          })
        );
      }
  //TODO search by title 
}
