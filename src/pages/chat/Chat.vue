<template>
	<div class="chat-container">
		<div class="flex column justify-between no-wrap" style="height: calc(100vh - 52px)">
			<div 
				class="q-mx-auto q-my-sm" 
				style="width: 100%; max-width: 360px"
			>
				<div v-for="(item, index) in allMessage" :key="index">
					<q-chat-message
						v-if="item.user.name !== currentUser"
						:name="item.user.name"
						:text="[`${item.message}`]"
						stamp="7 minutes ago"
						bg-color="purple-2"
					/>
					<q-chat-message
						v-else
						:text="[`${item.message}`]"
						:name ="currentUser" 
						sent
						:stamp="item.stamp"
					/>
				</div>
			</div>
			<div class="row justify-center q-mx-auto" style="width: 100%; max-width: 360px">
				<q-input 
					class="col-10"
					outlined 
					rounded
					v-model="newMessage" 
					placeholder="Type message" 
					:dense="false" 
					@keyup.enter="sendMessage"
				/>
				<div class="col-1 q-ml-sm q-my-md">
					<q-btn 
						round 
						color="primary" 
						icon="ion-send" 
						@click="sendMessage"
					/>
				</div>
			</div>
		</div>
	</div>	
</template>

<script>
const url = "http://192.168.0.18:8000/api"
import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');
window.Echo = new Echo({
	broadcaster: 'pusher',
	key: 'anykey',
	wsHost: '192.168.0.18',
	wsPort: 6001,
	forceTLS: false,
	disableStats: true
})


export default {
	data() {
		return {
			newMessage: '',
			activeUsers: [],
			sendMessages: [],
			receivedMessages: [],
			allMessage: [],
			currentUser: ''
		}
	},
	mounted() {
	},
	created() {
		this.currentUser = this.$q.localStorage.getItem('auth').name;	
		this.fetchMessage();


		window.Echo.channel('chat')
			.listen('NewMessage', event => {
				this.allMessage.push(event.message);
			})
	},
	methods: {
		sendMessage() {
			const formData = new FormData()
			formData.append('message', this.newMessage)

			this.$axios.post(`${url}/send-message?user=${this.currentUser}`, formData , {
				headers: {
					Authorization: 'Bearer' + this.$q.localStorage.getItem('auth').access_token,
					Accept: 'application/json',
					'Content-type': 'application/json'
				}
			})	
				.then( res => {
					console.log('ok')
					this.newMessage= ''
				})
				.catch( err => {
					console.log(err)
				})
		},
		fetchMessage() {
			this.$axios.get(`${url}/fetch-messages?other=${this.$route.params.id}`, {
				headers: {
					Autorization: 'Bearer' + this.$q.localStorage.getItem('auth').access_token
				}
			})	
				.then( res => {
					this.allMessage  = res.data.message
				})
				.catch( err => {
					console.log(err)
				})
		}
	}
}
</script>
<style lang="scss">
.chat-container{
	.q-field__control{
		height: 40px !important;
	}
	.q-field--outlined .q-field__control::after{
		border: none !important;
	}
}
</style>