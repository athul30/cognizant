import { Routes } from '@angular/router';
import { EnrollmentFormComponent } from '../../pages/enrollment-form/enrollment-form.component';
import { ReactiveEnrollmentFormComponent } from '../../pages/reactive-enrollment-form/reactive-enrollment-form.component';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

// Modern standalone equivalent of "ng generate module features/enrollment
// --routing" — a lazy-loaded routes array instead of an NgModule, loaded via
// loadChildren in app.routes.ts.
export const ENROLLMENT_ROUTES: Routes = [
  { path: '', component: EnrollmentFormComponent },
  {
    path: 'reactive',
    component: ReactiveEnrollmentFormComponent,
    canDeactivate: [unsavedChangesGuard]
  }
];
