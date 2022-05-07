import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from 'app/models';
import { environment as env } from 'environments/environment';
import { Subscription } from 'rxjs';

interface Image {
  url: string
}
export interface EpicGame {
  title: string
  description: string
  effectiveDate: Date
  keyImages: Array<Image>
  customeAttributes: Array<{ value: string }>
}

interface APIRespons {
  freeGames: {
    current: Array<EpicGame>
    upcoming: Array<EpicGame>
  }
}

@Injectable({
  providedIn: 'root'
})
export class EpicService {

  subscription?: Subscription

  constructor(private http: HttpClient) { }
  
  getGameList(): Array<Pick<Game, 'name' | 'background_image' | 'description' | 'parent_platforms' | 'id'>> {
    let lastRequestDay = localStorage.getItem("date")

    if (!lastRequestDay || parseInt(lastRequestDay) === 0) {
      this.subscription = this.http.get<APIRespons>(env.EPIC_URL).subscribe({
        next: (res: APIRespons) => {
          localStorage.setItem("current", JSON.stringify(res.freeGames.current))
          localStorage.setItem("upcoming", JSON.stringify(res.freeGames.upcoming))
          localStorage.setItem("date", JSON.stringify(new Date().getDay()))
        },
        complete: () => console.log("complete")
      })
    }

    return JSON.parse(localStorage.getItem('current')!).map((item: EpicGame): Pick<Game, 'name' | 'background_image' | 'description' | 'parent_platforms' | 'id'> => {  
      return{
        id: 1,
        name: item.title,
        background_image: item.keyImages[0].url,
        description: item.description,
        parent_platforms: [{
          platform: {
            name: "EG",
            slug: "eg"
          }
        }]
      }
        
    })
    }

  }

