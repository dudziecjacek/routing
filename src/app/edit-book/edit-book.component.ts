import { OldBook } from 'app/models/oldBook';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit(): void {
    const bookID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getBookById(bookID).subscribe(
      (data: Book) => this.selectedBook = data,
      err => console.log(err)
    );

    this.dataService.getOldBookById(bookID).subscribe(
      data => console.log('old book', data)
    );
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook).subscribe(
      (data: void) => console.log(`${this.selectedBook.title} updated!`)
    );
    console.warn('Save changes to book not yet implemented.');
  }
}
