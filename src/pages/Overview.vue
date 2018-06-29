<template>
  <div class="main">
    <chartjs-line :height="110" v-if="mylabels" :labels="mylabels" :datasets="mydatasets"></chartjs-line>
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
  import 'chart.js';
  export default {
    mounted() {
      this.mylabels = null;
      this.axios.get('dataforcharts.json').then((response) => {
        console.log(response.data)
        var self = this;
        setTimeout(function(){
                self.mylabels = response.data.mylabels;
                self.mydatasets = response.data.mydatasets;
        }, 400);
        
      })
      this.axios.get('table.json').then((response) =>{
          this.tabledata = response.data.pageviews;
      })
    },
    data() {
      return {
        mylabels: null,
        mydatasets: null,
        tabledata:null
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
</style>
