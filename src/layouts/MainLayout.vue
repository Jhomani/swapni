<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="!$route.meta.simpleHeader" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
				<q-space />
				<q-icon name="adb" style="font-size: 30px"/>
      </q-toolbar>
    </q-header>

    <div class="row full-width q-py-sm q-px-md" v-else>
        <q-btn 
					class="col-1" 
					icon="arrow_back_ios" 
					rounded
					flat
					@click="$router.go(-1)"
				/>
				<span 
					class="col-10 text-center self-center" 
				>
					Carlos
				</span>
    </div>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
			<div class="info-section flex column justify-center content-center">
				<q-avatar class="q-mb-sm" size="50px">
					<img src="https://cdn.quasar.dev/img/boy-avatar.png">
				</q-avatar>
				<span>@Carlos</span>
			</div>
      <q-list bordered>
				<q-item clickable v-ripple>
					<q-item-section avatar>
						<q-icon name="person"/>
					</q-item-section>
					<q-item-section>
						<div>My Information</div>
					</q-item-section>
				</q-item>
				<q-separator />
				<q-item to="/all-team" clickable v-ripple>
					<q-item-section avatar>
						<q-icon name="chat"/>
					</q-item-section>
					<q-item-section>
						<div>Chat Section</div>
					</q-item-section>
				</q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
			leftDrawerOpen: false
    };
  },
};
</script>
<style lang="scss">
.q-drawer {
	border-radius: 0 50px 50px 0;
	overflow: hidden;
	width: 250px !important;
	background: none;

	.info-section {
		height: 150px;
		background-image: linear-gradient(to bottom, #2f053b, #2b0428, #24031a, #19010d, #000000);
		color: #fff;
	}
}
</style>
