import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[];
  constructor(private movieServices: MoviesService) {
    this.getMovies();
  }

  getMovies() {
    this.movieServices.get().subscribe((data: Movie[]) => {
      this.movies = data;
    }, (error) => {
      //console.log(error);
      alert('Ocurrió un error');
    })    
  }

  ngOnInit() {
  }

  delete(id) {
    if(confirm('Desea eliminar esta película?')) {
      this.movieServices.delete(id).subscribe((data) => {
        alert('Película Eliminada');
        this.getMovies();
        console.log(data);
      }, (error) => {
        alert('Ocurrió un error');
        console.log(error);
        this.getMovies();
      })
    }
  }
}