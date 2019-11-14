
var arr = Array();
const inputElement = document.getElementById("xlf");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles(event) {
  // Excelsheet target point
  let excelSheet = event.target.files[0];

  // Reading the file using the default JS FileReader API
  let fileReader = new FileReader();
  // Loading the file on to the api to process
  fileReader.onload = e => {
    //   Reading API using Sheet.js in binary format
    let workbook = XLSX.read(e.target.result, { type: "binary" });
    //   JSON Object to store converted excelsheet
    let JSONContentObject = {};
    //   Looping through sheets for data
    workbook.SheetNames.forEach(function(sheetName) {
      // Calling Sheet.js function to convert it to JSON Object
      let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1
      });
      //   Checking if there is any data in the field
      if (data.length) JSONContentObject[sheetName] = data;

  
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i][0]);
     
      }
      // Get the ID where you want to display the iFrames
      var links = document.getElementById("list");
  
      for (let i = 0; i < arr.length; i++) {
        //Creating the element here
        const iframe = document.createElement("iframe");
        const button = document.createElement("button");
        iframe.className = `item${i}`;
        button.className = `item${i}`;

        iframe.setAttribute("id", i);
        
        //Just change it to onClick function assigning
        //So you can use the e which stands for event
        //And you will get that particular classname
        button.onclick = e => myFunction(e.target.className);
        

        //Assigning the URL to the iframe
        iframe.src = arr[i];
        
        //Appending or adding the URL to the (i)th iframe
        links.appendChild(iframe);
        links.appendChild(button);
      }
    });
  
  };
  // Running fileReader in Binary String Reader Mode
  fileReader.readAsBinaryString(excelSheet);
}

function myFunction(target) {
  // Get the elements you want to remove
  var x = document.getElementsByClassName(target);
   let l =x[0].parentNode.removeChild(x[0]);
     arr.pop(l);

  x[0] = "none";
  x[1]= "none";

}


saveFile.onclick = function(){
  var blob = new Blob([arr+"  "], {type:"text/plain"});
  saveAs(blob, "hello.txt");
};

