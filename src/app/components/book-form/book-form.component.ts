import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit{

  bookForm!: FormGroup;
  bookId!: number ;
  isEditMode: boolean = false; 

 
  constructor(
    private fb: FormBuilder,
    private bookService : BookService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  
  ngOnInit(): void {

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(1)]]
    })

    this.bookId = this.route.snapshot.params['id'];
    if(this.bookId){
      this.isEditMode = true;
      this.loadBookData();
      }
    }

    loadBookData(): void{
      if(this.bookId){
        this.bookService.getBook(this.bookId).subscribe((book) => {
          this.bookForm.patchValue(book);
        })
      }    
    }

    onSubmit(): void{
      if(this.bookForm.invalid) return;

      if(this.isEditMode && this.bookId){
        this.bookService.updateBook(this.bookId, this.bookForm.value).subscribe(() => {
          this.router.navigate(['/books']);
        })
      }else {
        this.bookService.addBook(this.bookForm.value).subscribe(() => {
          this.router.navigate(['/books']);
        })
      }
    }

    onCancel(): void{
      this.router.navigate(['/books']);
    }
  }
