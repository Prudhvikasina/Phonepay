// src/app/store/effects/project-item.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ProjectItemActions from '../actions/project-items.actions';
import { ProjectItem } from 'src/app/models/project-item.model';
@Injectable()
export class ProjectItemEffects {
  loadRandomItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectItemActions.loadRandomItems),
      mergeMap(() =>
        // Simulate API call with random items
        of(this.generateRandomItems()).pipe(
          map(items => ProjectItemActions.loadRandomItemsSuccess({ items })),
          catchError(() => of({ type: '[Project Items] Load Random Items Error' }))
        )
      )
    )
  );

  constructor(private actions$: Actions) {}

  private generateRandomItems(): ProjectItem[] {
    return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Project ${i + 1}`,
        description: `Description for Project ${i + 1}`,
        price: (i + 1) * 100 // Example price
      }));
  }
}