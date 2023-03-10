import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  public urlOrigin = window.location.origin.split(":")[0] + ":" + window.location.origin.split(":")[1] + ":3001/";
   
  constructor() {}

  getJwt() {
    const cookies = document.cookie.split(';');
    
    let jwt = "";
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if(name.trim() === "jwt"){
        jwt = value;
      }
    }
    const cookie = "jwt=" + jwt;
    return cookie;
  }

  async createTrip(savePlan: any) {
    let url = this.urlOrigin+'api/trip/';
    if(this.urlOrigin.includes("azure")){
      url = 'https://auth57.azurewebsites.net/api/trip/';
    }
    const response = await this.sendFetch(url, 'POST', savePlan, this.getJwt());
    const data = await response.json();

    return data;

  }

   async getAllTrips(){
    let url = this.urlOrigin+'api/trip/all';
    if(this.urlOrigin.includes("azure")){
      url = 'https://auth57.azurewebsites.net/api/trip/all';
    }

    const response = await this.sendFetch(url,'GET',null,this.getJwt());
    const data = await response.json();

    return data;
  }

  async sendFetch(url: string, method: string, data: any, cookie: any) {
    if(data)
      return await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          "authorization": cookie,
        },
      })
    else
      return await fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          "authorization": cookie,
        }
      })
  }
}
