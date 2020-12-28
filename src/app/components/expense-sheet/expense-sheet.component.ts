import { Component, OnInit } from '@angular/core';

import { ExpenseItem } from '../../models/ExpenseItem';
import { WebStorageLocalService } from '../../services/web-storage-local.service';

@Component({
    selector: 'app-expense-sheet',
    templateUrl: './expense-sheet.component.html',
    styleUrls: ['./expense-sheet.component.scss']
})
export class ExpenseSheetComponent implements OnInit {

    expenseArray = [];
    expenseTotal: number;
    newName: string;
    newAmount: number;
    newMonthlyIncome: number;

    constructor(
        public localStorage: WebStorageLocalService,
    ) { }

    ngOnInit(): void {
        this.loadExpensesOnInit();
    }

    // 
    //  ON-INIT
    // 
    async loadExpensesOnInit() {
        let lsData = await this.localStorage.getExpenses();
        let exampleData;

        if (!lsData) {
            exampleData = {
                id: 0,
                name: "example name",
                amount: 0
            };
            this.expenseArray.push(exampleData);
            console.log('expenseArray === ', this.expenseArray);

        } else {
            this.expenseArray = lsData;
        }

        await this.getExpenseTotal();

        this.localStorage.saveExpenses(this.expenseArray);
    }

    // 
    //  BUTTONS
    // 
    async onAddNewExpense() {
        const lsData = await this.localStorage.getExpenses();
        let newId = 1;

        if (lsData.length !== 0) {
            newId = lsData.length * (Math.random() * 9);
        }

        let newExpense = {
            id: newId,
            name: this.newName,
            amount: this.newAmount
        }

        this.expenseArray.push(newExpense);
        this.localStorage.saveExpenses(this.expenseArray);
        this.loadExpensesOnInit();
    }

    async onAddMonthlyIncome() {
        this.localStorage.saveIncome(this.newMonthlyIncome);
    }

    getExpenseTotal() {
        let total: number = 0;
        this.expenseArray.forEach(item => {
            total += +item.amount;
        })
        this.expenseTotal = total;
    }

    async loadExpenses() {
        this.expenseArray = await this.localStorage.getExpenses();
        this.getExpenseTotal();
    }

    async onDelete(expense) {
        console.log("delete pressed for ", expense);
        await this.localStorage.deleteExpense(expense.id);

        this.loadExpensesOnInit();

    }
}
