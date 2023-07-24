import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ItemService } from '../../core/services/item.service';
import { Item } from '../../core/models/item.model';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  items: Item[];

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    void this.init();
  }

  private async init(): Promise<void> {
    this.items = await firstValueFrom(this.itemService.listItems());
  }

}
