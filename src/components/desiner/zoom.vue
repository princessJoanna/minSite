<template>
    <div id="zoom-wrap" class="zoom-wrap">
        <transparent-nav></transparent-nav>
        <div class="zoomBg  hasTips">
            
            <div class="wrap">
                <img :src="zoomMes.headImg">
            </div>
            <div class="memo">
    
                <div class="cont">
                    <p class="name">{{zoomMes.name}}</p>
                    <p class="price">报价:{{zoomMes.price}}-{{zoomMes.designer_high_price}}/平米</p>
                    <p class="brief">{{zoomMes.brief}}</p>
                </div>
            </div>
        </div>

    </div>
</template>
<style scoped>
.hasTips {
    padding-top:.5rem; 
    height: 100%;;
}
.hasTips .score img {
    width: 100%;
}

.zoomBg .wrap img {
    width: 100%;
}

.zoom-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.zoom-wrap .hasTips .memo .name {
    padding-bottom:.2rem;
}
</style>
<script>
var vm = null;
import transparentNav from "../detailNav/transparentNav";
export default {
    components: {  transparentNav },
    props: ['zoomMes'],
    data() {

        return {

        }
    },
    created(){
        
    }


}
</script>

