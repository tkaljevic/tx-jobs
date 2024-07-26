import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-job-actions',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './job-actions.component.html',
  styleUrl: './job-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobActionsComponent {

}
