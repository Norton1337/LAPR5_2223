import { TestBed } from '@angular/core/testing';

import {WarehouseService} from "./warehouse.service";

describe('WarehouseService', () => {
  let service: WarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a warehouse', async () => {
    const response = {
        "id": "TH1",
        "address": "Rua António Bernardino,47,4535-334,Porto",
        "altitude": 250,
        "latitude": "40.9321º N",
        "longitude": "8.2451º W",
        "designation": "Arouca",
        "city": "1",
      json () {
        return this;
      }
    };

    const fetchSpy = spyOn<any>(service, 'sendFetch').and.returnValue(Promise.resolve(response));

    const warehouse = await service.getWarehouse('TH1');
    expect(fetchSpy).toHaveBeenCalled();
    expect(warehouse).toEqual(response);
  });


  it('should create a warehouse', async () => {
    const response = {
      "status": 200,
    };

    const fetchSpy = spyOn<any>(service, 'sendFetch').and.returnValue(Promise.resolve(response));

    const status = await service.createWarehouse('TH1');
    expect(fetchSpy).toHaveBeenCalled();
    expect(status.status).toEqual(200);
  });

  it('should create a warehouse prolog', async () => {
    const response = {
      "status": 201,
    };

    const fetchSpy = spyOn<any>(service, 'sendFetch').and.returnValue(Promise.resolve(response));

    const status = await service.createWarehouseProlog('TH1');
    expect(fetchSpy).toHaveBeenCalled();
    expect(status.status).toEqual(201);

  });

  it('should update a warehouse', async () => {
    const response = {
      "status": 200,
    };

    const fetchSpy = spyOn<any>(service, 'sendFetch').and.returnValue(Promise.resolve(response));

    const status = await service.updateWarehouse('TH1');
    expect(fetchSpy).toHaveBeenCalled();
    expect(status.status).toEqual(200);
  });

  it('should update a warehouse prolog', async () => {
    const response = {
      "status": 200,
    };

    const fetchSpy = spyOn<any>(service, 'sendFetch').and.returnValue(Promise.resolve(response));

    const status = await service.updateWarehouseProlog('TH1');
    expect(fetchSpy).toHaveBeenCalled();
    expect(status.status).toEqual(200);
  });


  it('should get all warehouses', async () => {
    const response = {
      "warehouses": [
        {
          "id": "TH1",
          "address": "Rua António Bernardino,47,4535-334,Porto",
          "altitude": 250,
          "latitude": "40.9321º N",
          "longitude": "8.2451º W",
          "designation": "Arouca",
          "city": "1",
        }
      ],
      json () {
        return this;
      }
    };

    const fetchSpy = spyOn<any>(service, 'sendFetch').and.returnValue(Promise.resolve(response));

    const trucks = await service.getAllWarehouses();
    expect(fetchSpy).toHaveBeenCalled();
    expect(trucks).toEqual(response);
  });

  it('should send a fetch without data', async () => {

    const status = await service.sendFetch('test', 'GET', null);
    expect(status.status).toEqual(404);
  });

  it('should send a fetch with data', async () => {
    const status = await service.sendFetch('test', 'POST', "null");
    expect(status.status).toEqual(404);
  });

});
