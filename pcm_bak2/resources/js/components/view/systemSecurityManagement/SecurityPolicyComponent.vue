<template>
	<div style="position: relative;top: 10px; margin: 0px 15px 0px 15px;" class="policy">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="密码策略" name="password">
				<passwd></passwd>
			</el-tab-pane>
			<el-tab-pane label="账户策略" name="account">
				<account></account>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<style>
	.policy .el-form-item__label {
		width: 300px!important;
	}
</style>
<script>
	import passwd from './securityPolicy/passwd.vue';
	import account from './securityPolicy/account.vue';
	export default {
		props: {

		},
		data() {
			return {
				activeName: 'password'
			}
		},
		created() {
			
		},
		components: {
			passwd,
			account
		},
		computed: {

		},
		methods:{
			handleClick(tab, event) {
		       
		    }
		}
	}
</script>