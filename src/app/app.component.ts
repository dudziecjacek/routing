import { Component, OnInit } from '@angular/core';
import { WikiService } from './wiki.service';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

enum SortingType {
  increase = 'increase',
  decrease = 'decrease'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'routing';
  results = [];
  sortingType: SortingType;
  private modelChanged: Subject<string> = new Subject<string>();
  private subscription: Subscription;
  debounceTime = 200;


  constructor(private wikiService: WikiService) {
    console.log(this.sortingType);
  }

  ngOnInit(): void {
    this.subscription = this.modelChanged
      .pipe(
        debounceTime(this.debounceTime),
      )
      .subscribe((val) => {
        this.wikiService.searchWiki(val)
          .subscribe(val2 => {
            this.results = val2.query.search;
          });
      });
  }

  inputChanged(value: string) {
    this.modelChanged.next(value);
  }

  sort(): void {
    if (this.sortingType === SortingType.decrease) {
      this.results.sort((a, b) => a.wordcount - b.wordcount);
      this.sortingType = SortingType.increase;
    } else {
      this.results.sort((a, b) => b.wordcount - a.wordcount);
      this.sortingType = SortingType.decrease;
    }
  }
}
