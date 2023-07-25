import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Item } from '../../core/models/item.model';
import { ItemService } from '../../core/services/item.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {
  items: Item[];

  onBeberButtonClick(item: Item): void {
    if (item.quantity > 0) {
      item.reduceQuantity();
    }
  }

  onAddButtonClick(item: Item): void {
    if (item.quantity >= 0) {
      item.addQuantity();
    }
  }

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    void this.init();
  }

  onBeberButtonClick(item: Item): void {
    if (item.quantity > 0) {
      item.reduceQuantity();
    }
  }

  private async init(): Promise<void> {
    this.items = await this.itemService.listItems();
  }
}
