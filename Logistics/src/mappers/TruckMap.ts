import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';

import { ITruckDTO } from "../dto/ITruckDTO";
import { Truck } from "../domain/truck/Truck";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { ITruckPersistence } from "../dataschema/ITruckPersistence";

export class TruckMap extends Mapper<Truck> {
    
    public static toDTO(truck: Truck): ITruckDTO {
        return {
            id: truck.id.toString(),
            truckID: truck.truckID.id,
            tare: truck.tare.tare,
            capacity: truck.capacity.capacity,
            maxBatteryCapacity: truck.maxBatteryCapacity.capacity,
            autonomy: truck.autonomy.autonomy,
            fastChargeTime: truck.fastChargeTime.time,
            active: truck.active.active
        } as ITruckDTO;
    }

    public static toDTOList(trucks: Truck[]): ITruckDTO[] {
        return trucks.map((truck) => TruckMap.toDTO(truck));
    }

    public static toDomain(truck: any | Model<ITruckPersistence & Document>): Truck {
        const truckOrError = Truck.create(
                truck,
                new UniqueEntityID(truck._id),
        );
        
        return truckOrError.isSuccess ? truckOrError.getValue() : null;
    }

    public static toPersistence(truck: Truck): any {
        return {
            domainId: truck.id.toString(),
            truckID: truck.truckID.id,
            tare: truck.tare.tare,
            capacity: truck.capacity.capacity,
            maxBatteryCapacity: truck.maxBatteryCapacity.capacity,
            autonomy: truck.autonomy.autonomy,
            fastChargeTime: truck.fastChargeTime.time,
            active: truck.active.active
        };
    }
}