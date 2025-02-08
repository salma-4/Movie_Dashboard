import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OmdbService } from '../../../core/services/omdb.service';
import { OmdbMovieDetails } from '../../../model/omdbDetails.model';
@Component({
  selector: 'app-searched-movie',
  imports: [CommonModule],
  templateUrl: './searched-movie.component.html',
  styleUrl: './searched-movie.component.scss'
})
export class SearchedMovieComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router:Router,private omdbService: OmdbService ){}
  
  movie:OmdbMovieDetails |undefined;
  currentPage = 1;

  ngOnInit(): void {
    this.showMovie();
  }
   
  showMovie():void{
    const searchItem = String(this.route.snapshot.paramMap.get('t'));
     this.omdbService.searchMovies(searchItem,this.currentPage)
      .subscribe({
        next:(movieDetails)=>{
          this.movie =movieDetails;
        },error: (err) => {
          console.error('No Movies found:', err);
          this.router.navigate(['/admin-dashboard']);

        }

      })
      }
  }


