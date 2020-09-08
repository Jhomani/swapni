<template>
	<div class="chat-container">
		<div class="flex column justify-between" style="height: calc(100vh - 52px)">
			<div class="q-mx-auto q-my-sm" style="width: 100%; max-width: 360px">
				<q-chat-message
					v-for="(item, index) in receivedMessages" :key="index"
					:name="item.user.name"
					:text="[`${item.message}`]"
					stamp="7 minutes ago"
					bg-color="purple-2"
				/>
				<q-chat-message
					v-for="(item, index) in messages" :key="index"
					:text="[`${item.message}`]"
					name = 'me'
					sent
					:stamp="item.stamp"
				/>
			</div>
			<div class="row justify-center">
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
export default {
	data() {
		return {
			newMessage: '',
			activeUsers: [],
			messages: [
			],
			receivedMessages: [
			]
		}
	},
	mounted() {
		this.$echo.join('chat')
			.here( user => {
				this.activeUsers = user;
			})
			.joining(user => {
				// ...
			})
			.leaving(user => {
				// ...
			})
			.listen('NewMessage', event => {
				this.messages.push(this.event.message);
			})
	},
	methods: {
		sendMessage() {
			const formData = new FormData()
			formData.append('message', this.newMessage)

			console.log(this.$q.localStorage.getItem('auth').access_token)

			this.$axios.post(`${url}/send-message`, formData , {
				headers: {
					Authorization: 'Bearer' + this.$q.localStorage.getItem('auth').access_token,
					Accept: 'application/json',
					'Content-type': 'application/json'
				}
			})	
				.then( res => {
					console.log('ok')
					this.messages.push({ message: this.newMessage, stamp: '1 minutes ago' })
					this.newMessage= ''
				})
				.catch( err => {
					console.log(err)
				})
		},
		fetchMessage() {
			this.$axios.get(`${url}/fetch-messages`, {
				headers: {
					Autorization: 'Bearer' + this.$q.localStorage.getItem('auth').access_token
				}
			})	
				.then( res => {
					this.receivedmessages = res.data
				})
				.catch( err => {
					console.log(err)
				})
			this.messages.push({ message: this.newMessage, stamp: '1 minutes ago' })
			this.newMessage= ''
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
