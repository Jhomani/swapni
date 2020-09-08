<template>
	<div class="register-container">
		<div style="height: 100vh" class="flex justify-center content-center">
			<q-form @submit="handleRegister" class="q-gutter-md">
				<q-input 
					outlined
					rounded
					type="text"
					placeholder="User Name"
					bg-color="white"
					v-model="form.name"
				/>	
				<q-input 
					outlined
					rounded
					type="email"
					placeholder="Email"
					bg-color="white"
					v-model="form.email"
				/>	
				<q-input 
					outlined
					rounded
					bg-color="white"
					type="password"
					placeholder="Password"
					v-model="form.password"
				/>	
				<div class="full-width">
					<q-btn type="submit" class="q-mx-auto block text-capitalize" color="primary" rounded label="Submit" />
				</div>
			</q-form>	
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
				email: '',
				password: ''
			}
		}
	},
	methods: {
		handleRegister() {
			this.$axios.post('http://192.168.0.18:8000/api/register', this.form)
				.then( res => {
					this.$q.localStorage.set('auth', {
						access_token: res.data.access_token,
						name: res.data.name,
						login: true
					})
					
					this.$router.push('/')
				})
				.catch( err => {
					console.log(err)
				})

		}
	}
}
</script>
<style lang="scss">
.register-container{
	background: url('https://i.imgur.com/TdsOKIO.jpg') no-repeat fixed center;
	background-size: cover;
	.q-field__control{
		height: 40px !important;
	}
	.q-field--outlined .q-field__control::after{
		border: none !important;
	}
}
</style>