import { DataService } from 'app/core/data.service';
import { Component, OnInit } from '@angular/core';

import { Reader } from 'app/models/reader';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styles: []
})
export class AddReaderComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void { }

  saveReader(formValues: any): void {
    const newReader: Reader = formValues as Reader;
    newReader.readerID = 0;
    this.dataService.addReader(newReader).subscribe(
      data => console.log(data, 'added!'),
      err => console.log(err)
    );
  }

}
