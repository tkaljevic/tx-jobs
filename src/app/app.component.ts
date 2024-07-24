import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobsHttpService } from '@shared-services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  testService = inject(JobsHttpService);
  jobs$ = new BehaviorSubject<any[]>([]);

  ngOnInit(): void {
    this.testService.getJobs().subscribe((jobs) => this.jobs$.next(jobs))
  }
}
