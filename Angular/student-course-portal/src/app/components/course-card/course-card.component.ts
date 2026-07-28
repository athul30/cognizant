import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnChanges {
  @Input() course: Course | undefined;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  private enrollmentService = inject(EnrollmentService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('course changed from', changes['course'].previousValue, 'to', changes['course'].currentValue);
    }
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(): void {
    if (!this.course) {
      return;
    }
    this.enrollRequested.emit(this.course.id);
  }

  isEnrolled(): boolean {
    return this.course ? this.enrollmentService.isEnrolled(this.course.id) : false;
  }

  // Using a getter keeps the template free of inline object literals, which
  // are re-evaluated on every change-detection cycle.
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled(),
      'card--full': !!this.course && this.course.credits >= 4,
      expanded: this.isExpanded
    };
  }

  get borderStyle() {
    const colorByStatus: Record<string, string> = {
      passed: 'green',
      failed: 'red',
      pending: 'grey'
    };
    const color = this.course ? colorByStatus[this.course.gradeStatus] : 'grey';
    return { 'border-left': `4px solid ${color}` };
  }
}
