import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { fromEvent, interval, Observable, of, timer } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, filter } from 'rxjs/operators';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnersCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {

  }

  ngOnInit() {

    const http$ = createHttpObservable('/api/courses');

    const courses$ = http$
      .pipe(
        tap(() => console.log('request')),
        map(res => Object.values<Course>(res['payload'])),
        shareReplay()
      );

    this.beginnersCourses$ = courses$
      .pipe(
        map((courses: Course[]) => courses.filter(course => course.category === 'BEGINNER'))
      );

    this.advancedCourses$ = courses$
      .pipe(
        map((courses: Course[]) => courses.filter(course => course.category === 'ADVANCED'))
      );

    courses$.subscribe(
      (resp) => console.log(resp),
      (err) => console.log(err),
      () => console.log()
    );
  }

}

function createHttpObservable(url: string) {
  return new Observable(observer => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
  });
}
