import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Members } from '../classes/members';
import { Gallery } from '../classes/gallery';

const URL = 'http://localhost:3000/membre';
const URL2 = 'http://localhost:3000/gallery';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private members: Members[] = []; 

  constructor(private http: HttpClient) {}
//pour les membres
  getMembres(): Observable<Members[]> {
    return this.http.get<Members[]>(URL);
  }

  getgallery(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(URL2);
  }

  addMember(newMember: Members): Observable<Members> {
    return this.http.post<Members>(URL, newMember);
  }

  deleteMember(id: number): Observable<Members> {
    return this.http.delete<Members>(`${URL}/${id}`);
  }

  editmembers(id: number, updatemembers: Members): Observable<Members> {
    const editUrl = `${URL}/${id}`;
    return this.http.patch<Members>(editUrl, updatemembers);
  }
}
