import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

import config from "../../../config";
import ITruckController from '../../controllers/IControllers/ITruckController';

const route = Router();

export default (app: Router) => {
   
    app.use('/truck', route);

    const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

    route.get('/id/:id', (req, res, next) =>  {
        req.body.truckID = req.params.id;
        ctrl.getTruck(req, res, next)
    });

    route.get('/all', (req, res, next) => {
        ctrl.getAllTrucks(req, res, next)


    });

    route.post('/',
        celebrate({
            body: Joi.object({
                truckID: Joi.string().required(),
                tare: Joi.number().required(),
                capacity: Joi.number().required(),
                maxBatteryCapacity: Joi.number().required(),
                autonomy: Joi.number().required(),
                fastChargeTime: Joi.number().required()
            })
        }),
        
        (req, res, next) => ctrl.createTruck(req, res, next)
    );


    route.patch('/',
        celebrate({
            body: Joi.object({
                truckID: Joi.string().required(),
                tare: Joi.number(),
                capacity: Joi.number(),
                maxBatteryCapacity: Joi.number(),
                autonomy: Joi.number(),
                fastChargeTime: Joi.number()
            })
        }),
        
        (req, res, next) => ctrl.updateTruck(req, res, next)
    );

    route.delete('/id/:id', (req, res, next) => {
        ctrl.softDeleteTruck(req, res, next)
    });

    route.delete('/hard/id/:id', (req, res, next) => {
        ctrl.hardDeleteTruck(req, res, next)
    });


}