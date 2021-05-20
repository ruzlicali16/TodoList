import { MutationTree } from 'vuex';
import { IStudent } from './state';

const mutation: MutationTree<IStudent> = {
  addStudent(state, payload: { [key: string]: string }) {
    // your code
    state.studentList.push(payload);
  },

  viewStudent(state, student: { [key: string]: string }) {
    state.studentInfo = student;
  },

  editStudent(state, payload: { [key: string]: string }) {
    const student = payload;
    const studentIndex = state.studentList.findIndex(
      (s: { [key: string]: string }) => s.id == student.id
    );
    state.studentList[studentIndex] = {
      id: student.id,
      firstname: student.firstname,
      lastname: student.lastname
    };
  }
};

export default mutation;
