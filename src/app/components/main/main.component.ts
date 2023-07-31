import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NgbDateStruct, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  data: Date = new Date();

  page = 4;
  page1 = 5;
  page2 = 3;
  focus = false;
  focus1 = false;
  focus2 = false;

  date!: {year: number, month: number};
  model!: NgbDateStruct;

  public isCollapsed = true;
  public isCollapsed1 = true;
  public isCollapsed2 = true;

  state_icon_primary = true;

  constructor( private renderer : Renderer2, config: NgbAccordionConfig) {
      config.closeOthers = true;
      config.type = 'info';
  }
  isWeekend(date: NgbDateStruct) {
      const d = new Date(date.year, date.month - 1, date.day);
      return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
      return date.month !== current.month;
  }

  ngOnInit() {
      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.add('navbar-transparent');
      var body = document.getElementsByTagName('body')[0];
      body.classList.add('index-page');
  }
  ngOnDestroy(){
      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.remove('navbar-transparent');
      var body = document.getElementsByTagName('body')[0];
      body.classList.remove('index-page');
  }
}