import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{
  book: any = null; //holds the book details
  bookId: number | null = null;
  isLoading: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : null;

    if(this.bookId){
      this.bookService.getBook(this.bookId).subscribe(
        (data) => {
        this.book = data;
      },
        (error) => {
          console.log('Error fetching book details: ' , error);
          this.isLoading = false;
        }
      )
    }
  }
}
