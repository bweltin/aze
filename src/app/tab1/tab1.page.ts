import { Component } from '@angular/core';
import * as moment from 'moment';
import { AzeService } from '../services/aze.service';
import { Stundenuebersicht } from '../modes/stundenuebersicht';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  isCheckedIn = false;
  zeiten = new Array<Stundenuebersicht>();

  constructor(public azeService: AzeService) {
    moment.locale('de');
    // this.zeiten = this.azeService.ladeZeiten();
    console.log('geloggte Zeiten', this.zeiten);
  }

  check() {
    this.azeService.erfasseZeit(
      this.isCheckedIn,
      moment().format('L'),
      moment().format('LTS')
    );
    if (this.isCheckedIn) {
      this.isCheckedIn = false;
    } else {
      this.isCheckedIn = true;
    }
    console.log(this.zeiten);
    this.zeiten = this.azeService.loadTimesOfToday();
  }

  pause() {}
}
