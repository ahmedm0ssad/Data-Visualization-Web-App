function fetchDataAndUpdateChart3() {
    fetch("/get-sales-intensity-data")
        .then((response) => response.json())
        .then((data) => {
        updateChart3(data);
        })
        .catch((error) => console.error("Error: ", error));
    }



    function updateChart3(data){



        am5.ready(function() {

            // Create root element
            // https://www.amcharts.com/docs/v5/getting-started/#Root_element
            var root = am5.Root.new("Heat_chartdiv");
            
            
            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([
              am5themes_Animated.new(root)
            ]);
            
            
            // Create the map chart
            // https://www.amcharts.com/docs/v5/charts/map-chart/
            var chart = root.container.children.push(am5map.MapChart.new(root, {
              panX: "translateX",
              panY: "translateY",
              projection: am5map.geoMercator()
            }));
            
            
            // Create main polygon series for countries
            // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
            var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
              geoJSON: am5geodata_worldLow,
              exclude: ["AQ"]
            }));
            
            polygonSeries.mapPolygons.template.setAll({
              tooltipText: "{name}",
              toggleKey: "active",
              interactive: true
            });
            
            polygonSeries.mapPolygons.template.states.create("hover", {
              fill: root.interfaceColors.get("primaryButtonHover")
            });
            
            polygonSeries.mapPolygons.template.states.create("active", {
              fill: root.interfaceColors.get("primaryButtonHover")
            });
            
            
            // US Series
            // Create main polygon series for countries
            // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
            var polygonSeriesUS = chart.series.push(am5map.MapPolygonSeries.new(root, {
              geoJSON: am5geodata_usaLow
            }));
            
            polygonSeriesUS.mapPolygons.template.setAll({
              tooltipText: "{name}",
              toggleKey: "active",
              interactive: true
            });
            
            var colors = am5.ColorSet.new(root, {});
            
            polygonSeriesUS.mapPolygons.template.set("fill", colors.getIndex(3));
            
            polygonSeriesUS.mapPolygons.template.states.create("hover", {
              fill: root.interfaceColors.get("primaryButtonHover")
            });
            
            polygonSeriesUS.mapPolygons.template.states.create("active", {
              fill: root.interfaceColors.get("primaryButtonHover")
            });
            
            
            
            // Add zoom control
            // https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
            chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
            
            
            // Set clicking on "water" to zoom out
            chart.chartContainer.get("background").events.on("click", function () {
              chart.goHome();
            })
            
            var title = root.container.children.push(
              am5.Label.new(root, {
              text: "Geographical  map",
              centerX: am5.p100,
              x: am5.p100,
              y: 1,
              fontSize: 20,
              })
          );
            // Make stuff animate on load
            chart.appear(1000, 100);
            
            });

    }

document.addEventListener("DOMContentLoaded", function () {
        fetchDataAndUpdateChart3();
        });