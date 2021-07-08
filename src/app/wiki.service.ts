import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=&format=json`;

  constructor(private http: HttpClient) { }

  searchWiki(term: string): Observable<any> {
    return this.http.get(this.endpoint, {
      params: {
        srsearch: term,
        origin: '*'
      }
    });
  }

}
