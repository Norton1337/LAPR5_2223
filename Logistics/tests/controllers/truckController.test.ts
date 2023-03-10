import "reflect-metadata";
import {Response, Request, NextFunction} from 'express';
import { Container } from 'typedi';
import { Result }  from '../../src/core/logic/Result';
import * as sinon from 'sinon';
import TruckController from '../../src/controllers/truckController';
import ITruckService from '../../src/services/IServices/ITruckService';
import { ITruckDTO } from '../../src/dto/ITruckDTO';
import { ITruckPersistence } from "../../src/dataschema/ITruckPersistence";
import 'mocha';
import { Document } from 'mongoose';
import { TruckMap } from "../../src/mappers/TruckMap";
import { Truck } from "../../src/domain/truck/Truck";

describe('TruckController Unit Tests', () => {
    const sandbox = sinon.createSandbox();
    beforeEach(() => {
        Container.reset();

        
        let truckSchemaInstance = require('../../src/persistence/schemas/truckSchema').default;
        Container.set("truckSchema", truckSchemaInstance);

        let truckRepoClass = require('../../src/repos/truckRepo').default;
        let truckRepoInstance = Container.get(truckRepoClass);
        Container.set("TruckRepo", truckRepoInstance);

        let truckServiceClass = require('../../src/services/truckService').default;
        let truckServiceInstance = Container.get(truckServiceClass);
        Container.set("TruckService", truckServiceInstance);

    });
    
    afterEach(() => {
        sinon.restore();
        sandbox.restore();
    });

    it('createTruck returns truck JSON', async () => {
        
        // Arrange
        let body = {
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            status: sinon.spy(),
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
        
        

        sinon.stub(truckServiceInstance, 'createTruck').returns(Promise.resolve(Result.ok<ITruckDTO>(body as ITruckDTO)));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);
        // Act
        await truckController.createTruck(<Request>req, <Response>res, <NextFunction>next);

        //Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        }));

        
    });
    
    it('createTruck returns 409 when "Truck Already Exists"', async () => {
        
        // Arrange
        let body = {
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  
        sinon.stub(truckServiceInstance, 'createTruck').returns(Promise.resolve(Result.fail<ITruckDTO>("Truck already exists")));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.createTruck(<Request>req, <Response>res, <NextFunction>next);

        //Assert
        
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 409);


        
    });    

    it('getTruck returns truck JSON', async () => {

        // Arrange
        let body = {
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };

        let req: Partial<Request> = {};
        req.body = {
            truckID: "truckID"
        }

        let res: Partial<Response> = {
            json: sinon.spy(),
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  
        sinon.stub(truckServiceInstance, 'getTruck').returns(Promise.resolve(Result.ok<ITruckDTO>(body as ITruckDTO)));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.getTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(body));


    });   

    it('getTruck returns 200', async () => {

        // Arrange
        let body = {
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };

        let req: Partial<Request> = {};
        req.body = {
            truckID: "truckID"
        }

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  
        sinon.stub(truckServiceInstance, 'getTruck').returns(Promise.resolve(Result.ok<ITruckDTO>(body as ITruckDTO)));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.getTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);

    });   



    it('getTruck returns "Trucks not found"', async () => {

        // Arrange

        let req: Partial<Request> = {};
        req.body = {
            truckID: "truckID"
        }

        let res: Partial<Response> = {
            status: sinon.spy(),
            send: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  

        sinon.stub(truckServiceInstance, 'getTruck').returns(Promise.resolve(Result.fail<ITruckDTO>("Truck not found")));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.getTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert

        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.send, sinon.match("Truck not found"));
    });

    it('getTruck returns 404', async () => {

        // Arrange
        
        let req: Partial<Request> = {};
        req.body = {
            truckID: "truckID"
        }
        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  

        sinon.stub(truckServiceInstance, 'getTruck').returns(Promise.resolve(Result.fail<ITruckDTO>("Truck not found")));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.getTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 404);
    });

    it('getAllTrucks returns trucks', async () => {

        // Arrange
        let body = [{
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        },
        {
            truckID: "truckID2",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        }];
        let req: Partial<Request> = {};
        

        let res: Partial<Response> = {
            status: sinon.spy(),
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  

        sinon.stub(truckServiceInstance, 'getAllTrucks').returns(Promise.resolve(Result.ok<ITruckDTO[]>(body as ITruckDTO[])));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.getAllTrucks(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, body);

        
    });

    it('getAllTrucks returns 200', async () => {

        // Arrange
        let body = [{
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        },
        {
            truckID: "truckID2",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        }];
        let req: Partial<Request> = {};
        

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  


        sinon.stub(truckServiceInstance, 'getAllTrucks').returns(Promise.resolve(Result.ok<ITruckDTO[]>(body as ITruckDTO[])));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.getAllTrucks(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);

    });



    it('softDeleteTruck returns truck', async () => {

        // Arrange
        let body = {
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1,
            active: false
        };
        let req: Partial<Request> = {};
            req.params= {
                id: "truckID"
            }

        let res: Partial<Response> = {
            status: sinon.spy(),
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  

        sinon.stub(truckServiceInstance, 'softDeleteTruck').returns(Promise.resolve(Result.ok<ITruckDTO>(body as ITruckDTO)));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
       
        await truckController.softDeleteTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, body);

        
    });

    it('softDeleteTruck returns 200', async () => {

        // Arrange
        let body = {
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };
        let req: Partial<Request> = {};
        req.params= {
            id: "truckID"
        }

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  


        sinon.stub(truckServiceInstance, 'softDeleteTruck').returns(Promise.resolve(Result.ok<ITruckDTO>(body as ITruckDTO)));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
 
        await truckController.softDeleteTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);

    });



    it('softDeleteTruck returns "Truck not found"', async () => {

        // Arrange
        let req: Partial<Request> = {};
        req.params= {
            id: "truckID"
        }

        let res: Partial<Response> = {
            status: sinon.spy(),
            send: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  

        sinon.stub(truckServiceInstance, 'softDeleteTruck').returns(Promise.resolve(Result.fail<ITruckDTO>("Truck not found")));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.softDeleteTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.send, "Truck not found");

        
    });

    it('softDeleteTruck returns 404', async () => {

        // Arrange
        let req: Partial<Request> = {};
        req.params= {
            id: "truckID"
        }

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  

        sinon.stub(truckServiceInstance, 'softDeleteTruck').returns(Promise.resolve(Result.fail<ITruckDTO>("Truck not found")));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.softDeleteTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 404);

    });





    it('update returns truck', async () => {

        // Arrange
        let body = {
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };
        let req: Partial<Request> = {};
        req.body=body;

        let res: Partial<Response> = {
            status: sinon.spy(),
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  

        sinon.stub(truckServiceInstance, 'updateTruck').returns(Promise.resolve(Result.ok<ITruckDTO>(body as ITruckDTO)));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.updateTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, body);

        
    });

    it('updateTruck returns 200', async () => {

        // Arrange
        let body = {
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };
        let req: Partial<Request> = {};
        req.body=body;

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  

        sinon.stub(truckServiceInstance, 'updateTruck').returns(Promise.resolve(Result.ok<ITruckDTO>(body as ITruckDTO)));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.updateTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);

    });



    it('updateTruck returns "Truck not found"', async () => {

        // Arrange
        let body = {
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };
        let req: Partial<Request> = {};
        req.body=body;

        let res: Partial<Response> = {
            status: sinon.spy(),
            send: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  

        sinon.stub(truckServiceInstance, 'updateTruck').returns(Promise.resolve(Result.fail<ITruckDTO>("Truck not found")));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.updateTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.send, "Truck not found");

        
    });

    it('deleteTruck returns 404', async () => {

        // Arrange
        let body = {
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };
        let req: Partial<Request> = {};
        req.body=body;

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckServiceInstance = Container.get("TruckService");
  

        sinon.stub(truckServiceInstance, 'updateTruck').returns(Promise.resolve(Result.fail<ITruckDTO>("Truck not found")));

        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);

        // Act
        await truckController.updateTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 404);

    });







});

describe("TruckController + TruckService Integration test", () => {   
    const sandbox = sinon.createSandbox();
    beforeEach(() => {
        Container.reset();

        
        let truckSchemaInstance = require('../../src/persistence/schemas/truckSchema').default;
        Container.set("truckSchema", truckSchemaInstance);

        let truckRepoClass = require('../../src/repos/truckRepo').default;
        let truckRepoInstance = Container.get(truckRepoClass);
        Container.set("TruckRepo", truckRepoInstance);

        let truckServiceClass = require('../../src/services/truckService').default;
        let truckServiceInstance = Container.get(truckServiceClass);
        Container.set("TruckService", truckServiceInstance);

    });
    
    afterEach(() => {
        sinon.restore();
        sandbox.restore();
    });

    it('createTruck returns truck', async () => {

        // Arrange
        let body = {
            id: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };
        let req: Partial<Request> = {};
            req.body=body;

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckRepoInstance = Container.get("TruckRepo");
        sinon.stub(truckRepoInstance, 'getTruckById').returns(null);
        sinon.stub(truckRepoInstance, 'save').returns(Promise.resolve(Result.ok<ITruckDTO>(body as ITruckDTO)));

        let truckServiceInstance = Container.get("TruckService");
        const truckServiceSpy = sinon.spy(truckServiceInstance, 'createTruck');
    
        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);
        // Act
        await truckController.createTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 201);
        sinon.assert.calledOnce(truckServiceSpy);
        sinon.assert.calledWith(truckServiceSpy, body);


    });


    it('updateTruck returns truck', async () => {

        // Arrange
        let body = {
            id: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };
        let req: Partial<Request> = {};
            req.body=body;

        let res: Partial<Response> = {
            status: sinon.spy(),
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckRepoInstance = Container.get("TruckRepo");
        sinon.stub(truckRepoInstance, 'getTruckById').returns(Promise.resolve(TruckMap.toDomain(body as ITruckDTO)));
        sinon.stub(truckRepoInstance, 'save').returns(Promise.resolve(TruckMap.toDomain(body as ITruckDTO)));

        let truckServiceInstance = Container.get("TruckService");
        const truckServiceSpy = sinon.spy(truckServiceInstance, 'updateTruck');
    
        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);
        // Act
        await truckController.updateTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(truckServiceSpy);
        sinon.assert.calledWith(truckServiceSpy, body);

    });

    it('softDeleteTruck returns truck', async () => {

        // Arrange
        let body = {
            id: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1,
            active: true
        };
        let req: Partial<Request> = {};
        req.params= {
            id: "truckID"
        }

        let res: Partial<Response> = {
            status: sinon.spy(),
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckRepoInstance = Container.get("TruckRepo");
        sinon.stub(truckRepoInstance, 'getTruckById').returns(Promise.resolve(TruckMap.toDomain(body as ITruckDTO)));
        sinon.stub(truckRepoInstance, 'save').returns(Promise.resolve(TruckMap.toDomain(body as ITruckDTO)));

        let truckServiceInstance = Container.get("TruckService");
        const truckServiceSpy = sinon.spy(truckServiceInstance, 'softDeleteTruck');
    
        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);
        // Act
        await truckController.softDeleteTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(truckServiceSpy);
        sinon.assert.calledWith(truckServiceSpy, body.truckID);

    });

    it('getTruck returns truck', async () => {

        // Arrange
        let body = {
            id: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };
        let req: Partial<Request> = {};
            req.body = {
                truckID: "truckID"
            }

        let res: Partial<Response> = {
            status: sinon.spy(),
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckRepoInstance = Container.get("TruckRepo");
        sinon.stub(truckRepoInstance, 'getTruckById').returns(Promise.resolve(TruckMap.toDomain(body as ITruckDTO)));

        let truckServiceInstance = Container.get("TruckService");
        const truckServiceSpy = sinon.spy(truckServiceInstance, 'getTruck');
    
        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);
        // Act
        await truckController.getTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(truckServiceSpy);
        sinon.assert.calledWith(truckServiceSpy, "truckID");

    });

    it('getTruckAll returns list', async () => {

        // Arrange
        let body = [{
            id: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1,
            active: true
        },{
            id: "id2",
            truckID: "truckID2",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1,
            active: true
        },];
        let req: Partial<Request> = {};
            req.body = {
                truckID: "truckID"
            }

        let res: Partial<Response> = {
            status: sinon.spy(),
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

    
        let truckRepoInstance = Container.get("TruckRepo");
        let trucks: Truck[] = [];
        body.forEach(truck => {
            trucks.push(TruckMap.toDomain(truck));
        });
        sinon.stub(truckRepoInstance, "getAllTrucks").returns(Promise.resolve(body));

        let truckServiceInstance = Container.get("TruckService");
        const truckServiceSpy = sinon.spy(truckServiceInstance, 'getAllTrucks');
    
        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);
        // Act
        await truckController.getAllTrucks(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(truckServiceSpy);
        sinon.assert.calledWith(truckServiceSpy);
    });


    
    
});

describe("TruckController + TruckService + TruckRepo Integration test", () => {

    const sandbox = sinon.createSandbox();
    beforeEach(() => {
        Container.reset();

        
        let truckSchemaInstance = require('../../src/persistence/schemas/truckSchema').default;
        Container.set("truckSchema", truckSchemaInstance);

        let truckRepoClass = require('../../src/repos/truckRepo').default;
        let truckRepoInstance = Container.get(truckRepoClass);
        Container.set("TruckRepo", truckRepoInstance);

        let truckServiceClass = require('../../src/services/truckService').default;
        let truckServiceInstance = Container.get(truckServiceClass);
        Container.set("TruckService", truckServiceInstance);

    });
    
    afterEach(() => {
        sinon.restore();
        sandbox.restore();
    });

    it('createTruck returns truck', async () => {

        // Arrange
        let body = {
            id: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };
        
        let body2 = {
            domainId: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        }as ITruckPersistence;

        let req: Partial<Request> = {};
            req.body=body;

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

        let truckSchemaInstance = Container.get("truckSchema");
        sinon.stub(truckSchemaInstance, 'findOne').returns(Promise.resolve(null));
        sinon.stub(truckSchemaInstance, 'create').returns(Promise.resolve(body2 as ITruckPersistence));

        let truckRepoInstance = Container.get("TruckRepo");
        const truckRepoSpy = sinon.spy(truckRepoInstance, 'save');

        let truckServiceInstance = Container.get("TruckService");
        const truckServiceSpy = sinon.spy(truckServiceInstance, 'createTruck');
    
        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);
        // Act
        await truckController.createTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 201);
        sinon.assert.calledOnce(truckRepoSpy);
        sinon.assert.calledOnce(truckServiceSpy);

    });

    it('updateTruck returns truck', async () => {

        // Arrange
        let body = {
            id: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };
        
        const body2 = {
            domainId: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1,
            save() { return this; }
        } as ITruckPersistence & Document<any, any, any>;

        let req: Partial<Request> = {};
            req.body=body;

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

        let truckSchemaInstance = Container.get("truckSchema");
        sinon.stub(truckSchemaInstance, 'findOne').returns(Promise.resolve(body2 as ITruckPersistence & Document<any, any, any>));

        

        let truckRepoInstance = Container.get("TruckRepo");
        const truckRepoSpy = sinon.spy(truckRepoInstance, 'save');

        let truckServiceInstance = Container.get("TruckService");
        const truckServiceSpy = sinon.spy(truckServiceInstance, 'updateTruck');
    
        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);
        // Act
        await truckController.updateTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(truckRepoSpy);
        sinon.assert.calledOnce(truckServiceSpy);

    });
    it('softDeleteTruck returns truck', async () => {

        // Arrange
        let body = {
            id: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1,
            active: true
        };
        
        let body2 = {
            domainId: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1,
            active: true,
            save() { return this; }
        }as ITruckPersistence;
        
        let req: Partial<Request> = {};
        req.params= {
            id: "truckID"
        }

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

        let truckSchemaInstance = Container.get("truckSchema");
        sinon.stub(truckSchemaInstance, 'findOne').returns(Promise.resolve(body2 as ITruckPersistence & Document<any, any, any>));
        sinon.stub(truckSchemaInstance, 'create').returns(Promise.resolve(body2 as ITruckPersistence & Document<any, any, any>));

        

        let truckRepoInstance = Container.get("TruckRepo");
        const truckRepoSpy = sinon.spy(truckRepoInstance, 'save');

        let truckServiceInstance = Container.get("TruckService");
        const truckServiceSpy = sinon.spy(truckServiceInstance, 'softDeleteTruck');
    
        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);
        // Act
        await truckController.softDeleteTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(truckRepoSpy);
        sinon.assert.calledOnce(truckServiceSpy);

    });

    it('getTruck returns truck', async () => {

        // Arrange
        let body = {
            id: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        };
        
        let body2 = {
            domainId: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        }as ITruckPersistence;
        
        let req: Partial<Request> = {};
            req.body=body;

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

        let truckSchemaInstance = Container.get("truckSchema");
        sinon.stub(truckSchemaInstance, 'findOne').returns(Promise.resolve(body2 as ITruckPersistence & Document<any, any, any>));


        

        let truckRepoInstance = Container.get("TruckRepo");
        const truckRepoSpy = sinon.spy(truckRepoInstance, 'getTruckById');

        let truckServiceInstance = Container.get("TruckService");
        const truckServiceSpy = sinon.spy(truckServiceInstance, 'getTruck');
    
        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);
        // Act
        await truckController.getTruck(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(truckRepoSpy);
        sinon.assert.calledOnce(truckServiceSpy);
    });

    it('getAllTrucks returns list', async () => {

        // Arrange
        let body = [{
            id: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        },{
            id: "id2",
            truckID: "truckID2",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        },];
       
        let trucks: Truck[] = [];
        body.forEach(truck => {
            trucks.push(TruckMap.toDomain(truck));
        });
        
        let body2 = {
            domainId: "id",
            truckID: "truckID",
            tare: 1,
            capacity: 1,
            maxBatteryCapacity: 1,
            autonomy: 1,
            fastChargeTime: 1
        }as ITruckPersistence;
        
        let req: Partial<Request> = {};
            req.body=body;

        let res: Partial<Response> = {
            status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

        let truckSchemaInstance = Container.get("truckSchema");
        sinon.stub(truckSchemaInstance, 'find').returns(Promise.resolve(body));


        let truckRepoInstance = Container.get("TruckRepo");
        const truckRepoSpy = sinon.spy(truckRepoInstance, 'getAllTrucks');

        let truckServiceInstance = Container.get("TruckService");
        const truckServiceSpy = sinon.spy(truckServiceInstance, 'getAllTrucks');
    
        const truckController = new TruckController(truckServiceInstance as ITruckService);
        sinon.stub(truckController, 'isAuthenticated').returns(true);
        sinon.stub(truckController, 'isAuthorized').returns(true);
        // Act
        await truckController.getAllTrucks(<Request>req, <Response>res, <NextFunction>next);
        
        //Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(truckRepoSpy);
        sinon.assert.calledOnce(truckServiceSpy);
    });


});