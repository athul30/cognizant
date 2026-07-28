import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

// Injects the same singleton CourseService as CourseListComponent and
// HomeComponent, demonstrating that all three share one instance
// (providedIn: 'root').
@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css'
})
export class CourseSummaryWidgetComponent implements OnInit {
  courses: Course[] = [];

  private courseService = inject(CourseService);

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => (this.courses = courses));
  }
}
