function fetchDataAndUpdateChart7() {
fetch("/get-sales-intensity1-data")
    .then((response) => response.json())
    .then((data) => {
    console.log(data);
    updateChart7(data);
    })
    .catch((error) => console.error("Error: ", error));
}
//      todo  <div id="Scatter_chartdiv"></div>
function updateChart7(data) {
am5.ready(function () {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    // sourcery skip: avoid-using-var
    var root = am5.Root.new("Scatter_chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelY: "zoomXY",
        pinchZoomX: true,
        pinchZoomY: true,
    })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
        tooltip: am5.Tooltip.new(root, {}),
    })
    );

    var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
    })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
    am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "totalProfit",
        valueXField: "totalQuantity",
        valueField: "product",
        tooltip: am5.Tooltip.new(root, {
        labelText:
            "totalQuantity: {valueX}, totalProfit: {valueY}, Product: {value}",
        }),
    })
    );

    series.strokes.template.set("visible", false);
    chart.set(
    "cursor",
    am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: [series],
    })
    );
    chart.set(
    "scrollbarX",
    am5.Scrollbar.new(root, { orientation: "horizontal" })
    );
    chart.set(
    "scrollbarY",
    am5.Scrollbar.new(root, { orientation: "vertical" })
    );

    var canvasBullets = series.children.push(am5.Graphics.new(root, {}));
    // sourcery skip: avoid-function-declarations-in-blocks
    function drawBullets() {
    canvasBullets._markDirtyKey("draw");
    }
    series.strokes.template.on("userData", drawBullets);

    series.data.setAll(data);
});
}

document.addEventListener("DOMContentLoaded", function () {
fetchDataAndUpdateChart7();
});
