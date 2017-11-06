
var currentNode=null;
 var cartesian_func = function(data){
    let dataModel = new android.test.cartesian.DataModel(data);
    var chartlayout = new android.test.cartesian.ChartLayout(null);
    chartlayout.attachElement(document.getElementById("chart"),"Canvas", dataModel);
    // chartlayout.beginChartAnimation();
    return chartlayout;
}

var hierarchical_func = function(data){
    let dataModel = new android.test.hierarchical.DataModel(data);
    var chartlayout = new android.test.hierarchical.ChartLayout(null);
    chartlayout.attachElement(document.getElementById("chart"),"Canvas", dataModel);
    // chartlayout.beginChartAnimation();
    return chartlayout;
}
document.addEventListener('DOMContentLoaded', function () {
    var calculate_button = document.querySelector('#calculate_button');
    var chartcontainer = document.querySelector('#chart');

    var editor_left = ace.edit("chartmodel_layout");
    editor_left.setTheme("ace/theme/tomorrow");
    editor_left.session.setMode("ace/mode/javascript");
    editor_left.renderer.setOption('showLineNumbers', true);
    editor_left.setValue(JSON.stringify(data, null, 4));

    var samples = [];
    var sample_item_container = document.querySelector('#sample_item_container');
   
    samples.push(new Node('multi-series-type', "cartesian", data,cartesian_func));
    samples.push(new Node('AreaStack', "cartesian", data6,cartesian_func));
    samples.push(new Node('big_amount', "cartesian", data1,cartesian_func));
    samples.push(new Node('stack', "cartesian", data2,cartesian_func));
    samples.push(new Node('radial', "cartesian", data3,cartesian_func));
    samples.push(new Node('negativevalues', "cartesian", data4,cartesian_func));
    samples.push(new Node('sin&cos', "cartesian", data5,cartesian_func));
    samples.push(new Node('linear', "cartesian", data7,cartesian_func));
    samples.push(new Node('Date', "cartesian", data8,cartesian_func));

    samples.push(new Node('TreeMap', "hierarchical", h_data,hierarchical_func));
    samples.push(new Node('SunBurst', "hierarchical", h_data1,hierarchical_func));
    
    
    samples.forEach(node => {
        var item = document.createElement('div');
        item.className = "item";

        item.innerText = node.name;
        item.onclick = function (event) {
            if (node.value) {
                chartcontainer.innerHTML = '';
                editor_left.setValue(JSON.stringify(node.value, null, 4));
        
                node.fun(node.value);
                currentNode= node;
            }
        };
        sample_item_container.appendChild(item);

    });
    calculate_button.onclick = function (event) {
        var obj = editor_left.getValue();
        chartcontainer.innerHTML = '';
        if(currentNode.desc=='cartesian'){
            cartesian_func(JSON.parse(obj)).beginChartAnimation();
        }else{
            hierarchical_func(JSON.parse(obj)).beginChartAnimation();
            
        }
      
    };
    // let dataModel = new android.test.cartesian.DataModel(data);
    // var chartlayout = new android.test.cartesian.ChartLayout(null);
    // chartlayout.attachElement(document.getElementById("chart"),"Canvas", dataModel);
    currentNode =samples[0];
    currentNode.fun(currentNode.value);
    // chartlayout.beginChartAnimation();
});


var Node = function (name, desc, value,fun) {
    this.name = name;
    this.value = value;
    this.desc = desc;
    this.fun = fun;

}