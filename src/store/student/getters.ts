import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IStudent } from './state';

const getters: GetterTree<IStudent, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
