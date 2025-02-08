// movie-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { MovieDetails } from '../../model/movie-details.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit{

  movie:MovieDetails| undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}
ngOnInit(): void {
  const movieId = Number(this.route.snapshot.paramMap.get('id'));
  
  this.movieService.getMovieDetails(movieId).subscribe({
    next: (movieDetails) => {
      this.movie = movieDetails; 
      console.log("movie")
      console.log(movieDetails);
    },
    error: (err) => {
      console.error('Error fetching movie details:', err);
    }
  });
}
}

