import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

const API_URL = 'http://localhost:3000/enrollments';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  // Service-to-service injection: EnrollmentService depends on CourseService
  // to resolve enrolled course IDs into full Course objects.
  private courseService = inject(CourseService);
  private http = inject(HttpClient);

  private enrolledCourseIds: number[] = [];

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.courseService
      .getCourses()
      .pipe(map((courses) => courses.filter((c) => this.enrolledCourseIds.includes(c.id))));
  }

  getStudentsByCourse(courseId: number): Observable<{ id: number; name: string }[]> {
    if (!courseId) {
      return of([]);
    }
    return this.http.get<{ id: number; name: string }[]>(`${API_URL}?courseId=${courseId}`);
  }
}
