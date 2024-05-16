
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-data-input',
  templateUrl: './data-input.component.html',
  styleUrl: './data-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class DataInputComponent { }
