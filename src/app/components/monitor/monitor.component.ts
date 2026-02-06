import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  backendStatus = 'Desconocido';
  frontendStatus = 'Activo';
  dbStatus = 'Desconocido';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/api/actuator/health').subscribe({
      next: (res: any) => {
        this.backendStatus = res.status;
      },
      error: () => {
        this.backendStatus = 'No disponible';
      }
    });

    this.http.get('/api/db/status').subscribe({
      next: () => this.dbStatus = 'OK',
      error: () => this.dbStatus = 'No disponible'
    });
  }
}
