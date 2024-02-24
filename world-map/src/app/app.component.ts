import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorldBankService } from './world-bank.service';
import { Country } from './country';
import { Subscription } from 'rxjs';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(private apiService: ApiService) {}

  country: Country = {
    id: 0,
    name: '',
    capital: '',
    region: '',
    incomeLevel: '',
    longitude: 0,
    latitude: 0
  }
  worldBankService: WorldBankService = inject(WorldBankService);

  callAPI(countryId: string) {
    if (countryId === '') {
      this.country.id = 0;
      this.country.name = '';
      this.country.capital = '';
      this.country.region = '';
      this.country.incomeLevel = '';
      this.country.longitude = 0;
      this.country.latitude = 0;
    } else {
      this.worldBankService.getCountryData(countryId).then((data: any) => {
        if (data) {
          this.country.id = data[1][0].id;
          this.country.name = data[1][0].name;
          this.country.capital = data[1][0].capitalCity;
          this.country.region = data[1][0].region.value;
          this.country.incomeLevel = data[1][0].incomeLevel.value;
          this.country.longitude = data[1][0].longitude;
          this.country.latitude = data[1][0].latitude;
        }
      });
    }
  }

  ngOnInit() {
    this.subscription = this.apiService.callApi$.subscribe((param: string) => {
      this.callAPI(param);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
