import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPathController from "./IControllers/IPathController";

import { Result } from "../core/logic/Result";
import fetch from 'node-fetch';

const http = require('https');

@Service()
export default class PathController implements IPathController {
  constructor() {}

 

  public async getAllPaths(req: Request, res: Response, next: NextFunction){
    

    const address = 'http://localhost:3000/api/path/all/'+req.params.startWHId+"/undefined";

    
    const response = await fetch(address, {
        method: 'GET',
    });
    
    if (response.status == 404){
        res.status(404)
        return res.send("No paths found");   
    }else{
        let data = await response.json();
        res.status(200)
        return res.json(data);
    }
  }


}