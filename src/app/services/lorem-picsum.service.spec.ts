import { TestBed } from '@angular/core/testing';

import { LoremPicsumService } from './lorem-picsum.service';

describe('LoremPicsumService', () => {
  let service: LoremPicsumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoremPicsumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate valid elements', () => {
    const elems = service.getElements();
    expect(elems).toBeTruthy();
    expect(elems.length).toEqual(service.getQty());
    elems.forEach(elem => {
      expect(elem.id).toBeTruthy();
      expect(elem.photo).toBeTruthy();
      expect(elem.text).toBeTruthy();
    });
  });

  it('should generate random texts', () => {
    const elems = service.getElements();
    expect(elems).toBeTruthy();
    expect(elems.length).toEqual(service.getQty());
    for (let i = 0; i < elems.length - 1; i++) {
      expect(elems[i].text === elems[i + 1].text).toBeFalsy();
    }
  });

  it('should paginate elements', async () => {
    const elems = await service.getPaginatedElements(80, 20);
    expect(elems.length).toEqual(20);
  });

  it('should filter elements', async () => {
    const elems = await service.getPaginatedElements(0, 1);
    const { id, text } = elems[0];
    const filtered = await service.getPaginatedElements(0, 20, text);
    expect(filtered.length).toEqual(1);
    expect(filtered[0].id === id).toBeTruthy();
  });


});
