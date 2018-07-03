<template>
  <div class="main">
      <filemenu></filemenu>
    <div class="container">
      <date-picker class="datepicker" :lang="lang" v-model="time" format="YYYY-MM-DD" ></date-picker>
      <datewiser></datewiser>
    </div>
    <chartjs-line ref="mychart" id="canvas" :option="myoption" :height="110" v-if="mylabels" :labels="mylabels" :datasets="mydatasets" :bind="true">
      
    </chartjs-line>
    <h4 id="maintitle">Number of users over month</h4>
    <h4 id="xtitle">month</h4>
    <h4 id="ytitle">Number of<br> users</h4>
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
  import html2canvas from 'html2canvas'
  import * as jsPDF from 'jspdf'
  import FileMenu from '../components/File-Menu'
  import DateWiseMenu from '../components/Datewise-Menu'
  export default {
    components:{
      DatePicker,
      'filemenu':FileMenu,
      'datewiser':DateWiseMenu
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
                  vm.$router.push({ path: 'activeuser' })
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
.main{
  position: relative;
}
#maintitle{
  position:absolute;
  left: 40%;
}
#xtitle{
  position:absolute;
  left:90%;
}
#ytitle{
  position: absolute;
  top:35%;
  left: -6%;
}
</style>
