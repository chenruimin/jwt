<template>
	<section class="section">
	<div class="container">
		<div class="columns is-centered">
		<div class="column is-4">
			<h2 class="title has-text-centered">Register!</h2>

			<div v-if="error" class='notification is-danger'> {{error}} </div>

			<form method="post" @submit.prevent="register">
			<div class="field">
				<label class="label">Email</label>
				<div class="control">
				<input type="email" class="input" name="email" v-model="email" required >
				</div>
			</div>
			<div class="field">
				<label class="label">Password</label>
				<div class="control">
				<input type="password" class="input" name="password" v-model="password" required>
				</div>
			</div>
			<div class="field">
				<label class="label">Again Your Password</label>
				<div class="control">
				<input type="password" class="input" name="password2" v-model="password2" required>
				</div>
			</div>
			<div class="control">
				<button type="submit" class="button is-dark is-fullwidth">Register</button>
			</div>
			</form>

			<div class="has-text-centered" style="margin-top: 20px">
			Already got an account? <nuxt-link to="/login">Login</nuxt-link>
			</div>
		</div>
		</div>
	</div>
	</section>
</template>

<script>
import axios from "axios"
export default {
	data() {
		return {
			email: '',
			password: '',
			password2: '',
			error: null
		}
	},

	methods: {
		register() {
			if (this.password !== this.password2){
				this.error="Passwords don't match!"
				return;
			}

				axios.post('/api/register', {
					email: this.email,
					password: this.password
				})
				.then(r => {
					this.$auth.loginWith('local', {
						data: {
							email: this.email,
							password: this.password
						}
					})
					this.$router.push('/dashboard/')
				})
				.catch(e => {
					this.error = e.response.data.message
			})
		}
	}
}
</script>
