import { IMainAppModel } from '../models';

export interface RootState {
  // todos: RootState.TodoState;
  mainAppState: RootState.TMainAppState;
  router?: any;
}

export namespace RootState {
  export type TMainAppState = IMainAppModel;
}
