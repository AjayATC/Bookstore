import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit{
  books: any[] = [];//array to hold list of books
  isLoading: boolean = true;
  errorMessage: string = '';
  searchQuery: string = '';
  filteredBooks: any[] =[];

  constructor(private bookService: BookService,private router: Router){}

  ngOnInit(): void {

    this.getBooks();
    
  }

  getBooks(): void{
    this.bookService.getBooks().subscribe(
      (data) => {
      this.books = data;
      this.filteredBooks = data;
      this.isLoading = false; 
    },
      (error) => {
        this.errorMessage = 'Failed to load books. Please try again later';
        this.isLoading = false;
      }
    );
  }
  
  onSearch(query: string): void{
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(query.toLocaleLowerCase())
    );
  }

  viewDetails(id: number){
    this.router.navigate(['/details', id]);
  }

  editBook(id: number){
    this.router.navigate(['/edit', id]);
  }

  deleteBook(id: number){
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter((book) => book.id != id);
    })
  }
}
