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
    expenses = {
        needs: [
            {
                amount: 0,
                id: 0,
                name: 'Example Need'
            }
        ],
        wants: [
            {
                amount: 0,
                id: 0,
                name: 'Example Want'
            }
        ],
        savings: [
            {
                amount: 0,
                id: 0,
                name: 'Example Savings'
            }
        ]
    };
    expenseTotal = {
        needs: 0,
        wants: 0,
        savings: 0
    };
    newName: string;
    newAmount: number;
    newMonthlyIncome: number;
    monthlyIncome = { amount: 0 };
    expenseGoals = {
        needs: 0,
        wants: 0,
        savings: 0
    }

    constructor(
        public localStorage: WebStorageLocalService,
    ) { }

    ngOnInit(): void {
        this.loadExpensesOnInit();
        this.loadIncomeOnInit();
    }

    // 
    //  ON-INIT
    // 
    async loadExpensesOnInit() {
        let lsData = await this.localStorage.getExpenses();

        if (lsData) {
            this.expenses = lsData;
        }

        await this.getExpenseTotal();

        this.localStorage.saveExpenses(this.expenses);
    }
    async loadIncomeOnInit() {
        let income = await this.localStorage.getIncome();
        if (income) {
            this.monthlyIncome = income;
        }

        this.getGoalTotals();

        this.localStorage.saveIncome(this.monthlyIncome);

    }

    // 
    //  BUTTONS
    // 
    async onAddNewExpense(type) {
        const lsData = await this.localStorage.getExpenses();
        let newId = 1;

        if (lsData[type].length !== 0) {
            newId = lsData[type].length * (Math.random() * 9);
        }

        let newExpense = {
            id: newId,
            name: this.newName,
            amount: this.newAmount
        }

        this.expenses[type].push(newExpense);
        this.localStorage.saveExpenses(this.expenses);
        this.loadExpensesOnInit();
    }

    async onAddMonthlyIncome() {
        this.monthlyIncome.amount = this.newMonthlyIncome
        this.localStorage.saveIncome(this.monthlyIncome);
    }

    async onDelete(expense, type) {
        console.log("delete pressed for ", expense);
        await this.localStorage.deleteExpense(expense.id, type);

        this.loadExpensesOnInit();

    }

    //
    //  PRIVATE - functions
    // 
    getExpenseTotal() {

        const expenseTypes = ['needs', 'wants', 'savings'];

        expenseTypes.forEach(type => {
            let total: number = 0;

            this.expenses[type].forEach(item => {
                total += +item.amount;
            })
            this.expenseTotal[type] = total;
        })
    }

    getGoalTotals() {
        this.expenseGoals.needs = Math.floor(this.monthlyIncome.amount / 2);
        this.expenseGoals.wants = Math.floor(this.monthlyIncome.amount / 10 * 4);
        this.expenseGoals.savings = Math.floor(this.monthlyIncome.amount / 10);
    }

    async loadExpenses() {
        this.expenseArray = await this.localStorage.getExpenses();
        this.getExpenseTotal();
    }
}
