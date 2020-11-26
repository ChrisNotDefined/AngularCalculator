import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { NewInputAction } from 'src/app/Models/Calculator/calculator.redux';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor( private store: Store) { }

  @Input() content;

  ngOnInit(): void {
  }

  pressedButton(): void {
    this.store.dispatch(new NewInputAction(this.content));
  }

}
