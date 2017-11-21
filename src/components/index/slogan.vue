<template>
	<div class="slogan-c">
		<div class="slogan-logo">
		</div>
		<div class="slogan-title">
			设计师严选平台
		</div>
		<router-link to="/aboutUs" tag="span" class="more">
			了解更多
		</router-link>
		
	</div>
</template>
<script>
	export default{
		
	}
</script>
<style scoped="scoped">
	.slogan-c:after{
		content:" ";
		display:block;
		height:0.09rem;
		background: #f4f4f4;
	}
	.slogan-logo{
		height: 0.44rem;
		background-image: url(../../../static/images/logo.png);
		background-repeat:no-repeat;
		background-position: center;
		background-size:.44rem;
		margin-top: 0.19rem;
		margin-bottom: 0.16rem;
	}
	.slogan-title{
		color:#000;
		font-size:0.18rem;
		text-align: center;
		margin-bottom: 0.09rem;
		font-weight:bold ;
	}
	 .more{
		display: block;
		text-align: center;
		margin-bottom:.2rem;
	}
</style>