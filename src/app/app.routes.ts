import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { TableComponent } from './table/table.component';
import { CustomUploadComponent } from './custom-upload/custom-upload.component';

export const routes: Routes = [
    { path: 'upload', component: UploadComponent },
    { path: 'table', component: TableComponent },
    { path: 'custom-upload', component: CustomUploadComponent },
];
