import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Movie }  from '../../model/movie.model' ;
import { MovieResponse } from '../../model/movie-response.model';
import { MovieDetails } from '../../model/movie-details.model';
import { OmdbMovie } from '../../model/omdb.model'; 
import { OmdbSearchResponse } from '../../model/omdbSearchResponse.model';
import { OmdbMovieDetails } from '../../model/omdbDetails.model';
@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  private apiUrl = "http://www.omdbapi.com/?";
  private apiKey = "a3f451ca"; // Replace with your actual API key

  constructor(private http: HttpClient) { }

getAllMovies(page: number = 1): Observable<OmdbSearchResponse> {
  const params = new HttpParams()
    .set('apikey', this.apiKey)  
    .set('s', 'movie')          
    .set('page', page.toString())
;
  return this.http.get<OmdbSearchResponse>(this.apiUrl, { params }).pipe(
    catchError(this.handleError)
  );
}
  // Search movies with pagination
  searchMovies(searchTerm: string, page: number = 1): Observable<OmdbMovieDetails> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('page', page.toString())
      .set('t', searchTerm);
    return this.http.get<OmdbMovieDetails>(this.apiUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  // Get movie details by IMDB ID
  getMovieDetails(imdbId: string): Observable<OmdbMovieDetails> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('i', imdbId);

    return this.http.get<OmdbMovieDetails>(this.apiUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  // Handle API errors
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}