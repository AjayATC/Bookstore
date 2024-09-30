import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bookstore';
  searchQuery: string = '';

  @ViewChild(BookListComponent) bookListComponent!: BookListComponent;

  onSearch():void{
    console.log('Search query: ', this.searchQuery);
    console.log(this.bookListComponent)

    if(this.bookListComponent){
      this.bookListComponent.onSearch(this.searchQuery);
    }
  }
}
