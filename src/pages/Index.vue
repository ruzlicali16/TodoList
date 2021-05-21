<template>
  <q-page class="q-pa-xl">
    <q-list bordered v-if="studentList.length != 0">
      <template v-for="(student, index) in studentList">
        <q-item :key="index" class="row items-center">
          <q-item-section avatar>
            <q-icon color="primary" name="person" />
          </q-item-section>
          <q-item-section>Firstname: {{ student.firstname }}</q-item-section>
          <q-item-section>Lastname: {{ student.lastname }}</q-item-section>
          <q-item-section top side>
            <div class="q-gutter-xs">
              <q-btn
                class="cursor-pointer"
                color="green"
                icon="edit"
                size="12px"
                flat
                dense
                round
                @click.stop.prevent="viewStudent(student.id)"
              /><q-btn
                class="cursor-pointer"
                color="red"
                icon="delete"
                size="12px"
                flat
                dense
                round
                @click.stop.prevent="deleteStudent(student.id)"
              />
            </div>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
    <div v-else class="text-center text-h5 text-red">No Student!</div>
    <div class="q-gutter-y-sm">
      <q-input v-model="sInfo.firstname" type="text" label="First Name" />
      <q-input v-model="sInfo.lastname" type="text" label="Last Name" />
      <q-btn
        color="primary"
        icon="add"
        label="Add Student"
        @click="addStudent()"
      />
    </div>
    <!-- popup dialog -->
    <q-dialog v-model="showDialog" @before-show="dialogShowed()">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="person" color="primary" text-color="white" />
          <div class="q-ml-sm">Student ID Number: {{ dStudentInfo.id }}</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="dStudentInfo.firstname"
            type="text"
            label="First Name"
          />
          <q-input
            v-model="dStudentInfo.lastname"
            type="text"
            label="Last Name"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Save" color="primary" @click="editStudent()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('student', ['studentList', 'studentInfo'])
  },
  methods: {
    ...mapActions('student', [])
  }
})
export default class PageIndex extends Vue {
  studentList!: any[];
  studentInfo!: { [key: string]: string };
  dStudentInfo = {
    id: '',
    firstname: '',
    lastname: ''
  };
  sInfo = {
    id: '',
    firstname: '',
    lastname: ''
  };
  showDialog = false;

  async addStudent(): Promise<void> {
    await this.$store.dispatch('student/addStudent', this.sInfo);
    this.sInfo = { id: '', firstname: '', lastname: '' };
  }

  async viewStudent(id: string): Promise<void> {
    await this.$store.dispatch('student/viewStudent', id);
    this.showDialog = true;
  }

  async editStudent(): Promise<void> {
    await this.$store.dispatch('student/editStudent', this.dStudentInfo);
    this.showDialog = false;
  }

  deleteStudent(id: string): void {
    this.$q
      .dialog({
        title: 'Delete',
        message: 'Are you sure?',
        color: 'red',
        cancel: true
      })
      .onOk(async () => {
        await this.$store.dispatch('student/deleteStudent', id);
      });
  }

  dialogShowed(): void {
    this.dStudentInfo = {
      id: this.studentInfo.id,
      firstname: this.studentInfo.firstname,
      lastname: this.studentInfo.lastname
    };
  }
}
</script>
