import { Document, FilterQuery, Model } from "mongoose";
import { Inject, Service } from "typedi";
import { IPathPersistance } from "../dataschema/IPathPersistance";
import { Path } from "../domain/path/Path";
import { PathID } from '../domain/path/PathID';
import { PathMap } from "../mappers/PathMap";
import IPathRepo from './IRepos/IPathRepo';


@Service()
export default class PathRepo implements IPathRepo{
    constructor(
        @Inject('pathSchema') private pathSchema : Model<IPathPersistance & Document>,
    ) {}
      
    public async exists(path: Path): Promise<boolean> {
        const idX= path.id instanceof PathID ? (<PathID>path.id):path.id;
        
        const query = {domainId: idX};
        const PathDocument = await this.pathSchema.findById(query as
        FilterQuery<IPathPersistance & Document>);

        return !!PathDocument === true;
    }

    public async save(path:Path): Promise<Path>{
        const query= {pathID: path.pathID.id};
        const pathDocument = await this.pathSchema.findOne(query as FilterQuery<IPathPersistance & Document>);
        try{
            if (pathDocument === null){
                const rawPath: any = PathMap.toPersistance(path);
                const pathCreated = await this.pathSchema.create(rawPath);
                return PathMap.toDomain(pathCreated);
            }
            else{
                pathDocument.pathID= path.pathID.id;
                pathDocument.startWHId= path.startWHId.startWHId;
                pathDocument.destinationWHId= path.destinationWHId.destinationWHId;
                pathDocument.pathTravelTime= path.pathTravelTime.pathTravelTime;
                pathDocument.wastedEnergy= path.wastedEnergy.wastedEnergy;
                pathDocument.extraTravelTime= path.extraTravelTime.extraTravelTime;
                await pathDocument.save();
                return path;
            }
        }catch(error){
            throw error;
        }
    }
    public async delete (Path: Path): Promise<Path>{
        const query = {pathID: Path.pathID.id};

        const pathDocument = await this.pathSchema.findOne(query as 
        FilterQuery<IPathPersistance & Document>); 

       
        
        try {
            if(pathDocument === null){
                return Path;
            }
            else{
                await this.pathSchema.deleteOne(query as 
                FilterQuery<IPathPersistance & Document>);
                return Path;
            }
        }catch(error){
            throw error;
        }
    }
        
        public async getPathById(pathID: string): Promise<Path> {
            const query ={pathID: pathID}
            
            const pathDocument = await this.pathSchema.findOne(query as 
            FilterQuery<IPathPersistance & Document>);
            if(pathDocument === null){
                return null;
            }
            else{
                return PathMap.toDomain(pathDocument);
            }
        }
        
        public async getAllPaths(startWH:string ,destinationWH:string): Promise<Path[]> {
            let query;
            let pathDocument;
            if(startWH==''&& destinationWH != '' ){
                 query ={destinationWHId: destinationWH}
            }else if(destinationWH=='' && startWH != ''){
                 query ={startWHId: startWH}
            }
            else{
                query = {startWHId:startWH,destinationWHId:destinationWH}
           
            } 
            
            if(startWH=='' && destinationWH==''){
                pathDocument = await this.pathSchema.find();
            }  else{
                
                pathDocument= await this.pathSchema.find(query as FilterQuery<IPathPersistance & Document>)
            }
            
            
             let paths: Path[]= [];
            pathDocument.forEach(path=>{
                paths.push(PathMap.toDomain(path));
            });
            return paths;
        }

}
