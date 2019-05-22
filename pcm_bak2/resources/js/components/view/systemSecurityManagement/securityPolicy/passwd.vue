<template>
	<el-form ref="form" :model="form" label-position="left" label-width="auto" :action="action">
		<el-form-item v-for="(item, index) in passwdPolicy" :label="item.label" :key="index">
			<el-row>
				<el-col :offset="4" :span="12">
					<el-input-number v-model="item.num" controls-position="right" @change="handleChange(item.num, item.label)" :min="item.min" size="small" :max="item.max" style="width: 60%" :disabled="disabled[index]"></el-input-number>
					<el-checkbox v-if="item.required == 1 && item.label == '密码必须使用的最短天数:'" v-model="checked_1">不限制</el-checkbox>
					<el-checkbox v-if="item.required == 1 && item.label == '密码有效天数:'" v-model="checked_2">不限制</el-checkbox>
					<el-checkbox v-if="item.required == 1 && item.label == '密码不能与最近历史密码相同的个数:'" v-model="checked_3">启用</el-checkbox>
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
				passwdPolicy: [],
				checked_1: false,
				checked_2: false,
				checked_3: false,
				disabled: [false, false, false, false, this.checked_2, this.checked_1, false, !this.checked_3]
			}
		},
		watch: {
			checked_1(val){
				this.disabled[5] = val;
				this.$store.dispatch("PasswdPolicyChange", {
		        	num: "checked",
		        	label: "密码必须使用的最短天数:",
		        	required: val
		        });
			},
			checked_2(val){
				this.disabled[4] = val;
				this.$store.dispatch("PasswdPolicyChange", {
		        	num: "checked",
		        	label: "密码有效天数:",
		        	required: val
		        });
			},
			checked_3(val){
				this.disabled[7] = !val;
				this.$store.dispatch("PasswdPolicyChange", {
		        	num: "checked",
		        	label: "密码不能与最近历史密码相同的个数:",
		        	required: val
		        });
			}
		},
		created() {
			this.$store.dispatch("PasswdPolicy");
			this.$store.dispatch("PasswdChecked");
		},
		computed: {
			action() {
				if (this.$store.getters.getloadPasswdPolicyStatus == 2) {
					this.passwdPolicy = this.$store.getters.getPasswdPolicy;
				}
				if (this.$store.getters.getloadcheckedvalueStatus == 2) {
					this.checked_1 = !!this.$store.getters.getcheckedvalue["enable_passwd_used_shortest_days"];
					this.checked_2 = !!this.$store.getters.getcheckedvalue["enable_passwd_valid_days"];
					this.checked_3 = !!this.$store.getters.getcheckedvalue["enable_passwd_norepeated_latest_num"];
				}
			}
		},
		methods:{
			handleChange(value, label) {
				this.$store.dispatch("PasswdPolicyChange", {
		        	num: value,
		        	label: label,
		        	required: false
		        });
		    }
		}
	}
</script>0