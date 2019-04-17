import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PrometheusAlert, PrometheusNotification } from '../models/prometheus-alerts';
import { ApiModule } from './api.module';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: ApiModule
})
export class PrometheusService {
  private baseURL = 'api/prometheus';

  constructor(private http: HttpClient, private settingsService: SettingsService) {}

  ifAlertmanagerConfigured(fn): void {
    this.settingsService.ifSettingConfigured('api/settings/alertmanager-api-host', fn);
  }

  list(params = {}): Observable<PrometheusAlert[]> {
    return this.http.get<PrometheusAlert[]>(this.baseURL, { params });
  }

  getNotifications(notification?: PrometheusNotification): Observable<PrometheusNotification[]> {
    const url = `${this.baseURL}/notifications?from=${
      notification && notification.id ? notification.id : 'last'
    }`;
    return this.http.get<PrometheusNotification[]>(url);
  }
}
