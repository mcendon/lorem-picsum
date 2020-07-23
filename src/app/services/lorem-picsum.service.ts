import { Injectable } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';
import LoremPicsum from './model/LoremPicsum';

@Injectable({
  providedIn: 'root'
})
export class LoremPicsumService {
  private apiUrl = 'https://picsum.photos';
  private size = {
    width: 500,
    height: 500
  };
  private qty = 4000;
  private lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });
  private elements: LoremPicsum[];

  constructor() {
    this.elements = this.generateElements();
  }

  public getElements = () => this.elements;

  public getQty = () => this.qty;

  public getSize = () => this.size;

  private generateElements = (): LoremPicsum[] => {
    const elements: LoremPicsum[] = [];
    const { width, height } = this.size;
    for (let i = 1; i <= this.qty; i++) {
      elements.push({
        id: i,
        photo: `${ this.apiUrl }/id/${ i }/${ width }/${ height }`,
        text: this.lorem.generateSentences(5)
      });
    }
    return elements;
  }

  public getPaginatedElements = (offset: number, qty: number, textFilter: string = ''): Promise<LoremPicsum[]> => (
    new Promise<LoremPicsum[]>(resolve => {
      // Agrego el setTimeout random para simular un "retardo" de petición al servidor
      // y así se pueda apreciar la carga de los elementos y el infinite scroll
      setTimeout(
        () => resolve(this.filterElements(textFilter).slice(offset, offset + qty)),
        Math.floor(Math.random() * 1000)
      );
    })
  )

  private filterElements = (text: string): LoremPicsum[] => {
    return (text && text.length > 0) ?
      this.elements.filter(value => value.text.toLowerCase().match(new RegExp(text.toLowerCase()))) :
      this.elements;
  }

}
