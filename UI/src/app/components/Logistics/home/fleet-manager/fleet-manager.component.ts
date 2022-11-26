import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TruckService } from 'src/app/Services/TruckService/truck.service';



interface Truck{
  truckID: string;
  tare: number;
  capacity: number;
  maxBatteryCapacity: number;
  autonomy: number;
  fastChargeTime: number;
}

export interface DialogData {
  name: string;
  message: string;
}

@Component({
  selector: 'app-fleet-manager',
  templateUrl: './fleet-manager.component.html',
  styleUrls: ['./fleet-manager.component.css']
})
export class FleetManagerComponent implements OnInit {

  public selectedTruckOption : any;
  public selectedTruck: any;
  
  public truckList: any[] = [];

  public seeAll: boolean = false;

  displayedColumns: string[] = ['TruckID', 'Tare', 'Capacity', 'Maximum Battery Capacity', 'Autonomy', 'Fast Charge Time', "Actions"];
  dataSource = this.truckList;
  
  constructor(public dialog: MatDialog,private truckService: TruckService, private router: Router) { 
    this.truckService.getAllTruck().then((data) => {
      this.truckList = data;
      this.dataSource = this.truckList;
    });
    this.selectedTruck= {
      truckID: "",
      tare: undefined,
      capacity: undefined,
      maxBatteryCapacity: undefined,
      autonomy: undefined,
      fastChargeTime: undefined
    }
  }

  

  ngOnInit(): void {
    
  }

  onTruckSelected($event: any){
    this.seeAll=false;
    this.selectedTruck = this.truckList.find(element => element.truckID == this.selectedTruckOption);;
    
  }


  goToCreateTruck() {
    this.router.navigate(['Logistics/Truck/CreateTruck']);
    
  }
  goToEditTruck(truckID:string) {
    this.router.navigate(['Logistics/Truck/EditTruck', truckID]);
    
  } 
  async deleteTruck(truckID:string) {
    

    let answer = await this.truckService.deleteTruck(truckID);
    let message = "Truck Deleted Successfully";
    if(answer.status != 200){
      message = "Truck Deletion Failed";
    }
    const dialogRef = this.dialog.open(DeleteTruckComponentDialog, {
      width: '250px',
      data: {
        name: this.selectedTruck.truckID,
        message: message},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(answer.status == 200)
        window.location.reload();
      
    });
  }

  toggleSeeAll(){
    this.selectedTruckOption="";
    this.seeAll=!this.seeAll;
  }

}

@Component({
  selector: 'app-fleet-manager',
  templateUrl: 'delete-truck-dialog.html',
})
export class DeleteTruckComponentDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteTruckComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onOk(): void {
    this.dialogRef.close();
  }
}
