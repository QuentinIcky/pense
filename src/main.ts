import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as process from 'process';
(window as any).process = process;

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

(window as any).process = { env: { DEBUG: undefined },};
