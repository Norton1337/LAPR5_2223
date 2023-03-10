import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';
import config from '../../config';
import packageController from '../controllers/packageController';

export default async({expressApp})=>{
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    const userSchema ={
        name: 'userSchema',
        schema: '../persistance/schemas/userSchema'
    };

    const roleSchema ={
        name: 'roleSchema',
        schema:'../persistance/schemas/roleSchema'
    };

    const userRepo ={
        name: config.repos.user.name,
        path: config.repos.user.path
    }
    const roleRepo={
        name: config.repos.role.name,
        path: config.repos.role.path
    }

    const userController = {
        name: config.controllers.user.name,
        path: config.controllers.user.path
    }

    const roleController = {
        name: config.controllers.role.name,
        path: config.controllers.role.path
    }
    const pathController = {
        name: config.controllers.path.name,
        path: config.controllers.path.path
    }

    const warehouseController = {
        name: config.controllers.warehouse.name,
        path: config.controllers.warehouse.path
    }

    const deliveryController = {
        name: config.controllers.delivery.name,
        path: config.controllers.delivery.path
    }

    const truckController = {
        name: config.controllers.truck.name,
        path: config.controllers.truck.path
    }

    const planningController = {
        name: config.controllers.planning.name,
        path: config.controllers.planning.path
    }

    const tripController = {
        name: config.controllers.trip.name,
        path: config.controllers.trip.path
    }

    const packageController = {
        name: config.controllers.package.name,
        path: config.controllers.package.path
    }



    const userService = {
        name: config.services.user.name,
        path: config.services.user.path
    }

    const roleService = {
        name: config.services.role.name,
        path: config.services.role.path
    }
    





    await dependencyInjectorLoader({
        mongoConnection,
        schemas:[
            userSchema,
            roleSchema
        ],
        controllers:[
            userController,
            roleController,
            pathController,
            warehouseController,
            deliveryController,
            truckController,
            planningController,
            tripController,
            packageController
            
        ],
        repos:[
            userRepo,
            roleRepo
        ],
        services:[
            userService,
            roleService
        ]
    });
    Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

    await expressLoader({app: expressApp});
    Logger.info('✌️ Express loaded');
};