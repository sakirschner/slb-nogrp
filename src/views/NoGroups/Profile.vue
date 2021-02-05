<template>
  <div>
    <v-container v-if="loading && !edit">
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
    <v-container v-else-if="!edit && !loading">
      <v-row>
        <v-col cols="12" md="4">
          <AccountInfo @clicked="onEditClick" :account="account" />
        </v-col>

        <v-col cols="12" md="8">
          <StudentAchievements :stats="achievements" :totalPoints="totalPoints" :student="account"/>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else-if="edit && !loading">
      <EditAccount
        :account="account"
        @clicked="onCancelClick"
        @submitted="onSaveClick"
      />
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

// import GroupInfo from "../components/GroupInfo";
import AccountInfo from "../../components/AccountInfo";
import EditAccount from "../../components/EditAccount";
import StudentAchievements from "../../components/NoGroups/StudentAchievements";

export default {
  components: {
    AccountInfo,
    EditAccount,
    StudentAchievements,
  },
  data: () => ({
    account: {},
    group: [],
    achievements: [],
    edit: false,
    totalPoints: 0,
    groupWithPoints: {},
    isFetching: true,
    loading: true,
  }),
  async created() {
    await this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      await this.getAccount();
    },
    async getAccount() {
      let token = this.$store.state.auth.token;
      if (token) {
        await axios
          .get(`${this.$store.state.url.url}/api/user/me/`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            this.account = response.data;
            this.getAchievements();
          });
      }
    },
    async getAchievements() {
      let token = this.$store.state.auth.token;
      if (token) {
        await axios
          .get(
            `${this.$store.state.url.url}/api/achievement/studentachievements/?student_in=${this.account.id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            response.data.forEach((achievement) => {
              achievement.created_at =
                new Date(achievement.created_at).toLocaleDateString() +
                " " +
                new Date(achievement.created_at).toLocaleTimeString();
            });
            this.achievements = response.data;
            this.setTotalPoints();
          });
      }
    },
    setTotalPoints() {
      this.achievements.forEach((stat) => {
        this.totalPoints += stat.achievement.points;
      });
      this.loading = false;
    },
    onEditClick() {
      this.edit = !this.edit;
    },
    onCancelClick() {
      this.edit = !this.edit;
    },
    onSaveClick() {
      this.edit = !this.edit;
    },
  },
};
</script>

<style>
.v-card {
  /* box-shadow: none !important; */
  border-radius: 15px !important;
}
</style>
