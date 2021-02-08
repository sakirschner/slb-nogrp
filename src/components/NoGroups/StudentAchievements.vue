<template>
  <v-card>
    <v-card-title>Trophy Case</v-card-title>
    <v-card-text v-if="loading">
      <v-layout row justify-center class="pt-10 mb-10">
        <v-progress-circular
          :size="70"
          :width="7"
          color="rgb(0, 174, 255)"
          indeterminate
          v-if="loading"
        ></v-progress-circular>
      </v-layout>
    </v-card-text>
    <!-- <v-card-text v-else-if="!loading && !stats.length"> -->
    <!-- <v-row v-if="!stats.length">
          <span class="ml-4">No achievements yet</span>
        </v-row> -->
    <!-- <v-row v-if="foundGroup.group"> -->
    <!-- <v-col cols="12" md="3">
            <v-card color="#EA6400" dark elevation="0">
              <v-card-title>
                Place
              </v-card-title>
              <v-card-text>
                <span class="headline" 
                  >{{ foundGroup.index + 1 }}{{ foundGroup.group.suffix }}</span
                >
              </v-card-text>
            </v-card>
          </v-col> -->
    <!-- <v-col cols="12" md="3">
            <v-card color="#00aeff" dark elevation="0">
              <v-card-title>
                Total Points
              </v-card-title>
              <v-card-text>
                <span class="headline">{{ totalPoints }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row> -->
    <!-- </v-card-text> -->
    <v-card-text v-else>
      <v-row>
        <v-col cols="12" md="3">
          <v-card color="#EA6400" dark elevation="0">
            <v-card-title>
              Place
            </v-card-title>
            <v-card-text>
              <span class="headline"
                >{{ index + 1 }}{{ foundStudent.suffix }}</span
              >
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card color="#00aeff" dark elevation="0">
            <v-card-title>
              Points
            </v-card-title>
            <v-card-text>
              <span class="headline">{{ totalPoints }}</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="trophies-column" v-if="stats.length">
          <div
            v-for="reward in student.rewards"
            :key="reward.id"
            class="trophies"
          >
            <v-icon size="90px" color="#FFD700">mdi-trophy</v-icon>
            <span>{{ reward.reward }}</span>
          </div>
        </v-col>
      </v-row>
      <v-card-title>
        Group Stats
        <v-spacer />
        <v-text-field
          v-if="stats.length"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <span class="ml-4" v-if="!stats.length">No achievements yet</span>
      <v-data-table
        v-if="stats.length"
        :items="stats"
        :headers="headers"
        sort-by="created_at"
        :sort-desc="true"
        :search="search"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        :loading="loading"
        item-key="id"
        show-expand
      >
        <template v-slot:[`item.student.image`]="{ item }">
          <div class="pt-2 pb-2">
            <v-avatar v-if="item.student.image">
              <v-img :src="item.student.image" class="avatar"> </v-img>
            </v-avatar>
            <v-avatar color="rgb(0, 174, 255)" v-else>
              <v-icon dark size="30">mdi-account-circle</v-icon>
            </v-avatar>
          </div>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            {{ item.notes }}
          </td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  props: {
    student: Object,
    stats: Array,
    totalPoints: Number,
  },
  data: () => ({
    students: [],
    index: 0,
    foundStudent: {},
    organizedStudents: [],
    search: "",
    groups: [],
    expanded: [],
    singleExpand: false,
    loading: true,
    headers: [
      { text: "", value: "student.image", sortable: false },
      { text: "Achievement", value: "achievement.achievement" },
      { text: "Points", value: "achievement.points" },
      { text: "Time", value: "created_at" },
      { text: "", value: "data-table-expand" },
    ],
  }),
  async created() {
    await this.getStudents();
  },
  methods: {
    async getStudents() {
      let token = this.$store.state.auth.token;
      if (token) {
        await axios
          .get(`${this.$store.state.url.url}/api/user/user/`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            this.students = response.data.filter((student) => {
              return student.display;
            });
            this.organizeStudents();
          });
      }
    },
    organizeStudents() {
      this.organizedStudents = this.students.sort((a, b) => {
        if (a.points < b.points) {
          return 1;
        } else {
          return -1;
        }
      });
      this.organizedStudents.forEach((student, i) => {
        this.organizedStudents[i].suffix = this.nth(i + 1);
      });
      this.setPlace();
    },
    nth(n) {
      return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
    },
    setPlace() {
      this.organizedStudents.forEach((student, index) => {
        if (student.id === this.$props.student.id) {
          this.index = index;
          this.foundStudent = student;
        }
      });
      this.loading = false;
    },
  },
};
</script>

<style>
.trophies {
  display: flex;
  text-align: center;
  flex-flow: column;
}
.trophies-column {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
