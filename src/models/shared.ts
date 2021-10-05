import { useModel, createStore } from 'react-model';

interface StateType {
  user?: {
    avatar?:string;
    userId?: number;
    name?: string;
    email?: string;
    phone?: string;
    birthday?: string;
  };
}

interface ActionsParamType {}

const initialState: StateType = {
  user: {
    avatar:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userId: 987654321,
    name: 'Serati Ma',
    email: 'antdesign@alipay.com',
    phone: '0752-268888888',
    birthday: '2000-01-01',
  },
};
const model: ModelType<StateType, ActionsParamType> = {
  state: initialState,
  actions: {},
};

export default model;
