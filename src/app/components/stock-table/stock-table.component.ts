import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Item } from '../../core/models/item.model';
import { ItemService } from '../../core/services/item.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {
  items: Item[];

  constructor(private itemService: ItemService, private alertService: AlertService) {}

  ngOnInit(): void {
    void this.init();
  }

  async onBeberButtonClick(item: Item): Promise<void> {
    if (item.quantity > 0) {
      item.reduceQuantity();
      try {
        await this.itemService.updateItem(item);
        this.alertService.success('Item consumido com sucesso!');
      } catch (error) {
        this.alertService.error('Erro ao atualizar item', error);
      }
    }
  }

  async onAddButtonClick(item: Item): Promise<void> {
    if (item.quantity >= 0) {
      item.addQuantity();
      try {
        await this.itemService.updateItem(item);
        this.alertService.success('Item incrementado com sucesso!');
      } catch (error) {
        this.alertService.error('Erro ao atualizar item', error);
      }
    }
  }

  private async init(): Promise<void> {
    this.items = await this.itemService.listItems();
  }
}
