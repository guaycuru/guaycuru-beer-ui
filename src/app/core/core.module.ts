import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { AuthHttp } from './services/http.service';
import { AlertService } from './services/alert.service';
import { LocalStorageService } from './services/local-storage.service';
import { UserService } from './services/user.service';
import { BrandService } from './services/brand.service';
import { TagService } from './services/tag.service';
import { ItemService } from './services/item.service';
import { ProductService } from './services/product.service';

@NgModule({
  providers: [
    ConfigService,
    AuthService,
    AuthHttp,
    AlertService,
    BrandService,
    ItemService,
    LocalStorageService,
    ProductService,
    TagService,
    UserService
  ]
})
export class CoreModule {
}
