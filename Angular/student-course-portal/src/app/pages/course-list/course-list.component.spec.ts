import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CourseListComponent } from './course-list.component';
import { Course } from '../../models/course.model';

describe('CourseListComponent', () => {
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Algorithms', code: 'CS102', credits: 3, gradeStatus: 'pending' }
  ];

  const initialState = {
    course: { courses: mockCourses, loading: false, error: null }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [provideRouter([]), provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseListComponent);
  });

  it('should render a course card per course from the initial state', () => {
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(2);
  });

  it('should show a loading indicator when the store loading flag is true', () => {
    store.setState({ course: { courses: [], loading: true, error: null } });
    fixture.detectChanges();

    const loadingText = fixture.debugElement.query(By.css('p')).nativeElement.textContent;
    expect(loadingText).toContain('Loading courses');
  });
});
