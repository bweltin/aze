import { Injectable } from '@angular/core';
import { Stundenuebersicht } from '../modes/stundenuebersicht';
import { AzeRepository } from './aze-repository';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AzeService {
  constructor(public repository: AzeRepository) {
    this.initializeStartingPage();
  }

  initializeStartingPage(){
    // Kontrolliere, ob letzte Eintrag === 0 oder 1 --> "Einchecken" o. "Auschecken"
    // loadTimesOfToday
  }

  erfasseZeit(isCheckedIn: boolean, day: string, time: string) {
    const eintrag = this.baueEintrag(isCheckedIn, day, time);
    console.log(eintrag);
    this.repository.createTimes(eintrag);
  }

  baueEintrag(isCheckedIn: boolean, day: string, time: string): any {
    const eintrag = new Stundenuebersicht();
    eintrag.Tag = day;
    eintrag.Zeit = time;
    if (!isCheckedIn) {
      eintrag.LogStatus = 0;
    } else {
      eintrag.LogStatus = 1;
    }
    return eintrag;
  }

  loadTimesOfToday(): Stundenuebersicht[] {
    const heute = moment().format('L');
    const zeiten = [];
    let result: any;
    this.repository.readTimes().then((x) => {
      result = x;
      if (result.rows.length > 0) {
        for (let i = 0; i < result.rows.length; i++) {
          if (result.rows.item(i).Tag === heute) {
            zeiten.push(result.rows.item(i));
          }
        }
      }
    });
    return zeiten;
  }
}
