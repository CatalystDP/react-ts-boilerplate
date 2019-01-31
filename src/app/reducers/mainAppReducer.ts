import { handleActions } from 'redux-actions';
import { mainAppActionNS } from '../actions';
import { RootState } from '.';
import { IMainAppModel } from '../models';

export namespace mainAppReducerNS {
  let defaultState: RootState.TMainAppState = {
    text: ''
  };
  export const reducer = handleActions<RootState.TMainAppState>(
    {
      [mainAppActionNS.Type.SET_TEXT]: (state, action) => {
        return {
          ...state,
          ...(action.payload || {})
        };
      }
    },
    defaultState
  );
}
