import { CalcState } from './../../Models/Calculator/calculator.redux';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  constructor() { }

  @Select(CalcState.getStoredValue) storedValue$: Observable<number>;

  @Select(CalcState.getInputValue) inputValue$: Observable<number>;

  @Select(CalcState.getOperation) operation$: Observable<string>;
  

  ngOnInit(): void {
  }

}
