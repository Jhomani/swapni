<template>
	<div>
		<q-list class="q-mt-sm">
      <q-item 
				v-for="user in users" :key="user.id"	
				:to="`/chat/${user.id}`" clickable
			>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ user.name }}</q-item-section>
				<q-item-section side center>
          1 min ago
        </q-item-section>
      </q-item>
		</q-list>
	</div>
</template>

<script>
const url = "http://192.168.0.18:8000/api"
export default {
	data() {
		return { 
			users:[]
		}
	},
	created() {
		this.fetchUsers()
	},
	methods: {
		fetchUsers() {
			this.$axios.get(`${url}/fetch-users`, {
				headers: {
					Autorization: 'Bearer' + this.$q.localStorage.getItem('auth').access_token
				}
			})	
				.then( res => {
					this.users= [ ...res.data.message ]

					this.users = res.data.message.filter(item => item.name !== this.$q.localStorage.getItem('auth').name)
				})
				.catch( err => {
					console.log(err)
				})
		}
	}
}
</script>

<style>

</style>
