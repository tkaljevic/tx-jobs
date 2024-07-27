import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageMode } from '@app-enums';
import { ToasterMessage } from '@app-models';
import { ToasterService } from '@core-services';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import * as JobSelectors from '../../../core/store/selectors/job.selectors';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterComponent implements OnInit {
  //#region Components props

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private toasterService = inject(ToasterService);

  //#endregion

  //#region Lifecycle Hooks

  ngOnInit(): void {
    this.initToasterMessages();
  }

  //#endregion

  //#region Init

  private initToasterMessages(): void {
    this.store
      .select(JobSelectors.toasterMessageSelector)
      .pipe(
        filter(
          (x) => !!x.error?.length || !!x.success?.length || !!x.warning?.length
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(this.handleMessages);
  }

  //#endregion

  //#region Handlers

  private handleMessages = (message: ToasterMessage) => {
    const messageHandlers: Record<MessageMode, (msg: string) => void> = {
      [MessageMode.Error]: this.toasterService.showError.bind(
        this.toasterService
      ),
      [MessageMode.Success]: this.toasterService.showSuccess.bind(
        this.toasterService
      ),
      [MessageMode.Warning]: this.toasterService.showWarning.bind(
        this.toasterService
      ),
    };

    Object.entries(message).forEach(([mode, msg]) => {
      if (msg.length) {
        messageHandlers[mode as MessageMode](msg);
      }
    });
  };

  //#endregion
}
