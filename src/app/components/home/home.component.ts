import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import {APIResponse, Game} from "../../models";
import { EpicService } from 'app/services/epic.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sort!: string
  public games!: Array<Game> | Array<Pick<Game, 'name' | 'background_image' | 'description' | 'parent_platforms' | 'id'>>
  public isDisable: boolean = false

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private epicService: EpicService
  ) { }

  ngOnInit() {
    console.log(this.isDisable);
    
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params["epicgames"]){
        this.games = this.epicService.getGameList()

      }
      else if(params['game-search']){
        this.searchGames('metacrit', params['game-search'])

      }else {
        this.searchGames('metacrit')
      }
    })
  }

  searchGames(sort: string, search?: string){
    this.httpService.getGameList(sort, search)
    .subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results      
    })
  }


  openGameDetails(id: number): void {
    this.router.navigate(['details', id])
  }
}
