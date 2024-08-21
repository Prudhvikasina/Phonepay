// src/app/store/reducers/project-item.reducer.ts
import { createReducer, on } from '@ngrx/store';
// import { ProjectItem } from '../../models/project-item.model';
import * as ProjectItemActions from '../project-items.actions';
import { ProjectItem } from 'src/app/models/project-item.model';
// import * as ProjectItemActions from 

export interface ProjectItemState {
  randomItems: ProjectItem[];
  savedItems: ProjectItem[];
}

export const initialState: ProjectItemState = {
  randomItems: [],
  savedItems: []
};

export const projectItemReducer = createReducer(
  initialState,
  on(ProjectItemActions.loadRandomItemsSuccess, (state, { items }) => ({
    ...state,
    randomItems: items
  })),
  on(ProjectItemActions.saveItem, (state, { item }) => ({
    ...state,
    savedItems: [...state.savedItems, item]
  })),
  on(ProjectItemActions.removeItem, (state, { id }) => ({
    ...state,
    savedItems: state.savedItems.filter(item => item.id !== id)
  }))
);