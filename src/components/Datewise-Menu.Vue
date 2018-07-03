<template>
    <div v-on:click="showmenu=!showmenu" class="datewise">Monthly
        <ul v-show="showmenu" class="innermenu">
          <li>Daily</li>
          <li>Weekly</li>
          <li>Monthly</li>
        </ul>
      </div>
</template>
<script>
export default {
    data(){
        return{
            showmenu:false
        }
    }
}
</script>

<style scoped>
*{
    user-select: none;
}
.datewise{
  padding: 5px;
  color:rgba(29, 165, 255);
  float: right;
  margin-right: 10px;
  background: rgba(29, 165, 255, 0.226);
  border: 1px solid rgba(29, 165, 255);
  border-radius: 4px;
  cursor: pointer;
  position:relative;
}
.datewise ul{
  position: absolute;
  background-color: white;
  left: 0;
  top: 105%;
  width: 130%;
  border: 1px solid rgb(177, 177, 177);
  border-radius: 5px;
  color:black;
}
.datewise ul li{
  text-align: left;
  list-style: none;
  padding: 4px 6px;
}
.datewise ul li:hover{
    background-color: rgb(211, 211, 211);
}
</style>
