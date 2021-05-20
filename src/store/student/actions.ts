import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IStudent } from './state';
import { uid } from 'quasar';

const actions: ActionTree<IStudent, StateInterface> = {
  addStudent(context, payload: { [key: string]: string }) {
    const student = {
      id: uid(),
      firstname: payload.firstname,
      lastname: payload.lastname
    };
    if (student.firstname != '' && student.lastname != '') {
      context.commit('addStudent', student);
    } else {
      alert(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `error can't be empty!`
      );
    }
  },

  viewStudent(context, id: string) {
    context.state.studentList.map((s: { [key: string]: string }) => {
      if (s.id == id) {
        const student = {
          id: s.id,
          firstname: s.firstname,
          lastname: s.lastname
        };
        context.commit('viewStudent', student);
      }
    });
  },

  editStudent(context, payload: { [key: string]: string }) {
    context.commit('editStudent', payload);
  }
};

export default actions;
