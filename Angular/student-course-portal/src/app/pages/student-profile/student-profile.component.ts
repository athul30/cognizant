import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment.service';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {
  enrolledCourses$: Observable<Course[]> | undefined;

  private enrollmentService = inject(EnrollmentService);

  ngOnInit(): void {
    this.enrolledCourses$ = this.enrollmentService.getEnrolledCourses();
  }
}
