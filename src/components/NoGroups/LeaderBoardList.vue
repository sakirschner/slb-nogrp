<template>
  <div>
    <v-row class="leader-row">
      <v-card class="leader-card mb-2" style="text-align:center">
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
              <v-icon dark size="100">mdi-account-circle</v-icon>
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
      <v-col v-for="index in columns" :key="index" class="lb-col">
        <div
          v-for="(item, index1) in filteredStudents(index, columns)"
          :key="item.id"
        >
          <v-card class="mb-4 pr-2" style="padding:0 !important">
            <v-card-text class="pr-2" style="padding:10px !important">
              <span class="mr-2" v-if="index === 1">{{ index1 + 4 }}</span>
              <span
                class="mr-2"
                v-else-if="
                  (organizedStudents.length - 3) % columns === 0 &&
                    index > 1 &&
                    filteredStudents(index, columns).length < 4
                "
                >{{
                  index1 +
                    Math.ceil((organizedStudents.length - 3) / columns) *
                      index +
                    1
                }}</span
              >
              <span
                class="mr-2"
                v-else-if="
                  (organizedStudents.length - 3) % columns === 0 &&
                    index > 1 &&
                    filteredStudents(index, columns).length === 4
                "
                >{{
                  index1 +
                    Math.ceil((organizedStudents.length - 3) / columns) * index
                }}</span
              >
              <span
                class="mr-2"
                v-else-if="
                  (organizedStudents.length - 3) % columns === 0 &&
                    index > 1 &&
                    filteredStudents(index, columns).length > 4
                "
                >{{
                  index1 +
                    Math.ceil((organizedStudents.length - 3) / columns) *
                      index -
                    1
                }}</span
              >
              <span
                class="mr-2"
                v-else-if="
                  (organizedStudents.length - 3) % columns !== 0 &&
                    index > 1 &&
                    filteredStudents(index, columns).length !== 4 &&
                    colums === 3
                "
                >{{
                  index1 +
                    Math.ceil((organizedStudents.length - 3) / columns) * index
                }}</span
              >
              <span
                class="mr-2"
                v-else-if="
                  (organizedStudents.length - 3) % columns !== 0 &&
                    index > 1 &&
                    filteredStudents(index, columns).length === 4 &&
                    colums > 3
                "
                >{{
                  index1 +
                    Math.ceil((organizedStudents.length - 3) / columns) *
                      index -
                    1
                }}</span
              >
              <span
                class="mr-2"
                v-else-if="
                  (organizedStudents.length - 3) % columns !== 0 &&
                    index > 1 &&
                    filteredStudents(index, columns).length === 4 &&
                    columns >= 3
                "
                >{{
                  index1 +
                    Math.ceil((organizedStudents.length - 3) / columns) *
                      index -
                    1
                }}</span
              >
              <span
                class="mr-2"
                v-else-if="
                  (organizedStudents.length - 3) % columns !== 0 &&
                    index > 1 &&
                    filteredStudents(index, columns).length < 4 &&
                    columns >= 3
                "
                >{{
                  index1 +
                    Math.ceil((organizedStudents.length - 3) / columns) *
                      index -
                    1
                }}</span
              >
              <span
                class="mr-2"
                v-else-if="
                  (organizedStudents.length - 3) % columns !== 0 &&
                    index > 1 &&
                    filteredStudents(index, columns).length > 4 &&
                    columns >= 3
                "
                >{{
                  index1 +
                    Math.ceil((organizedStudents.length - 3) / columns) *
                      index -
                    1
                }}</span
              >
              <v-avatar class="ml-1" v-if="item.image">
                <v-img :src="item.image" class="avatar" />
              </v-avatar>
              <v-avatar class="ml-1" color="rgb(0, 174, 255)" v-else>
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
    columns: 0,
  }),
  created() {
    this.determineColumns();
    this.organizeStudents();
  },
  methods: {
    determineColumns() {
      const length = this.$props.students.length - 3;
      switch (true) {
        case length <= 5:
          this.columns = 1;
          break;
        case length > 5 && length <= 10:
          this.columns = 2;
          break;
        case length > 10 && length <= 15:
          this.columns = 3;
          break;
        case length > 15 && length <= 20:
          this.columns = 4;
          break;
        case length > 20 && length <= 25:
          this.columns = 5;
          break;
        case length > 25 && length <= 30:
          this.columns = 6;
          break;
      }
    },
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
  padding: 0px;
  padding-top: 10px;
  width: 500px;
}

.leader-col {
  margin-top: -10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-end;
}
  .pts {
    float: right;
    margin-right: 20px;
    margin-top: 10px;
  }

@media only screen and (max-width: 750px) {
  .lb-col {
    flex-basis: auto !important;
    padding: 0 !important;
    padding-right: 12px !important;
    padding-left: 12px !important;
  }
}
</style>