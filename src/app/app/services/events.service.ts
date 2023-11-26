import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eventschedule } from '../classes/eventschedule';
import { Monthly } from '../classes/monthly';
import { Weekly } from '../classes/weekly';

const URL1 = 'http://localhost:3000/eventschedule';
const URLW = 'http://localhost:3000/weeklyevents';
const URLM= 'http://localhost:3000/monthlyevents';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}
/* tableau */
  getTableau(): Observable<Eventschedule[]> {
    return this.http.get<Eventschedule[]>(URL1);
  }

/* Pour les événements mensuels */
  getEventsM(): Observable<Monthly[]> {
    return this.http.get<Monthly[]>(URLM);
  }

  addEventM(newEvent: Monthly): Observable<Monthly> {
    return this.http.post<Monthly>(URLM, newEvent);
  }
  deleteEventM(eventId: number): Observable<Monthly> {
    const deleteUrl = `${URLM}/${eventId}`;
    return this.http.delete<Monthly>(deleteUrl);
  }
  editEventM(updatedEvent: Monthly): Observable<Monthly> {
    const editUrl = `${URLM}/${updatedEvent.id}`;
    return this.http.put<Monthly>(editUrl, updatedEvent);
  }

/* Pour les événements hébdomadaires */
addEventW(newEvent: Weekly): Observable<Weekly> {
    return this.http.post<Weekly>(URLW, newEvent);
  }

  getEventsW(): Observable<Weekly[]> {
    return this.http.get<Weekly[]>(URLW);
  }

  deleteEventW(eventId: number): Observable<Weekly> {
    const deleteUrl = `${URLW}/${eventId}`;
    return this.http.delete<Weekly>(deleteUrl);
  }
 
  editEventW(updatedEvent: Weekly): Observable<Weekly> {
    const editUrl = `${URLW}/${updatedEvent.id}`;
    return this.http.put<Weekly>(editUrl, updatedEvent);
  }
}