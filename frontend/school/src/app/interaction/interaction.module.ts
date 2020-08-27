import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum/forum.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ForumComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [ForumComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class InteractionModule {}
