import { createAction } from 'redux-actions';
import { IMainAppModel } from '../models';
export namespace mainAppActionNS {
  export enum Type {
    SET_TEXT = 'set_text'
  }
  export const setText = createAction<PartialPick<IMainAppModel, 'text'>, string>(
    Type.SET_TEXT,
    (text: string) => {
      return {
        text
      };
    }
  );
}
export type TMainAppActions = Omit<typeof mainAppActionNS, 'Type'>;
