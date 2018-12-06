var spanPrev = document.querySelector("#prev");
var spanNext = document.querySelector("#next");
var spanFirst = document.querySelector("#first");
var spanLast = document.querySelector("#last");

// Pagination vars
var curr_row = 0;
var rowsperpage = 50;
var pan_pos = 1;
var len = 0;

// Single
var addUFOBtn = document.querySelector("#add-ufo");
var UFOInput = document.querySelector("#ufo-input");

// Multi vars
var addUFOMultiBtn = document.querySelector("#add-ufo2");
var UFOInput1 = document.querySelector("#ufo-input1");
var UFOInput2 = document.querySelector("#ufo-input2");
var UFOInput3 = document.querySelector("#ufo-input3");
var UFOInput4 = document.querySelector("#ufo-input4");
var UFOInput5 = document.querySelector("#ufo-input5");

var ddtime = "";
var city = "";
var state = "";
var country = "";
var shape = "";

// Table tag
var UFOList = document.querySelector("#ufo-list");

var SearchData=[]

function showTable(){

  // Extract value for Html Header
  if ((SearchData.length/rowsperpage)>parseInt(SearchData.length/rowsperpage)){
      len=parseInt(SearchData.length/rowsperpage)+1;
  }
  else{
      len=parseInt(SearchData.length/rowsperpage);
  }

  UFOList.innerHTML="";
  var col = [];
  for (var i = 0; i < SearchData.length; i++) {
    for (var key in SearchData[i]) {
      if (col.indexOf(key) === -1) {
          col.push(key);
      }
    }
  }

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED

  var tr = table.insertRow(-1);

  for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");
      th.innerHTML = col[i];
      UFOList.appendChild(th);
  }

  var  inpage_row=0;

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = curr_row; i < SearchData.length; i++)

    tr = table.insertRow(-1);
    UFOList.appendChild(tr);

    if(inpage_row<rowsperpage){
      for (var j = 0; j < col.length; j++) {
              var tabCell = tr.insertCell(-1);
              tabCell.innerHTML = SearchData[i][col[j]];
              UFOList.appendChild(tabCell);
          }
      inpage_row=inpage_row+1;
    }
    else{
          curr_row=i;
          break
    }
  }
}

  function createUFOtb1() {

    curr_row = 0;
    pan_pos = 1;
    SearchData = [];
    for (var i = 0; i < UFOdata.length; i++)
    {
          SearchData.push(UFOdata[i]);
    }

    showTable();
}

addUFOBtn.addEventListener("click", function(event) {

  curr_row = 0;
  pan_pos = 1;
  dttime = UFOInput.value;
  SearchData=[];
  for (var i = 0; i < UFOdata.length; i++) {
        if (UFOdata[i]["datetime"]==dttime || dttime=="")
      {
            SearchData.push(UFOdata[i]);
      }

  }

  UFOInput.value ="";
  showTable();

});

addUFOMultiBtn.addEventListener("click", function(event) {

  curr_row = 0;
  pan_pos = 1;
  dttime = UFOInput1.value;
  city = UFOInput2.value;
  state = UFOInput3.value;
  country = UFOInput4.value;
  shape = UFOInput5.value;

  SearchData=[];
  for (var i = 0; i < UFOdata.length; i++) {
      if ((UFOdata[i]["datetime"]==dttime || dttime) &&
            (UFOdata[i]["city"].toUpperCase()==city.toUpperCase() || city=="") &&
            (UFOdata[i]["state"].toUpperCase()==state.toUpperCase() || state=="") &&
            (UFOdata[i]["country"]toUpperCase()==country.toUpperCase() || country="") &&
            (UFOdata[i]["shape"].toUpperCase()==shape.toUpperCase() || shape=="")
            )
      {
          SearchData.push(UFOdata[i]);
      }
  }
  UFOInput1.value ="";
  UFOInput2.value ="";
  UFOInput3.value ="";
  UFOInput4.value ="";
  UFOInput5.value ="";
  showtable();
});

  spanPrev.addEventListener("click", function(event) {
      if (pan_pos>1){
          pan_pos-=1;
      }
      curr_row=(pan_pos*rowsperpage)-rowsperpage;
      showtable()
});

  spanNext.addEventListener("click", function(event) {
      if(pan_pos>=len){
         pan_pos=len;
      }
      else
      {
         pan_pos+=1;
      }
      curr_row=(pan_pos*rowsperpage)-rowsperpage;
      showtable()
});

  spanFirst.addEventListener("click", function(event) {
      pan_pos=1;
      curr_row=(pan_pos*rowsperpage)-rowsperpage;
      showtable()
});

  spanLast.addEventListener("click",function(event) {
      pan_pos=len;
      curr_row=(pan_pos*rowsperpage)-rowsperpage;
      showtable()
});

createUFOtb1();