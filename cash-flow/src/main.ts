// y por último la aplicación a leída desde el módulo raíz, llamado app por convenio.

import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// después nuestro código, empezando por la configuración

// luego cosas de Angular


// condiciones para ejecutar en modo desarrollo o producción
if (environment.production) {
  enableProdMode();
}

// arranque de la aplicación invocando al módulo raíz
platformBrowserDynamic().bootstrapModule(AppModule);
