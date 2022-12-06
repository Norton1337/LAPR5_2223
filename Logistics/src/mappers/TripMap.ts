import { Document } from "mongodb";
import { Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { ITripPersistence } from "../dataschema/ITripPersistence";
import { Trip } from "../domain/trip/Trip";
import { ITripDTO } from "../dto/ITripDTO";



export class TripMap extends Mapper<Trip> {
    
    public static toDTO(trip: Trip): ITripDTO {
        let pathToStringList :string[] = [];
        trip.pathIDlist.forEach(pathID => {
            pathToStringList.push(pathID.id);
        });
        return {
            id: trip.id.toString(),
            tripID: trip.tripID.id,
            date: trip.date.date,
            pathIDlist: pathToStringList,
            truckID: trip.truck.id,
            packagingID: trip.packaging.id,
        } as ITripDTO;
    }
    
    public static toDTOList(trips: Trip[]):ITripDTO[]{
        return trips.map((trip) => TripMap.toDTO(trip));
    }

    public static toDomain(trip: any | Model<ITripPersistence & Document>): Trip {
        const tripOrError = Trip.create(
            trip,
            new UniqueEntityID(trip._id),
        );
        tripOrError.isFailure ? console.log(tripOrError.error) : '';

        return tripOrError.isSuccess ? tripOrError.getValue() : null;
    }

    public static toPersistence(trip: Trip): any{
        // string array
        
        let pathToStringList :string[] = [];
        trip.pathIDlist.forEach(pathID => {
            pathToStringList.push(pathID.id);
        });
        console.log("pathToStringList", pathToStringList);
        
        return {
            id: trip.id.toString(),
            tripID: trip.tripID.id,
            date: trip.date.date,
            pathIDlist: pathToStringList,
            truckID: trip.truck.id,
            packagingID: trip.packaging.id,
        };
    }
        
}
    

