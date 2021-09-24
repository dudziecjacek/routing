import { Component, OnInit } from '@angular/core';
import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: []
})
export class AddBookComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void { }

  saveBook(formValues: any): void {
    const newBook: Book = formValues as Book;
    newBook.bookID = 0;

    this.dataService.addBook(newBook)
    .subscribe(
      (data: Book) => console.log(data),
      (err: any) => console.log(err)
    );
  }

}