<template>
	<div class="login-container">
		<div style="height: 100vh" class="flex justify-center content-center">
			<q-form @submit="handleLogin" class="q-gutter-md">
				<q-input 
					outlined
					rounded
					type="text"
					placeholder="User name o Email"
					bg-color="white"
					v-model="form.user"
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
					<q-btn 
            class="q-mx-auto block text-capitalize" 
            color="primary" 
            rounded 
            label="Submit" 
            type="submit"
          />
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
				user: '',
				password: ''
			}
		}
	},
	methods: {
		handleLogin() {
      let name = null
      let email = null
      if(this.form.user.match('@')){
        email = this.form.user; 
      } else {
        name = this.form.user; 
      }
			this.$axios.post('http://192.168.0.18:8000/api/login', { name, email, password: this.form.password })
				.then( res => {
					this.$q.localStorage.set('auth', {
						access_token: res.data.access_token,
						name: res.data.name,
						login: true,
						expires_at: res.data.expires_at
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
.login-container{
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
