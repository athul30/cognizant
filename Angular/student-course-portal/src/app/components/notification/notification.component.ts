import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

// Providing NotificationService here (rather than 'root') creates a new
// instance scoped to this component and its children, instead of sharing
// the app-wide singleton. Useful when notification state should not leak
// between independent widgets that both use this component.
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  notificationService = inject(NotificationService);
}
