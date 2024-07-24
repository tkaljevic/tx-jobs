import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpLoaderService } from '@core-services';

@Component({
  selector: 'app-http-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './http-loader.component.html',
  styleUrl: './http-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpLoaderComponent {

  //#region Component props

  showLoader$ = inject(HttpLoaderService).loaderDisplayed$;

  //#endregion

}
