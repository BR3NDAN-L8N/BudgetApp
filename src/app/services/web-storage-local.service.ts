// import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const LS_EXPENSES = 'users-expenses';
const LS_INCOME = 'users-income';
const expenses = 'expenses';
const income = 'income';

@Injectable({
    providedIn: 'root'
})
export class WebStorageLocalService {

    // "storage" is what we refer to in order to access anything stored in the browser
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

    // 
    //  EXPENSE - public
    //    
    public async saveExpenses(data) {
        await this.addNewDataToLocal(expenses, data);
    }

    public getExpenses() {
        return this.getDataFromLocal(expenses);
    }

    public deleteExpense(expenseId, type) {
        let lsData = this.getDataFromLocal(expenses);

        lsData[type].forEach((item, index) => {
            if (item.id === expenseId) {
                lsData[type].splice(index, 1);
            }
        });

        this.addNewDataToLocal(expenses, lsData);
    }

    // 
    //  INCOME - public
    //    
    public async saveIncome(data) {
        await this.addNewDataToLocal(income, data);
    }

    public async getIncome() {
        let lsData = await this.getDataFromLocal(income);
        return lsData;
    }

    // 
    //  PRIVATE
    //    
    private setStorageKey(dataType) {
        console.log('\n*****\nstart: setStorageKey');

        let STORAGE_KEY: string;
        if (dataType === expenses) {
            STORAGE_KEY = LS_EXPENSES;
        } else if (dataType === income) {
            STORAGE_KEY = LS_INCOME;
        } else {
            console.log(`Unspecified dataType was entered: ${dataType}`);
        }

        console.log('end: setStorageKey \n*****\n');

        return STORAGE_KEY;
    }

    private addNewDataToLocal(dataType, data) {
        console.log('\n*****\nstart: saveDataLocally');

        let STORAGE_KEY: string = this.setStorageKey(dataType);

        console.log(`dataType: ${dataType} \ndata: ${data}`);

        //  Command to save to Local-Storage
        this.storage.set(STORAGE_KEY, data);

        console.log('end: saveDataLocally \n*****\n');
    }

    private getDataFromLocal(dataType) {
        console.log('\n*****\nstart: getDataFromLocal');

        let STORAGE_KEY: string = this.setStorageKey(dataType);

        //  Command to get data from Local-Storage
        const localStorage = this.storage.get(STORAGE_KEY);
        console.log('data from local storage: ', localStorage);


        console.log('end: getDataFromLocal\n*****\n');

        return localStorage;
    }
}
