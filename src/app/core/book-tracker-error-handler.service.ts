import { BookTrackerError } from 'app/models/bookTrackerErrors';
import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookTrackerErrorHandlerService {

  constructor() { }
  handleError(error: any): void {
    const customError: BookTrackerError = new BookTrackerError();
    customError.errorNumber = 200;
    customError.message = (<Error>error).message;
    customError.friendlyMessage = 'An error occurred. Please try again.';

    console.log(customError);
  }

}
