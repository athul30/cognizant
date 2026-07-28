import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CanComponentDeactivate } from '../../guards/unsaved-changes.guard';

// Custom synchronous validator: rejects course codes starting with the
// disallowed 'XX' prefix.
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (typeof value === 'string' && value.startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Custom async validator: simulates a server-side "email already taken"
// check. Async validators run only after all sync validators pass, so we
// avoid firing this for an already-invalid email.
export function simulateEmailCheck(control: AbstractControl): Observable<ValidationErrors | null> {
  return new Observable((observer) => {
    const timeout = setTimeout(() => {
      if (typeof control.value === 'string' && control.value.includes('test@')) {
        observer.next({ emailTaken: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 800);

    return () => clearTimeout(timeout);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css'
})
export class ReactiveEnrollmentFormComponent implements OnInit, CanComponentDeactivate {
  enrollForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: this.fb.control('', [Validators.required, Validators.email], [simulateEmailCheck]),
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  get additionalCourses(): FormArray {
    // A typed getter avoids repeated `as FormArray` casts scattered across
    // the template, and keeps template expressions simpler and type-safe.
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    console.log('value (excludes disabled controls):', this.enrollForm.value);
    console.log('getRawValue (includes all controls):', this.enrollForm.getRawValue());
  }

  hasUnsavedChanges(): boolean {
    return this.enrollForm.dirty;
  }
}
