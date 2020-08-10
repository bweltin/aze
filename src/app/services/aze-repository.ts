import { Injectable } from '@angular/core';
import { SqlProvider } from '../providers/sql.service';
import { Stundenuebersicht } from '../modes/stundenuebersicht';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AzeRepository {
  constructor(private sql: SqlProvider) {
  }

  public async createTimes(eintrag: Stundenuebersicht) {
    this.sql.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS Zeiten(
          Tag nvarchar(255),
          Zeit nvarchar(255),
          LogStatus nvarchar(5)
      )`,
      []
    );

    await this.sql.dbInstance.executeSql(
      `INSERT INTO Zeiten(
          Tag,
          Zeit,
          LogStatus)
          VALUES (
            '${eintrag.Tag}',
            '${eintrag.Zeit}',
            '${eintrag.LogStatus}'
      )`,
      []
    );
  }

  public async readTimes(): Promise<Stundenuebersicht[]> {
    const eintraege = await this.sql.dbInstance.executeSql(`SELECT * FROM Zeiten`, []);
    return eintraege;
  }

  public async updateTimes(eintrag: Stundenuebersicht) {}
}
