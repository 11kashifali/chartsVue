<template>
  <div class="grid-container">
    <C-header></C-header>
    <C-left></C-left>
    <!-- <C-main></C-main> -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <C-right></C-right>
    <C-footer></C-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Left from './components/Left-Menu.vue';
import Right from './components/Right.vue';
import Footer from './components/Footer.vue';
export default {
  components:{
    'C-header':Header,
    'C-left':Left,
    'C-right':Right,
    'C-footer':Footer
  }
}
</script>
<style>
  .grid-container{
    display: grid;
    grid-template-columns: 20vw 70vw 6vw;
    overflow:hidden;
    grid-gap: 10px;
    /*grid-template-columns: 2fr 3fr 1fr;*/
  }
  .main{
    grid-column: 2/3;
    margin-left: 100px;
  }
  @media(max-width:900px){
    .main{
      grid-column:1/3;
    }
  }
  *{
    padding: 0;
    margin: 0;
    font-family: 'Nunito', sans-serif;
  }
  .fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
