import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { HTTP } from '@ionic-native/http';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private http: HTTP) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.http.setSSLCertMode('pinned')
        .then(() => {
          console.log('[SUCCESS] SSL Pinning Starts!’');
          this.testURL('https://badssl.com/');
          this.testURL('https://www.howsmyssl.com/a/check');
        })
        .catch((error) => console.log('[ERROR] SSL Pinning Fails!', error));
    });
  }

  testURL(URL: string) {
    this.http.get(URL, {}, {})
      .then(data => {
        console.log('[success] ' +URL);
      })
      .catch(error => {
        console.log('[error] '+URL+' -> ', error);
      });
  }
  
}
