import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{
    
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
       req = req.clone({
           setHeaders: {
            'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
            'X-RapidAPI-Key': 'd6798177f0mshafe2d6923a3496bp1692d3jsn722adf8f1db9'
           },
           setParams: {
               key: '039b41b1edfc46658c6d320e798575b8'
           }
       })
       return next.handle(req)
    }

}