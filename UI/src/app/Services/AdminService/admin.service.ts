import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() {}

  public urlOrigin = window.location.origin.split(":")[0] + ":" + window.location.origin.split(":")[1] + ":3001/";

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

  async createUser(data: any) {
    let url = this.urlOrigin+'api/user/';
    if(this.urlOrigin.includes("azure"))
      url = 'https://auth57.azurewebsites.net/api/user/';

    const response = await this.sendFetch(url, 'POST', data, this.getJwt());

    if(response.status == 401){
      return "401";
    }

    const jsonResponse = await response.json();
    return jsonResponse;

  }

  async getAllUsers(){
    let url = this.urlOrigin+ 'api/user/all' ;
    if(this.urlOrigin.includes("azure")){
      url = 'https://auth57.azurewebsites.net/api/user/all';
    }

    const response = await this.sendFetch(url,'GET',null, this.getJwt());
    if(response.status == 401){
      return "401";
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  }

  async getUser() {
    let url = this.urlOrigin+ 'api/user/id';

    if(this.urlOrigin.includes("azure")){
      url = 'https://auth57.azurewebsites.net/api/user/id';
    }

    const response = await this.sendFetch(url,'GET',null, this.getJwt());
    if(response.status == 401){
      return "401";
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  }


  async updateUser(user: any) {
    let url = this.urlOrigin+ 'api/user/';
    if(this.urlOrigin.includes("azure")){
      url = 'https://auth57.azurewebsites.net/api/user';
    }

    const data = user;
    const response = await this.sendFetch(url, 'PATCH', data, this.getJwt());

    return response;
  }

  async getAllRole() {
    let url = this.urlOrigin+'api/role/all';
    if(this.urlOrigin.includes("azure")){
      url = 'https://auth57.azurewebsites.net/api/role/all';
    }

    const response = await this.sendFetch(url, 'GET', null, this.getJwt());
    if(response.status == 401){
      return "401";
    }
    
    const jsonResponse = await response.json();

    return jsonResponse;
  }

  async sendFetch(url: string, method: string, data: any, cookie: any) {
    if(data)
      return await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "authorization": cookie,
        },
      })
    else
      return await fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          "authorization": cookie,
        },
      })
  }
}
