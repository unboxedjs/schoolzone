import { Component } from '@angular/core';

@Component({
  selector: 'sz-root',
  template: `
    <form class="example-form">
      <mat-form-field class="example-full-width">
        <mat-label>Favorite food</mat-label>
        <input matInput placeholder="Ex. Pizza" value="Sushi" />
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Leave a comment</mat-label>
        <textarea matInput placeholder="Ex. It makes me feel..."></textarea>
      </mat-form-field>
    </form>
  `,
  styles: [],
})
export class AppComponent {
  title = 'sandbox';
}
