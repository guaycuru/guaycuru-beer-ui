import { Component } from '@angular/core';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss'],
})
export class StockTableComponent {
  cerveja: string = 'Easy IPA';
  estilo: string = 'IPA';
  quantidade: number = 1;
  local: string = 'Geladeira';
  validade: string = '28/06/2023';
}
