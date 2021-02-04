<template>
  <div>
    <v-row class="leader-row">
      <v-card class="leader-card" style="text-align:center">
          <h3>Class Leaders</h3>
        <v-card-text style="display:flex; justify-content:space-evenly">
        <div class="leader-col">
          <p style="color:#B4B4B4">2</p>
          <v-avatar v-if="organizedStudents[1].image" size="75" class="ml-1">
            <v-img :src="organizedStudents[1].image" />
          </v-avatar>
          <v-avatar color="rgb(0, 174, 255)" v-else size="75" class="ml-1">
            <v-icon dark size="50">mdi-account-circle</v-icon>
          </v-avatar>
          <v-chip class="ma-1 mt-2" color="#B4B4B4" text-color="white">
            <v-icon small>mdi-medal-outline</v-icon>
            <span class="pl-1">{{ organizedStudents[1].points }} pts</span>
          </v-chip>
        </div>
        <div class="leader-col">
          <v-icon x-large class="mb-2" color="#D4AF37">mdi-crown</v-icon>
          <v-avatar v-if="organizedStudents[0].image" size="128">
            <v-img :src="organizedStudents[0].image" />
          </v-avatar>
          <v-avatar color="rgb(0, 174, 255)" v-else size="128">
            <v-icon dark size="1000">mdi-account-circle</v-icon>
          </v-avatar>
          <v-chip
            class="ma-1 mt-2 pa-2"
            color="#D4AF37"
            text-color="white"
            style="justify-content:center"
          >
            <v-icon md>mdi-trophy-outline</v-icon>
            <span class="pl-2" style="font-size: 18px"
              >{{ organizedStudents[0].points }} pts</span
            >
          </v-chip>
        </div>
        <div class="leader-col">
          <p style="color:#AD8A56">3</p>
          <v-avatar v-if="organizedStudents[2].image" size="75" class="ml-1">
            <v-img :src="organizedStudents[2].image" />
          </v-avatar>
          <v-avatar color="rgb(0, 174, 255)" v-else size="75" class="ml-1">
            <v-icon dark size="50">mdi-account-circle</v-icon>
          </v-avatar>
          <v-chip class="ma-1 mt-2" color="#AD8A56" text-color="white">
            <v-icon small>mdi-medal-outline</v-icon>
            <span class="pl-1">{{ organizedStudents[2].points }} pts</span>
          </v-chip>
        </div>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row>
      <v-col class="lb-col">
        <div v-for="(item, index) in filteredStudents(1, 6)" :key="item.id">
          <v-card class="mb-4 pr-2">
            <v-card-text class="pr-2">
              <span class="mr-2">
                {{ index + Math.ceil(organizedStudents.length / 6) - 2 }}
              </span>
              <v-avatar v-if="item.image">
                <v-img :src="item.image" class="avatar" />
              </v-avatar>
              <v-avatar color="rgb(0, 174, 255)" v-else>
                <v-icon dark size="30">mdi-account-circle</v-icon>
              </v-avatar>
              <div
                style="display: inline-block; color:#00aeff"
                class="pl-6 pts"
              >
                <b>{{ item.points }} pts</b>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col class="lb-col">
        <div v-for="(item, index) in filteredStudents(2, 6)" :key="item.id">
          <v-card class="mb-4 pr-2">
            <v-card-text>
              <span class="mr-2">
                {{ index + Math.ceil(organizedStudents.length / 6) * 2 - 3 }}
              </span>
              <v-avatar v-if="item.image">
                <v-img :src="item.image" class="avatar" />
              </v-avatar>
              <v-avatar color="rgb(0, 174, 255)" v-else>
                <v-icon dark size="30">mdi-account-circle</v-icon>
              </v-avatar>
              <div
                style="display: inline-block; color:#00aeff"
                class="pl-6 pts"
              >
                <b>{{ item.points }} pts</b>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col class="lb-col">
        <div v-for="(item, index) in filteredStudents(3, 6)" :key="item.id">
          <v-card class="mb-4 pr-2">
            <v-card-text>
              <span class="mr-2">
                {{ index + Math.ceil(organizedStudents.length / 6) * 3 - 4 }}
              </span>
              <v-avatar v-if="item.image">
                <v-img :src="item.image" class="avatar" />
              </v-avatar>
              <v-avatar color="rgb(0, 174, 255)" v-else>
                <v-icon dark size="30">mdi-account-circle</v-icon>
              </v-avatar>
              <div
                style="display: inline-block; color:#00aeff"
                class="pl-6 pts"
              >
                <b>{{ item.points }} pts</b>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col class="lb-col">
        <div v-for="(item, index) in filteredStudents(4, 6)" :key="item.id">
          <v-card class="mb-4 pr-2">
            <v-card-text>
              <span class="mr-2">
                {{ index + Math.ceil(organizedStudents.length / 6) * 4 - 5 }}
              </span>
              <v-avatar v-if="item.image">
                <v-img :src="item.image" class="avatar" />
              </v-avatar>
              <v-avatar color="rgb(0, 174, 255)" v-else>
                <v-icon dark size="30">mdi-account-circle</v-icon>
              </v-avatar>
              <div
                style="display: inline-block; color:#00aeff"
                class="pl-6 pts"
              >
                <b>{{ item.points }} pts</b>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col class="lb-col">
        <div v-for="(item, index) in filteredStudents(5, 6)" :key="item.id">
          <v-card class="mb-4 pr-2">
            <v-card-text>
              <span class="mr-2">
                {{ index + Math.ceil(organizedStudents.length / 6) * 5 - 6 }}
              </span>
              <v-avatar v-if="item.image">
                <v-img :src="item.image" class="avatar" />
              </v-avatar>
              <v-avatar color="rgb(0, 174, 255)" v-else>
                <v-icon dark size="30">mdi-account-circle</v-icon>
              </v-avatar>
              <div
                style="display: inline-block; color:#00aeff"
                class="pl-6 pts"
              >
                <b>{{ item.points }} pts</b>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col class="lb-col">
        <div v-for="(item, index) in filteredStudents(6, 6)" :key="item.id">
          <v-card class="mb-4 pr-2">
            <v-card-text>
              <span class="mr-2">
                {{ index + Math.ceil(organizedStudents.length / 6) * 6 - 7 }}
              </span>
              <v-avatar v-if="item.image">
                <v-img :src="item.image" class="avatar" />
              </v-avatar>
              <v-avatar color="rgb(0, 174, 255)" v-else>
                <v-icon dark size="30">mdi-account-circle</v-icon>
              </v-avatar>
              <div
                style="display: inline-block; color:#00aeff"
                class="pl-6 pts"
              >
                <b>{{ item.points }} pts</b>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    students: Array,
  },
  data: () => ({
    organizedStudents: [],
  }),
  created() {
    this.organizeStudents();
  },
  methods: {
    organizeStudents() {
      this.organizedStudents = this.$props.students.sort((a, b) => {
        if (a.points < b.points) {
          return 1;
        } else {
          return -1;
        }
      });
      this.organizedStudents.forEach((student, i) => {
        this.organizedStudents[i].suffix = this.nth(i + 1);
      });
    },
    nth(n) {
      return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
    },
    leaderBoardColor(index) {
      let color = index === 1 ? "#B08D57" : "#BEC2CB";
      return color;
    },
    filteredStudents(column, columns) {
      console.log(columns)
      const self = this;
      const total = this.organizedStudents.length - 3;
      const gap = Math.ceil(total / columns);
      let top = gap * column;
      const bottom = top - gap;
      top -= 1;
      return self.organizedStudents
        .slice(3)
        .filter(
          (item) =>
            self.organizedStudents.slice(3).indexOf(item) >= bottom &&
            self.organizedStudents.slice(3).indexOf(item) <= top
        );
    },
  },
};
</script>

<style>
td,
th {
  border: none !important;
}

#first {
  background: #fcb12b !important;
}

#first > div > span {
  color: #fff;
}
#first > div > div > b {
  color: #fff;
}

.leader-row {
  justify-content: space-evenly;
  margin: 0px auto 10px auto;
}

.leader-card {
  /* display: flex;
  justify-content: space-evenly; */
  padding: 15px;
  width: 500px;
}

.leader-col {
  margin-top: -10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-end;
}

@media only screen and (max-width: 750px) {
  .lb-col {
    flex-basis: auto !important;
    padding: 0 !important;
    padding-right: 12px !important;
    padding-left: 12px !important;
  }

  .pts {
    float: right;
    margin-right: 20px;
    margin-top: 10px;
  }
}
</style>
