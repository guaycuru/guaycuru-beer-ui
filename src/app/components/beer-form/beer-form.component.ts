import { DateTime } from 'luxon';
import { Component } from '@angular/core';
import { Item } from '../../core/models/item.model';
import { ItemService } from '../../core/services/item.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.scss']
})
export class BeerFormComponent {
  item: Item = new Item();
  expiryDate: string;

  constructor(
    private itemService: ItemService,
    private alertService: AlertService
  ) {}

  async onSubmit() {
    try {
      const response = await this.itemService.addItem(this.item);
      console.log('Item adicionado ao estoque:', response);
      this.alertService.success('Item adicionado ao estoque com sucesso!');
      this.item = new Item(); // Limpa o formulário após a adição bem-sucedida
    } catch (error) {
      console.error('Erro ao adicionar item ao estoque:', error);
      this.alertService.error('Erro ao adicionar item ao estoque', error);
    }
  }
}
