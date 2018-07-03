<template>
     <div class="menu" v-on:click="activemenu =!activemenu">
        <ul v-show="activemenu">
          <li v-on:click="print(4)">Print</li>
          <li v-on:click="print(1)">Png Img</li>
          <li v-on:click="print(2)">JPEG Img</li>
          <li v-on:click="print(3)">PDF Doc</li>
        </ul>
      </div>
</template>
<script>
import html2canvas from 'html2canvas'
import * as jsPDF from 'jspdf'
export default {
    data(){
        return{
            activemenu:false,
            myimg:null
        }
    },
    props:{
        mychart:null
    },
    methods:{
        print(option){
            var vm = this;
            var image;
            if(option == 1){
            html2canvas(document.getElementById("canvas")).then(function(canvas) {
            //vm.myimg = canvas;
            //document.getElementById("canvas").appendChild(canvas);
            var image = canvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");  
            var link = document.createElement('a');
            link.href = image;
            link.download = 'chart.png';
            document.body.appendChild(link);
            link.click();
            });
            }
            else if(option == 2){
            html2canvas(document.getElementById("canvas")).then(function(canvas) {
            var image = canvas.toDataURL("image/jpeg");
            var link = document.createElement('a');
            link.href = image;
            link.download = 'chart.jpeg';
            document.body.appendChild(link);
            link.click();
            });
            }
            else if(option == 3){
            var pdf = new jsPDF('l');
            html2canvas(document.getElementById("canvas")).then(function(canvas) {
            var image = canvas.toDataURL("image/jpeg");
            var link = document.createElement('a');
            pdf.addImage(image, 'JPEG', 30, 10);
            pdf.save("download.pdf");
            });
            }
            else{
            var mywindow = window;
            var pwa = window.open("about:blank", "_new");
            html2canvas(document.getElementById("canvas")).then(function(canvas) {
            vm.myimg = canvas.toDataURL("image/jpeg");
            vm.directprint();
            });
            setTimeout(()=>{
                pwa.document.open();
                pwa.document.write(this.ImagetoPrint(this.myimg));
                pwa.document.close();
            },2000);
           
            
            }
        },
        directprint(){
            
        },
        ImagetoPrint(source) {
            return "<html><head><script>function step1(){\n" +
                "setTimeout('step2()', 10);}\n" +
                "function step2(){window.print();window.close()}\n" +
                "</scri" + "pt></head><body onload='step1()'>\n" +
                "<img src='" + source + "' /></body></html>";
	      }
    }
}
</script>

<style scoped>
.menu{
  background:url('../assets/menu.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  float:right;
  position: relative;
  cursor: pointer;
}
.menu ul{
  list-style: none;
  position: absolute;
  width:160%;
  background-color: white;
  left:-150%;
  top:10%;
  z-index: 1;
  border: 1px solid rgb(163, 163, 163);
  border-radius: 5px;
  text-align: left;
  cursor: pointer;
}
.menu ul li{
  padding: 3px 5px;
}
.menu ul li:hover{
  background-color: rgb(211, 211, 211);
}
</style>

