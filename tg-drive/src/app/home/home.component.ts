import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Output()
  childBtnClick = new EventEmitter<string>();

  onClick() {
    alert('I AM HOME COMPONENT');
    this.childBtnClick.emit("OMG CHILD CLICKED!!!");
  }
}
