<template>
    <div id="self-wrap" class="slef-wrap">
        <transparent-nav></transparent-nav>

        <div class="slef-background hasTips" id="slef-background">
            <img :src="selfMes.bodyImg" >
       

            <div class="memo">
                <div class="cont">
                    <p class="name">设计师说</p>

                    <p class="brief">{{selfMes.brief}}</p>
                </div>
            </div>
        </div>

    </div>
</template>
<style >
.hasTips {
    padding-top:.5rem;
    height: 100%;;
}
.imgWrap img {
    width: 100%;
}

.slef-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.playerButton {
    position: absolute;
    width: 100%;
    top: 46%;
    left: 0%;
    z-index: 999;
}

.playerButton .playerBtn {

    width: .6rem;
    margin: 0 0 0 .3rem;
    background: url('../../../static/images/video.png');
    background-size: 100% 100%;
    height: .6rem;
}


.slef-wrap .hasTips .brief {
    margin-top: .2rem;
}

.slef-background img {
    width: 100%;
}

.slef-wrap .video-js .vjs-tech {
    height: auto;
}
.hasTips .score {
    width: .6rem;
    padding-left: .2rem;
}
.hasTips {
    position: relative;
}

.hasTips .memo {
    position: absolute;
    width: 100%;
    height: 2rem;
    bottom:0;
    color: #fff;
    text-align: left;
    z-index: 99;
    background: transparent;
}


.hasTips .memo p {
    margin: .1rem .2rem 0 .2rem;
    line-height: 1.5em;
    font-size: 14px;
}

.hasTips .memo .price {
    margin-top: 0;
}

.hasTips .memo .name {
    font-size: 26px;
}

.hasTips {
    position: relative;
}
.hasTips .memo {
    position: absolute;
    width: 100%;
    height: 2rem;
    bottom: 0;
    color: #fff;
    text-align: left;
    z-index: 99;
    background: transparent;
    background: url('../../../static/images/videoBg.png');
    background-size: 100% 100%;
}
.hasTips .score img {
    width: 100%;
}
</style>
<script>
import transparentNav from "../detailNav/transparentNav";

export default {
    components: {  transparentNav },
    props: ['selfMes'],
    data() {

        return {
            case_id: 1,

        }
    },

  
    computed: {

    },
    methods: {


    }
}
</script>

