export interface IStudent {
  isLoggedIn: boolean;
  studentInfo: { [key: string]: string };
  studentList: any[];
}

function state(): IStudent {
  return {
    isLoggedIn: false,
    studentInfo: {
      id: '',
      firstname: '',
      lastname: ''
    },
    studentList: []
  };
}

export default state;
