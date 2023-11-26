// pub.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.css']
})
export class PubComponent  {

  private apiUrl = 'http://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?fmt=json';

  
  getArtistInfo(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  artistInfo: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getArtistInfo()
      .subscribe(data => {
        console.log(data); 
        this.artistInfo = data;
      });
  }
}