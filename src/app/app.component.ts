import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conversor de Moeda';

  private cotacaoDolar = 0;
  private cotacaoEuro = 0;

  @ViewChild('reais', {static: true}) reaisElement: ElementRef;
  @ViewChild('dolares', {static: true}) dolaresElement: ElementRef;
  @ViewChild('euros', {static: true}) eurosElement: ElementRef;

  constructor(reaisElement: ElementRef, dolaresElement: ElementRef, eurosElement: ElementRef, private http: HttpClient) {
    this.reaisElement = reaisElement;
    this.dolaresElement = dolaresElement;
    this.eurosElement = eurosElement;
    this.http = http;
  }

  ngOnInit() {
    const url = 'https://api.hgbrasil.com/finance?key=69e59b2b&format=json-cors';
    this.http.get<any>(url).subscribe(data => {
      if (data) {
        this.cotacaoDolar = data.results.currencies.USD.buy
        this.cotacaoEuro = data.results.currencies.EUR.buy
      }
      if (!(this.cotacaoEuro && this.cotacaoDolar)) {
        alert("Aconteceu um erro... Tente novamente mais tarde!")
      }
    });
  }

  public converter() {
    var reais = this.reaisElement.nativeElement.value;
    this.dolaresElement.nativeElement.value = (reais / this.cotacaoDolar).toFixed(2).toString().replace(".",",");
    this.eurosElement.nativeElement.value = (reais / this.cotacaoEuro).toFixed(2).toString().replace(".",",");
  }
  
}
