import { MutationTree } from 'vuex';
import { IStudent } from './state';

interface Student {
  student: { [key: string]: string };
  studentIndex: number;
}

const mutation: MutationTree<IStudent> = {
  addStudent(state, student: { [key: string]: string }) {
    state.studentList.push(student);
  },

  viewStudent(state, student: { [key: string]: string }) {
    state.studentInfo = student;
  },

  editStudent(state, payload: Student) {
    const { student, studentIndex } = payload;
    state.studentList[studentIndex] = {
      id: student.id,
      firstname: student.firstname,
      lastname: student.lastname
    };
  },

  deleteStudent(state, studentIndex: number) {
    state.studentList.splice(studentIndex, 1);
  }
};

export default mutation;
