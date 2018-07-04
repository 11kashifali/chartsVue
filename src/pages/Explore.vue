<template>
    <div class="main">
        <filemenu></filemenu>
        <div class="container">
            <select name="clicks" id="clicks" aria-placeholder="Select ">
                <option value="" selected>Select No of Clicks</option>
                <option value="10">>10 times</option>
                <option value="50">>50 times</option>
                <option value="100">>100 times</option>
                <option value="200">>200 times</option>
            </select>
            <date-picker class="datepicker" :lang="lang" v-model="time" format="YYYY-MM-DD" ></date-picker>
            <datewiser></datewiser>
        </div>
        <chartjs-line style="margin-left:40px;" ref="mychart"  id="canvas" :height="150" v-if="mylabels" :labels="mylabels" :datasets="mydatasets" :bind="true"></chartjs-line>
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
import DatePicker from 'vue2-datepicker'
import FileMenu from '../components/File-Menu'
import DateWiseMenu from '../components/Datewise-Menu'
export default {
    data(){
        return{
            lang: {
                    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
                    placeholder: {
                    date: 'Select Date',
                    dateRange: 'Select Date Range'
                },
            },
            time:'',
            mylabels:null,
            mydatasets:null,
            tabledata:null
        }
    },
    components:{
        DatePicker,
        'filemenu':FileMenu,
        'datewiser':DateWiseMenu
    },
    mounted(){
        this.axios.get('activeexplore.json').then((response) => {
        var self = this;
        setTimeout(function(){
                self.mylabels = response.data.mylabels;
                self.mydatasets = response.data.mydatasets;
        }, 400);
        this.axios.get('table.json').then((response) =>{
            this.tabledata = response.data.pageviews;
        })
      });
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
    margin-top: 20px;
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
.container select{
    margin:0 10px;
    padding:7px;
}
</style>
