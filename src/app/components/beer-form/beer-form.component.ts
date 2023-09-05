import { Component } from '@angular/core';
import { Item } from 'src/app/core/models/item.model'; // Substitua pelo caminho correto para o seu Item model

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.scss']
})
export class BeerFormComponent {
  item: Item = new Item(); // Use a classe Item em vez de Beer

  constructor() {}

  onSubmit() {
    // Aqui você pode implementar a lógica para enviar os dados do item (cerveja) para o seu sistema de gerenciamento de estoque
    console.log('Item (Cerveja) cadastrado:', this.item);
    // Implemente a lógica de envio para o backend ou armazenamento local aqui
  }
}

