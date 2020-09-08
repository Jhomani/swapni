<template>
	<div>
		this is the index
	</div>
</template>
<script>
import axios from 'axios';

export default {
  data () {
    return {
			uploadPercentage: 0,
			message: '',
    }
	},
	created () {
		// this.$axios.get('http://192.168.0.18:8000/api/test')
		// 	.then(res => console.log(res))
	},
  methods: {
    uploadFile (file, updateProgress) {
      const fd = new FormData()
      fd.append('file', file)
      updateProgress(0)
      return new Promise((resolve, reject) => {
        this.$axios.post(process.env.api + '/upload',
          fd,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              updateProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100) / 100)
            }
          })
          .then(res => {
            resolve(file)
          })
          .catch(err => reject(err))
      })
    }
	},
	computed: {
		url() {
			
		}
	},
	mounted () {
	// 	window.Echo = new Echo({
	// 		broadcaster: 'pusher',
	// 		key: 'anykey',
	// 		wsHost: '192.168.0.18',
	// 		wsPort: 6001,
	// 		forceTLS: false,
	// 		disableStats: true
	// 	})

	// 	window.Echo.channel('MessageChannal').listen('NewMessage', (e) => {
	// 		this.message = e.message
	// 	})
	}
}
</script>
