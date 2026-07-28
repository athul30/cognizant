import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { EnrollmentService } from '../../services/enrollment.service';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesError, selectCoursesLoading } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  searchTerm = '';
  selectedCourseId: number | null = null;

  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private enrollmentService = inject(EnrollmentService);

  constructor() {
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
  }

  // trackBy avoids re-rendering every card on array changes — Angular only
  // updates cards whose id actually changed, instead of destroying/recreating
  // the whole list.
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onSearchChange(): void {
    this.router.navigate(['courses'], {
      queryParams: { search: this.searchTerm || null }
    });
  }

  onCourseSelected(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.enrollmentService.enroll(courseId);
    this.selectedCourseId = courseId;
  }
}
