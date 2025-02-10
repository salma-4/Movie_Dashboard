import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../../../core/services/omdb.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MovieDetails } from '../../../model/movie-details.model';
import { OmdbMovieDetails } from '../../../model/omdbDetails.model';
import { MovieService } from '../../../core/services/adminmovie.service';

@Component({
  selector: 'app-admin-movie',
  imports: [],
  templateUrl: './admin-movie.component.html',
  styleUrls: ['./admin-movie.component.scss','./searched-movie.component.scss']
})
export class AdminMovieComponent implements OnInit{
 
  constructor(private adminMovieService: MovieService,private omdbservice:OmdbService,private route: ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.showMovieDetails();
  }
  movie:OmdbMovieDetails |undefined;


  showMovieDetails(){
    const searchItem = String(this.route.snapshot.paramMap.get('i'));
    this.omdbservice.getMovieDetails(searchItem)
    .subscribe({
      next:(movieDetails)=>{
        this.movie =movieDetails;
      },error: (err) => {
        console.error('No Movies found:', err);
        this.router.navigate(['/admin-dashboard']);

      }
    });
  }

  goBack():void{
    this.router.navigate(['/admin/admin-dashboard/allMovies']);
  }

  addMovie(): void {
    if (this.movie) {
      const newMovieDetails: MovieDetails = {
        id: 0,
        imdbID: this.movie.imdbID,
        title: this.movie.Title,
        year: this.movie.Year,
        genre: this.movie.Genre,
        director: this.movie.Director,
        actors: this.movie.Actors,
        plot: this.movie.Plot,
        rated: this.movie.Rated,
        runtime: this.movie.Runtime,
        type: this.movie.Type,
        language: this.movie.Language,
        country: this.movie.Country,
        poster: this.movie.Poster,
        imdbRating: this.movie.imdbRating
      };
  
      this.adminMovieService.addMovie(newMovieDetails).subscribe({
        next: (response) => {
          console.log('Movie added successfully:', response);
          alert(response.message); 
          this.router.navigate(['/admin/admin-dashboard/allMovies']); 
        },
        error: (err) => {
          if (err.status === 409) {
            alert('This movie has already been added before.');
          } else {
            alert('Failed to add movie. Please try again.');
          }
        }
      });
    }
  }


}
