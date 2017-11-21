<template>
	<div class="loading-c">
		<div class="loading" v-show="loading">正在拼命加载中....</div>
		<div v-if="isEnd">我也是有底线的</div>
	</div>
</template>

<script>
	import loading from "./loading"
	export default{
		props: ["params"],
		data(){
			return {
				loading:false,
				isEnd:false
			}
		},
		mounted(){
			loading.install(this,this.params);
		}
	}
	
</script>

<style scoped="scoped">
	.loading-c{
		height:.3rem;
		line-height: .3rem;
	}
	div{
		text-align: center;
		color:#636363;
	}
	.loading{
		/*font-size:50px;
		text-align: center;
		position: fixed;
		opacity: .5;
		width:100%;
		height:100%;
		top:0;
		left:0*/
	}
</style>