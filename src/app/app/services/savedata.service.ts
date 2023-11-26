import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaires } from '../classes/commentaires';

const url = 'http://localhost:3000/comments';

@Injectable({
  providedIn: 'root'
})
export class SavedataService {

  constructor(private http: HttpClient) { }
//pour le formulaire du contact
  getcomments(): Observable<Commentaires[]> {
    return this.http.get<Commentaires[]>(url);
  }

  addcomments(comment: Commentaires): Observable<Commentaires> {
    return this.http.post<Commentaires>(url, comment);
  }

}
