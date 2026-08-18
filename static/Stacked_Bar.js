function fetchDataAndUpdateChart() {
  fetch("/get-data")
    .then((response) => response.json())
    .then((data) => {
      updateChart(data);
    })
    .catch((error) => console.error("Error: ", error));
}

function updateChart(data) {
  am5.ready(function () {
    // Create root element
    var root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    // Add legend
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    // Create axes
    var xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.8,
      minorGridEnabled: false,
    });

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "Region",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xRenderer.grid.template.setAll({
      location: 0.9,


    });

    xAxis.data.setAll(data);

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 10,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 1,
        }),
      })
    );

    // Add series
    function makeSeries(name, fieldName, stacked) {
      var series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          stacked: stacked,
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          valueYField: "totalSales", 
          categoryXField: "Region",
        })
      );

      series.columns.template.setAll({
        tooltipText: "{name}, {categoryX}:{valueY}",
        width: am5.percent(90),
        tooltipY: am5.percent(10),
      });
      series.data.setAll(data);

      // Make stuff animate on load
      series.appear();

      // var title = root.container.children.push(
      //   am5.Label.new(root, {
      //     text: "Sales by Region",
      //     centerX: am5.p50, // Change this to 50%
      //     x: am5.p50, // Change this to 50%
      //     y: 10,
      //     fontSize: 20,
      //   })
      // );

      legend.data.push(series);
    }

    var regions = [
      "West",
      "East",
      "South",
      "Central",
      "Africa",
      "Central Asia",
      "North Asia",
      "Caribbean",
      "North",
      "EMEA",
      "Oceania",
      "Southeast Asia",
      "Canada",
    ];

    // regions.forEach((region) => {
    //   makeSeries(region, region.toLowerCase(), true);
    // });
    
      makeSeries("West", "west", true);
      makeSeries("East", "east", true);
      makeSeries("Africa", "africa", true);

  });





  
}




document.addEventListener("DOMContentLoaded", function () {
  fetchDataAndUpdateChart();
});
