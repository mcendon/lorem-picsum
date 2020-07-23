import { Component, OnInit } from '@angular/core';
import { LoremPicsumService } from '../services/lorem-picsum.service';
import LoremPicsum from '../services/model/LoremPicsum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0;
  paginate = 20;
  elements: LoremPicsum[] = [];
  textFilter = '';
  progressBar = true;

  constructor(private loremPicsum: LoremPicsumService) {}

  async ngOnInit() {
    this.showProgressBar();
    await this.getElements();
    this.hideProgressBar();
  }

  getElements = async () => {
    const { offset, paginate, textFilter } = this;
    const newElements = await this.loremPicsum.getPaginatedElements(offset, paginate, textFilter);
    this.elements = this.elements.concat(newElements);
  }

  paginateElements = async (e = null) => {
    this.offset += this.paginate;
    await this.getElements();
    if (e) {
      e.target.complete();
    }
  }

  filterElements = async (e: KeyboardEvent) => {
    this.offset = 0;
    this.elements = [];
    this.showProgressBar();
    await this.getElements();
    this.hideProgressBar();
  }

  showProgressBar = () => {
    this.progressBar = true;
  }

  hideProgressBar = () => {
    this.progressBar = false;
  }

  handleImgError = (e) => {
    e.target.src = 'assets/img/noimage.png';
  }
}
