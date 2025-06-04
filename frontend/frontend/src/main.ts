import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { provideInstrumentation } from './app/otel-instrumentation';

provideInstrumentation();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
