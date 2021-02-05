kz<template>
  <div>
    <v-container v-if="loading">
      <v-layout row justify-center class="pt-10 pb-10">
        <v-progress-circular
          :size="70"
          :width="7"
          color="rgb(0, 174, 255)"
          indeterminate
          v-if="loading"
        ></v-progress-circular>
      </v-layout>
    </v-container>
    <v-container v-else-if="!loading">
      <LeaderBoardList :students="students.students" :key="students.changes" />
      <v-row>
        <v-col cols="12" md="12">
          <AchievementList
            :achievements="achievements"
            :key="students.changes"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

import LeaderBoardList from "../../components/NoGroups/LeaderBoardList";
import AchievementList from "../../components/AchievementList";

export default {
  components: {
    LeaderBoardList,
    AchievementList,
  },
  data: () => ({
    students: {},
    achievements: [],
    stats: [],
    loading: true,
  }),
  async created() {
    await this.getAllStudents();
  },
  mounted() {
    window.setInterval(() => {
      this.getAllStudents();
    }, 60000);
  },
  methods: {
    async getAllStudents() {
      let token = this.$store.state.auth.token;
      if (token) {
        await axios
          .get(`${this.$store.state.url.url}/api/user/`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            let studentList = [];
            response.data.forEach((student) => {
              if (student.display) {
                studentList.push(student);
              }
            });
            this.students = {
              students: studentList,
              changes: 0,
            };
            this.getAchievements();
          });
      }
    },
    async getAchievements() {
      const token = this.$store.state.auth.token;
      if (token) {
        await axios
          .get(
            `${this.$store.state.url.url}/api/achievement/studentachievements/`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            console.log("in then");
            this.achievements = response.data;
            this.achievements.forEach((stat, index) => {
              this.achievements[index].created_at =
                new Date(stat.created_at).toLocaleDateString('en-US') +
                " " +
                new Date(stat.created_at).toLocaleTimeString('en-US');
            });
            this.compareStudentPoints();
          });
      }
    },
    async compareStudentPoints() {
      console.log("comparing");
      this.students.students.forEach((student) => {
        let points = 0;
        let studentAchievements = this.achievements.filter((achievement) => {
          return achievement.student.id === student.id;
        });
        studentAchievements.forEach((achievement) => {
          points += achievement.achievement.points;
        });
        if (points !== student.points) {
          this.updateStudent(student.id, points);
        }
      });
      console.log("done comparing");
      this.loading = false;
    },
    async updateStudent(id, points) {
      const token = this.$store.state.auth.token;
      const payload = {
        points: `${points}`,
      };
      if (token) {
        axios
          .patch(`${this.$store.state.url.url}/api/user/${id}/`, payload, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            this.students.students.forEach((student, index) => {
              if (response.data.id === student.id) {
                this.students.students[index] = response.data;
                this.students.changes++;
              }
            });
          });
      }
    },
  },
};
</script>

<style>
@media (min-width: 960px) {
  .container {
    max-width: 1200px !important;
  }
}
</style>
