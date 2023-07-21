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

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    void this.init();
  }

  private async init(): Promise<void> {
    this.items = await firstValueFrom(this.itemService.listItems());
  }
}
