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
import axios from 'axios'

import LeaderBoardList from '../../components/Daily/DailyLeaderBoardList'
import AchievementList from '../../components/AchievementList'

export default {
	components: {
		LeaderBoardList,
		AchievementList
	},
	data: () => ({
		students: {},
		achievements: [],
		stats: [],
		loading: true
	}),
	async created() {
		await this.getAllStudents()
	},
	mounted() {
		window.setInterval(() => {
			this.getAllStudents()
		}, 60000)
	},
	methods: {
		async getAllStudents() {
            this.loading = true
			let token = this.$store.state.auth.token
			if (token) {
				await axios
					.get(`${this.$store.state.url.url}/api/user/`, {
						headers: {
							Authorization: token
						}
					})
					.then((response) => {
						let studentList = []
						response.data.forEach((student) => {
							if (student.display) {
                                student.points = 0
								studentList.push(student)
							}
						})
						this.students = {
							students: studentList,
							changes: 0
						}
						this.getAchievements()
					})
			}
		},
		async getAchievements() {
			const token = this.$store.state.auth.token
			if (token) {
				await axios
					.get(
						`${this.$store.state.url.url}/api/achievement/studentachievements/`,
						{
							headers: {
								Authorization: token
							}
						}
					)
					.then((response) => {
						let achievements = response.data
						const today = new Date().toDateString()
						let todaysAchievements = []
						achievements.forEach((stat) => {
							let achievementDate = new Date(stat.created_at).toDateString()
							if (today === achievementDate) {
								todaysAchievements.push(stat)
							}
						})
						todaysAchievements.forEach((stat) => {
							stat.created_at =
								new Date(stat.created_at).toLocaleDateString('en-US') +
								' ' +
								new Date(stat.created_at).toLocaleTimeString('en-US')
						})
                        this.achievements = todaysAchievements
                        this.addPoints()
					})
            }
        },
        addPoints() {
            this.students.students.forEach((student) => {
                this.achievements.forEach((achievement) => {
                    if (student.id === achievement.student.id) {
                        console.log("match")
                        this.students.changes += 1
                        student.points += achievement.achievement.points
                    }
                })
            })
            this.loading = false
        }
	}
}
</script>

<style>
@media (min-width: 960px) {
	.container {
		max-width: 1200px !important;
	}
}
</style>
