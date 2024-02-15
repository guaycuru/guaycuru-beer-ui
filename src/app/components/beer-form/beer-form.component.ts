import { DateTime } from 'luxon';
import { Component } from '@angular/core';
import { Item } from '../../core/models/item.model';
import { ItemService } from '../../core/services/item.service';
import { AlertService } from '../../core/services/alert.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.scss']
})
export class BeerFormComponent {
  item: Item = new Item();
  expiryDate: string;
  selectedProductName: string; // Propriedade para armazenar o nome do produto selecionado
  productNames: string[] = []; // Array para armazenar os nomes dos produtos

  constructor(
    private itemService: ItemService,
    private alertService: AlertService,
    private productService: ProductService // Injete o serviço ProductService
  ) {}

  async ngOnInit() {
    this.loadProductNames();
  }

  async loadProductNames() {
    try {
      this.productNames = await this.productService.listProductNames();
    } catch (error) {
      console.error('Erro ao carregar nomes dos produtos:', error);
    }
  }

  async onSubmit() {
    try {
      // Defina o nome do produto no item com base na seleção do usuário
      this.item.product.name = this.selectedProductName;

      // Configure a data de validade
      this.item.expiry = DateTime.fromISO(this.expiryDate);

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
