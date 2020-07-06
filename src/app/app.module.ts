import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '@app/core';
import { TimeagoModule } from 'ngx-timeago';
import { SharedModule } from '@app/shared';
/* VIEWS */
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RecordingsModule } from './recordings/recordings.module';
import { ScheduleModule } from '@app/schedule/schedule.module';
import { SearchModule } from './search/search.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgAisModule } from 'angular-instantsearch';

/* Analytics */
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { environment } from '@env/environment';
import * as Sentry from '@sentry/browser';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
};

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {
    Sentry.init({
      dsn: 'https://e0e35bbbc12a4eb8a6d6f04aa2481a1d@sentry.io/1724269',
      environment: environment.environment,
      release: environment.version,
      enabled: true,
      ignoreErrors: [
        'ERR_CONNECTION_REFUSED',
        'Es is',
        'Es ist ein Fehler aufgetreten',
      ],
    });
  }
  handleError(error: any) {
    Sentry.captureException(error.originalError || error);
    console.error(error);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production,
    }),
    FormsModule,
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot(),
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    RecordingsModule,
    AboutModule,
    SearchModule,
    ScheduleModule,
    Angulartics2Module.forRoot(),
    SwiperModule,
    NgAisModule.forRoot(),
    TimeagoModule.forRoot(),
    IconsModule,
    LazyLoadImageModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route,
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
