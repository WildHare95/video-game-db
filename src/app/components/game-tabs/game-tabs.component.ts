import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Game} from "../../models";

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameTabsComponent implements OnInit {
  @Input() game!: Game


  constructor() { }

  ngOnInit(): void {

  }

}
