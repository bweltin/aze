import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { browserDBInstance } from './browser';
import * as process from 'process';

declare var window: any;
const SQL_DB_NAME =
  process.env.IONIC_ENV === 'dev' ? '__broswer.db' : '__native.db';

@Injectable()
export class SqlProvider {
  dbInstance: any;

  constructor(public sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.init();
    });
  }

  init() {
    if (!this.platform.is('cordova')) {
      const db = window.openDatabase(
        SQL_DB_NAME,
        '1.0',
        'DEV',
        5 * 1024 * 1024
      );
      this.dbInstance = browserDBInstance(db);
    } else {
      this.sqlite
        .create({
          name: SQL_DB_NAME,
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.dbInstance = db;
        });
    }
  }
}
