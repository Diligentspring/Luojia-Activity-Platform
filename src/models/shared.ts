import { UserInfoType } from '@/services/typings';
import { useModel, createStore } from 'react-model';

interface StateType {
  user?: UserInfoType;
}

interface ActionsParamType {
  setShared: Partial<StateType>;
}

const initialState: StateType = {
  user: {},
};
const model: ModelType<StateType, ActionsParamType> = {
  state: initialState,
  actions: {
    setShared: (payload, { state, actions }) => {
      console.log('payload', payload);
      return { ...state, ...payload };
    },
  },
};

export default model;
