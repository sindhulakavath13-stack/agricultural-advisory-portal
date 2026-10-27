
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, shareReplay, map } from 'rxjs';
import { PortalData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CropDataService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api';

  private data: Observable<PortalData> = forkJoin({
    crops: this.http.get<PortalData['crops']>(
      `${this.apiUrl}/crops`
    ),
    services: this.http.get<PortalData['services']>(
      `${this.apiUrl}/services`
    )
  }).pipe(
    map(result => ({
      crops: result.crops,
      services: result.services
    }) as PortalData),
    shareReplay(1)
  );

  getData(): Observable<PortalData> {
    return this.data;
  }
}
