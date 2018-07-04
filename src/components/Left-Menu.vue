<template>
    <div class="left-menu">
        <ul>
            <li v-on:click="hidechild()"><router-link to="/"> Overview</router-link></li>
            <li v-on:click="activeuser=!activeuser"><router-link  to="/activeuser">Active User</router-link><div class="tri"></div></li>
            <li v-show="activeuser"><router-link to="/explore">Explore</router-link>
            <li v-on:click="hidechild()"><router-link to="/realuser">Real User</router-link></li>
            <li v-on:click="hidechild()"><router-link to="/returninguser">Returning User</router-link></li>
            <li v-on:click="hidechild()"><router-link to="/bots">Not Real User</router-link></li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeuser:null
        };
    },
    methods:{
        hidechild(){
            this.activeuser = false;
        }
    }
}
</script>

<style scoped>
    .left-menu{
        grid-column: 1/2;
    }
    @media (max-width:900px){
        .left-menu{
            grid-column: 1/4;
        }
        ul{
            height: 100%;
        }
    }
    .left-menu>ul>li{
        list-style: none;
        padding:3px;
        border-bottom: 0;
        position: relative;
    }
    .left-menu>ul>li:hover{
        background: rgb(211, 211, 211);
    }
    .left-menu>ul>li>a{
        width:100%;
        text-decoration: none;
        display: block;
        color:black;
    }
    .left-menu>ul>li:nth-child(3){
        padding-left: 10%;
    }
    .tri{
        background: black;
        clip-path: polygon(0 0, 100% 0, 50% 100%, 50% 100%);
        width: 10px;
        height: 8px;
        position: absolute;
        left: 80%;
        top: 33%;
    }
    ul{
        margin:30px 10px;
        background: whitesmoke;
        width: 100%;
        height: 70vh;
    }
</style>