import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  enrolledStudents$: Observable<{ id: number; name: string }[]> | undefined;

  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCourseById(id).subscribe((course) => (this.course = course));

    // switchMap cancels the previous getStudentsByCourse() call if the id
    // changes again before the first request completes, preventing an
    // out-of-order response from an earlier course overwriting a newer one.
    this.enrolledStudents$ = this.route.paramMap.pipe(
      switchMap((params) => this.enrollmentService.getStudentsByCourse(Number(params.get('id'))))
    );
  }
}
