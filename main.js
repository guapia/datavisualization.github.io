
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
    samples.push(new Node('multi-series-type', "", data));
    samples.push(new Node('big_amount', "", data1));
    samples.push(new Node('stack', "", data2));
    samples.push(new Node('radial', "", data3));
    samples.push(new Node('negativevalues', "", data4));
    samples.push(new Node('sin&cos', "", data5));
    
    
    samples.forEach(e => {
        var item = document.createElement('div');
        item.className = "item";

        item.innerText = e.name;
        item.onclick = function (event) {
            if (e.value) {
                chartcontainer.innerHTML = '';
                editor_left.setValue(JSON.stringify(e.value, null, 4));
                let dataModel = new android.test.DataModel(e.value);
                var chartlayout = new android.test.ChartLayout(null);
                chartlayout.attachElement(document.getElementById("chart"), dataModel);
                chartlayout.beginChartAnimation();
            }
        };
        sample_item_container.appendChild(item);

    });
    calculate_button.onclick = function (event) {
        var obj = editor_left.getValue();
        chartcontainer.innerHTML = '';
        let dataModel = new android.test.DataModel(JSON.parse(obj));
        var chartlayout = new android.test.ChartLayout(null);
        chartlayout.attachElement(document.getElementById("chart"), dataModel);
        chartlayout.beginChartAnimation();
    };
    let dataModel = new android.test.DataModel(data);
    var chartlayout = new android.test.ChartLayout(null);
    chartlayout.attachElement(document.getElementById("chart"), dataModel);
    chartlayout.beginChartAnimation();
    initside();
});

var initside = function () {


}


var Node = function (name, desc, value) {
    this.name = name;
    this.value = value;
    this.desc = desc;
}