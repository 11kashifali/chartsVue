<template>
  <div class="main">
    <div class="container">
      <date-picker class="datepicker" :lang="lang" v-model="time" format="YYYY-MM-DD" ></date-picker>
      <div v-on:click="showmenu=!showmenu" class="datewise">Monthly
        <ul v-show="showmenu" class="innermenu">
          <li>Daily</li>
          <li>Weekly</li>
          <li>Monthly</li>
        </ul>
      </div>
    </div>
    <chartjs-line :option="myoption" :height="110" v-if="mylabels" :labels="mylabels" :datasets="mydatasets" :bind="true"></chartjs-line>
    <div>
      <h5 style="margin:20px 0;">TopPageViews</h5>
    </div>
    <table id="customers">
      <tr>
        <th>Number</th>
        <th>Page</th>
        <th>PageViews</th>
        <th>Avg Time on Page</th>
      </tr>
      <tr v-if="tabledata" v-for="(row,index) in tabledata" v-bind:key="index">
        <td>{{row.number}}</td>
        <td>{{row.page}}</td>
        <td>{{row.pageviews}}</td>
        <td>{{row.avgtimeonpage}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
  import 'chart.js'
  import DatePicker from 'vue2-datepicker'
  export default {
    components:{
      DatePicker
    },
    mounted() {
      this.mylabels = null;
      this.axios.get('dataforcharts.json').then((response) => {
        var self = this;
        setTimeout(function(){
                self.mylabels = response.data.mylabels;
                self.mydatasets = response.data.mydatasets;
        }, 400);
        var vm = this;
        this.myoption = {
            onClick:function(evt){
                if(this.getElementAtEvent(evt).length == 0)
                {
                  return;
                }
                if(this.getElementAtEvent(evt)[0]._datasetIndex == 0){
                  vm.$router.push({ path: '' })    
                }
                else if(this.getElementAtEvent(evt)[0]._datasetIndex == 1){
                  vm.$router.push({ path: 'explore' })
                }
                else if(this.getElementAtEvent(evt)[0]._datasetIndex == 2){
                  vm.$router.push({ path: 'realuser' })
                }
                else if(this.getElementAtEvent(evt)[0]._datasetIndex == 3){
                  vm.$router.push({ path: 'returninguser' })
                }
                else if(this.getElementAtEvent(evt)[0]._datasetIndex == 4){
                  vm.$router.push({ path: 'bots' })
                }
              }
            };
      })
      this.axios.get('table.json').then((response) =>{
          this.tabledata = response.data.pageviews;
      })
    },
    data() {
      return {
        showmenu:false,
        time: '',
        lang: {
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
        placeholder: {
          date: 'Select Date',
          dateRange: 'Select Date Range'
        }
      },
        mylabels: null,
        mydatasets: null,
        tabledata:null,
        myoption:null
      };
    },
  }

</script>

<style scoped>
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
  padding: 5px;
  left: 0;
  top: 105%;
  width: 120%;
  border: 1px solid rgb(177, 177, 177);
  border-radius: 5px;
  color:black;
}
.datewise ul li{
  text-align: left;
  list-style: none;
}
</style>
