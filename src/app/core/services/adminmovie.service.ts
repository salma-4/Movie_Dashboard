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
  private apiUrl = 'http://localhost:8081/dashboard-api/v1/admin/movies';
  private static readonly STATIC_TOKEN =localStorage.getItem('token'); // Retrieve token from local storage

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${MovieService.STATIC_TOKEN}`
    });

}

 addMovie(movie: Movie): Observable<any> {
    return this.http.post<Movie>(this.apiUrl, movie,{headers:this.getHeaders()});
  }

  getAllMovies(page: number, size: number) : Observable<MovieResponse>{
    return this.http.get<MovieResponse>(
      `${this.apiUrl}?page=${page}&size=${size}`,
      {headers:this.getHeaders()});
  }
  
  deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${movieId}`, { headers: this.getHeaders() });
  }
  


}