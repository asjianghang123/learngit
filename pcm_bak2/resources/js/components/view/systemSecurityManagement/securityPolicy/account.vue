<template>
	<el-form ref="form" :model="form" label-position="left" label-width="auto" :action="action">
		 <el-form-item v-for="(item, index) in accoutPolicy" :label="item.label" :key="index">
			<el-row>
				<el-col :offset="4" :span="10">
					<el-input-number v-model="item.num" controls-position="right" @change="handleChange(item.num, item.label)" :min="item.min" size="small" :max="item.max" style="width: 60%;" :disabled="disabled[index]"></el-input-number>
					<el-checkbox v-if="item.required == 1 && item.label == '自动解锁时间(分钟):'" v-model="checked_1">永久锁定</el-checkbox>
					<el-checkbox v-if="item.required == 1 && item.label == '自动注销等待时间:'" v-model="checked_2">不限制</el-checkbox>
					<el-checkbox v-if="item.required == 1 && item.label == '用户非法登陆锁定次数:'" v-model="checked_3">系统管理员不锁定</el-checkbox>
					<el-checkbox v-if="item.required == 1 && item.label == '未登陆用户禁止使用服务的未登录天数:'" v-model="checked_4">启用</el-checkbox>
				</el-col>
			</el-row>
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		props: {

		},
		data() {
			return {
				form: {
				},
				accoutPolicy:[],
				checked_1: false,
				checked_2: false,
				checked_3: false,
				checked_4: false,
				disabled: [false, this.checked_1, false, this.checked_2, false, this.checked_4]
			}
		},
		watch: {
			checked_1(val){
				this.disabled[1] = val;
				this.$store.dispatch("AccoutPolicyChange", {
		        	num: "checked",
		        	label: "自动解锁时间(分钟):",
		        	required: val
		        });
				
			},
			checked_2(val){
				this.disabled[3] = val;
				this.$store.dispatch("AccoutPolicyChange", {
		        	num: "checked",
		        	label: "自动注销等待时间:",
		        	required: val
		        });
				
			},
			checked_3(val){
				this.$store.dispatch("AccoutPolicyChange", {
		        	num: "checked",
		        	label: "用户非法登陆锁定次数:",
		        	required: val
		        });
			},
			checked_4(val){
				this.disabled[5] = !val;
				this.$store.dispatch("AccoutPolicyChange", {
		        	num: "checked",
		        	label: "未登陆用户禁止使用服务的未登录天数:",
		        	required: val
		        });
				
			}
		},
		created() {
			this.$store.dispatch("AccoutPolicy");
			this.$store.dispatch("AccoutChecked");
		},
		computed: {
			action() {
				if (this.$store.getters.getloadAccoutPolicyStatus == 2) {
					this.accoutPolicy = this.$store.getters.getAccoutPolicy;
				}
				if (this.$store.getters.getloadaccoutchecked == 2) {
					this.checked_1 = !!this.$store.getters.getaccoutchecked["enable_lock"];
					this.checked_2 = !!this.$store.getters.getaccoutchecked["enable_auto_logout_waiting"];
					this.checked_3 = !!this.$store.getters.getaccoutchecked["enable_system_lock"];
					this.checked_4 = !!this.$store.getters.getaccoutchecked["unlogged_user_policy"];
				}
			}
		},
		methods:{
			handleChange(value, label) {
				this.$store.dispatch("AccoutPolicyChange", {
		        	num: value,
		        	label: label,
		        	required: false
		        });
		    }
		}
	}
</script>