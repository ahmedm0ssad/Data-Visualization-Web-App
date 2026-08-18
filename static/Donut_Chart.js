function fetchDataAndUpdateChart2() {
    fetch("/get-customer-segment-data")
        .then((response) => response.json())
        .then((data) => {
        updateChart2(data);
        })
        .catch((error) => console.error("Error: ", error));
    }

function updateChart2(data){

am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("Donut_chartdiv");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
    am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart = root.container.children.push(am5percent.PieChart.new(root, {
    layout: root.verticalLayout,
    innerRadius: am5.percent(50)
    }));
    
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    var series = chart.series.push(am5percent.PieSeries.new(root, {
    valueField: "totalSales",
    categoryField: "Segment",
    alignLabels: false
    }));
    
    series.labels.template.setAll({
    textType: "circular",
    centerX: 0,
    centerY: 0
    });
    
    
    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(data);
    
    
    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    var legend = chart.children.push(am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    marginTop: 15,
    marginBottom: 15,
    }));
    
    legend.data.setAll(series.dataItems);
    
    
    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);
    var title = root.container.children.push(
        am5.Label.new(root, {
        text: "Segment Distribution",
        centerX: am5.p-100,
        x: am5.p-100,
        y: 1,
        fontSize: 20,
        })
    );
    });
}
    document.addEventListener("DOMContentLoaded", function () {
        fetchDataAndUpdateChart2();
        });