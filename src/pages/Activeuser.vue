<template>
  <div class="main">
    <filemenu></filemenu>
    <div class="container">
      <date-picker class="datepicker" :lang="lang" v-model="time" format="YYYY-MM-DD" ></date-picker>
      <datewiser></datewiser>
    </div>
    <div id="activeuser">Right Now<br><b style="font-size:40px;">40</b><br>Active Users On Site</div>
    <chartjs-line style="margin-left:40px;" ref="mychart" :option="myoption" id="canvas" :height="120" v-if="mylabels" :labels="mylabels" :datasets="mydatasets" :bind="true"></chartjs-line>
    <img :src="myimg" v-if="myimg">
    <div>
      <h5 style="margin:20px 0;">TopPageViews</h5>
    </div>
    <table id="customers">
      <tr>
        <th>Number</th>
        <th>User Name</th>
        <th>Page</th>
        <th>PageViews</th>
      </tr>
      <tr v-if="tabledata" v-for="(row,index) in tabledata" v-bind:key="index">
        <td>{{row.number}}</td>
        <td>{{row.username}}</td>
        <td>{{row.page}}</td>
        <td>{{row.pageviews}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import FileMenu from '../components/File-Menu'
import DateWiseMenu from '../components/Datewise-Menu'
export default {
    data(){
        return{
            activemenu:null,
            time: '',
            showmenu:false,
            mylabels: null,
            mydatasets:null,
            tabledata:null,
            myimg:null,
            myoption:null,
            lang: {
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
                placeholder: {
                date: 'Select Date',
                dateRange: 'Select Date Range'
                },
            }
        }
    },
    components:{
        DatePicker,
        'filemenu':FileMenu,
        'datewiser':DateWiseMenu
    },
    mounted(){
      this.mylabels = null;
      this.axios.get('activeuser.json').then((response) => {
        var self = this;
        setTimeout(function(){
                self.mylabels = response.data.mylabels;
                self.mydatasets = response.data.mydatasets;
        }, 400);
      });
      this.axios.get('activeusertable.json').then((response)=>{
        this.tabledata = response.data.pageviews;
      });
      var vm = this;
      this.myoption = {
            onClick:function(evt){
                if(this.getElementAtEvent(evt).length == 0)
                {
                  return;
                }
                if(this.getElementAtEvent(evt)[0]._datasetIndex == 1){
                  vm.$router.push({ path: '/explore' })    
                }
              }
            };
    }
}
</script>
<style scoped>
.main{
  position: relative;
}
#customers td, #customers th {
    /*border: 1px solid #ddd;*/
    padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: rgb(94, 94, 94);
    color: white;
}
table{
    margin-bottom: 30px;
}
.container{
  display: inline-block;
  width: 100%;
  text-align: right;
  margin-bottom: 20px;
}
.container .datepicker{
  float: right;
}
#activeuser{
  position:absolute;
  top:23%;
  left:-10%;
  text-align: center;
  font-size: 1.0vw;
}
@media(max-width:900px){
  #activeuser{
    left:-13%;
  }
}
</style>

