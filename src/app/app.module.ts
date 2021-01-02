// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialGeneralModule } from './modules/material-general.module';


// COMPONENTS
import { AppComponent } from './app.component';
import { ExpenseSheetComponent } from './components/expense-sheet/expense-sheet.component';
@NgModule({
    declarations: [
        AppComponent,
        ExpenseSheetComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MaterialGeneralModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
