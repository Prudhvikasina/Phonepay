// src/app/store/actions/project-item.actions.ts
import { createAction, props } from '@ngrx/store';
import { ProjectItem } from '../../models/project-item.model';

export const loadRandomItems = createAction('[Project Items] Load Random Items');
export const loadRandomItemsSuccess = createAction(
  '[Project Items] Load Random Items Success',
  props<{ items: ProjectItem[] }>()
);
export const saveItem = createAction(
  '[Project Items] Save Item',
  props<{ item: ProjectItem }>()
);
export const removeItem = createAction(
  '[Project Items] Remove Item',
  props<{ id: number }>()
);