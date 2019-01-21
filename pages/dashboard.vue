<template>
	<div>
		<section class='section'>
			Hello, you are now logged in
			<hr />
			<a class="button is-danger" @click="logout()">Logout</a>
		</section>
	</div>
</template>

<script>

export default {
	middleware: 'auth',
	data(){
		return{
			step:0,
		}
	},
	methods:{
		logout() {
  			this.$auth.logout();
		}
	}

}
</script>

<style>
</style>
