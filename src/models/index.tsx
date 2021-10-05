import { Model } from 'react-model';
import Shared from './shared';

const models = { Shared };

export const { getInitialState, useStore, getState, actions, subscribe, unsubscribe } =
  Model(models);
