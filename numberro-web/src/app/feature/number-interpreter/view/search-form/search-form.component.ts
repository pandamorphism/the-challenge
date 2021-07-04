import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {InterpretedEvent} from '../../model';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent {

  form: FormGroup = this.fb.group({
    searchNum: this.fb.control(null)
  });
  @Input() interpretation: InterpretedEvent | null = null;
  @Output() search = this.form.valueChanges.pipe(
    debounceTime(300),
  );

  constructor(private fb: FormBuilder) {
  }
}
