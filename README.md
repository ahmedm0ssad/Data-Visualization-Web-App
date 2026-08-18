# Data Visualization Web Application

An interactive data-visualization dashboard for the **Global SuperStore** dataset, built with **Flask**, **SQLite**, and **amCharts 5**. The app serves aggregated sales and profit analytics through a REST-style JSON API and renders them as interactive charts (pie, donut, bar, stacked bar, heat map, and scatter plots).

## Features

- **Flask + SQLite backend** — CSV data loaded into a SQLite database via SQLAlchemy, with 8 aggregation endpoints (`/get-data`, `/get-profit-data`, `/get-customer-segment-data`, `/get-sales-intensity-data`, `/get-product-sales-data`, `/get-profits-data`, `/get-sales-intensity1-data`, `/get-sales-intensity2-data`).
- **Interactive frontend** — amCharts 5 visualizations: sales by region (pie), profits by category (donut), customer segments (bar), sales intensity by city (heat map), yearly sales/profits (bar), and product-level quantity/profit/discount scatter and stacked charts.
- **Dynamic data flow** — the browser fetches aggregated JSON from the Flask API and renders charts client-side.

## Structure

```
├── server.py               # Flask app + SQLite ingestion + JSON API
├── templates/
│   └── index.html          # dashboard layout
├── static/
│   ├── *.js                # amCharts 5 chart definitions
│   └── style.css
└── Global_SuperStore.csv   # source dataset (loaded into SQLite at startup)
```

## Requirements

- `flask`
- `pandas`
- `sqlalchemy`

## Run

```bash
pip install -r requirements.txt
python server.py
```

Then open http://127.0.0.1:5000.

## Dataset

Global SuperStore sales data (orders, products, regions, segments, profit, discounts) — a widely used retail analytics benchmark.