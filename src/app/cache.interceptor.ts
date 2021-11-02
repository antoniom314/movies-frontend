import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private cache: Map<string, HttpResponse<any>> = new Map();

  intercept(request: HttpRequest<any>, handler: HttpHandler ): Observable<HttpEvent<any>> {

    
    if (request.method !== 'GET') {
      return handler.handle(request);
    }

    if (request.headers.get('resetCache') === 'true') {
      this.cache.delete(request.urlWithParams);
    }

    const cachedResponse: HttpResponse<any> = this.cache.get(request.urlWithParams);

    if (cachedResponse) {
      return of(cachedResponse.clone());

    } else {
      return handler.handle(request).pipe(
        tap(response => {
          if (response instanceof HttpResponse) {

            // console.log(response.ok);
            // console.log(response.status);
            // console.log(response.statusText);

            // Cache dissconected for development
            // this.cache.set(request.urlWithParams, response);
          }
        })
      );
    }
  }
}
