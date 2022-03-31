import {Component, OnInit} from '@angular/core';
import {Game} from "../../models";
import {ActivatedRoute, Params} from '@angular/router'
import {HttpService} from "../../services/http.service";
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  gameRating = 0
  gameId!: string
  game!: Game

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    this.ActivatedRoute.params.pipe(untilDestroyed(this)).subscribe((params: Params) => {
      this.gameId = params['id']
      this.getGameDetails(this.gameId)
    });

  }

  getGameDetails(id: string): void {
    this.httpService.getGameDetails(id).pipe(untilDestroyed(this))
      .subscribe((gameResp: Game) => {
        this.game = gameResp
        setTimeout(() => {
          this.gameRating = this.game.metacritic
        }, 1000)
      })
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432'
    } else if (value > 50) {
      return "#fffa50"
    } else if (value > 30) {
      return "#ef4655"
    }
    return "#fff"
  }

}
