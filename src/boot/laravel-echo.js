import Vue from 'vue';
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

const echo = new Echo({
	broadcaster: 'pusher',
	key: 'anykey',
	wsHost: '192.168.0.18',
	wsPort: 6001,
	forceTLS: false,
	disableStats: true
})

Vue.prototype.$echo = echo;
