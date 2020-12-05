import { Injectable } from '@angular/core';
/**
 * This service if for the add and edit dialog boxes of the grocery app
 */

import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public alertController: AlertController, public dataService: GroceriesServiceService) { }

  /* the ? next to inputs makes them optional */
  async showPrompt(item?, index?, slidingItem?) {
    console.log("showPrompt", item, index)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: item ? 'Edit Item' : 'Add Item',
      inputs: [
 /*       {
          name: '_id',
          disabled: true
        },*/
        {
          name: 'name',
          placeholder: "Name",
          value: item ? item.name : null
        },
        {
          name : 'quantity',
          placeholder: "Quantity",
          value: item ? item.quantity : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: (item) => {
            console.log('Confirm Save', item, index);
            if (index !== undefined) {
              this.dataService.editItem(item, index);
              /* item doesn't slide back when finished without this line*/
              slidingItem.close();
            }
            else {
              this.dataService.addItem(item);
            }
            
            
          }
        }
      ]
    });

    await alert.present();

  }

}
