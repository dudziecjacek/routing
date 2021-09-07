import { HighlightedDirective } from './directives/highlighted.directive';
import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { COURSES } from '../db-data';
import { Course } from './model/course';
import { CourseCardComponent } from './course-card/course-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  courses = COURSES;
  isLight = false;

  @ViewChild(HighlightedDirective)
  highlighted: HighlightedDirective;

  @ViewChildren(CourseCardComponent, { read: ElementRef })
  cards: QueryList<ElementRef>;

  constructor() {

  }

  onToggle(isHighlighted: boolean) {
    console.log(isHighlighted);
  }

  ngAfterViewInit() {
    console.log(this.highlighted);
  }

  onCourseSelected(course: Course) {

  }

}
