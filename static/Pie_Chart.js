function fetchDataAndUpdateChart1() {
fetch("/get-profit-data")
    .then((response) => response.json())
    .then((data) => {
    updateChart1(data);
    })
    .catch((error) => console.error("Error: ", error));
}

function updateChart1(data) {
am5.ready(function () {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    
// sourcery skip: avoid-using-var
    var root = am5.Root.new("Pie_chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart = root.container.children.push(
    am5percent.PieChart.new(root, {
        endAngle: 270,
    })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    var series = chart.series.push(
    am5percent.PieSeries.new(root, {
        valueField: "totalProfit",
        categoryField: "Category",
        endAngle: 270,
    })
    );

    series.states.create("hidden", {
    endAngle: -90,
    });

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(data);

    series.appear(1000, 100);

    var title = root.container.children.push(
        am5.Label.new(root, {
        text: "Profitability Category",
        centerX: am5.p-100,
        x: am5.p-100,
        y: 1,
        fontSize: 20,
        })
    );
});
}

document.addEventListener("DOMContentLoaded", function () {
fetchDataAndUpdateChart1();
});
