from flask import Flask, jsonify, render_template
import sqlite3
import pandas as pd
from sqlalchemy import create_engine


def create_connection(db_file):
    """create a database connection to a SQLite database"""
    engine = None
    try:
        engine = create_engine("sqlite:///" + db_file)
    except sqlite3.Error as e:
        print(e)
        raise e
    return engine


Global_SuperStore = pd.read_csv("Global_SuperStore.csv")
Global_SuperStore = Global_SuperStore[:len(Global_SuperStore)//2]
engine = create_connection("SuperStore_DataBase.db")
Global_SuperStore.to_sql("SuperStore_DataBase", engine, if_exists="replace")


db_url = "sqlite:///SuperStore_DataBase.db"
engine = create_engine(db_url, echo=True)
# Global_SuperStore_2 = pd.read_sql("select profit from SuperStore_DataBase", engine)
# print(Global_SuperStore_2)


app = Flask(__name__)


@app.route("/")
def index():
    return render_template(
        "index.html"
    )  # Replace 'index.html' with the actual template name


@app.route("/get-data")
def get_data():
    # Query the database to get sales by region
    df = pd.read_sql("SELECT Region,SUM(Sales) as totalSales FROM SuperStore_DataBase GROUP BY Region", engine)

    # Convert the DataFrame to a list of dictionaries for JSON serialization
    data = df.to_dict(orient="records")

    return jsonify(data)



@app.route("/get-profit-data")
def get_profit_data():
    # Query the database to get profit by product category
    df = pd.read_sql("SELECT Category, SUM(Profit) as totalProfit FROM SuperStore_DataBase GROUP BY Category", engine)

    # Convert the DataFrame to a list of dictionaries for JSON serialization
    data = df.to_dict(orient="records")

    return jsonify(data)



@app.route("/get-customer-segment-data")
def get_customer_segment_data():
    # Query the database to get sales and profit by customer segment
    df = pd.read_sql("SELECT Segment, SUM(Sales) as totalSales, SUM(Profit) as totalProfit FROM SuperStore_DataBase GROUP BY Segment", engine)

    # Convert the DataFrame to a list of dictionaries for JSON serialization
    data = df.to_dict(orient="records")

    return jsonify(data)

@app.route("/get-sales-intensity-data")
def get_sales_intensity_data():
    # Query the database to get sales by city
    df = pd.read_sql("SELECT City, SUM(Sales) as totalSales FROM SuperStore_DataBase GROUP BY City", engine)

    # Convert the DataFrame to a list of dictionaries for JSON serialization
    data = df.to_dict(orient="records")

    return jsonify(data)


@app.route("/get-product-sales-data")
def get_product_sales_data():
    # Query the database to get sales by product for each year
    df = pd.read_sql("SELECT `Year`, SUM(`Sales`) as totalSales FROM `SuperStore_DataBase` GROUP BY `Year`", engine)

    # Convert the DataFrame to a list of dictionaries for JSON serialization
    data = df.to_dict(orient="records")

    return jsonify(data)

@app.route("/get-profits-data")
def get_product_profits_data():
    # Query the database to get sales by product for each year
    df = pd.read_sql("SELECT `Year`, SUM(`profit`) as totalProfits FROM `SuperStore_DataBase` GROUP BY `Year`", engine)

    # Convert the DataFrame to a list of dictionaries for JSON serialization
    data = df.to_dict(orient="records")

    return jsonify(data)


@app.route("/get-sales-intensity1-data")
def get_sales_intensity1_data():
    # Query the database to get quantity sold and profit by product
    df = pd.read_sql("SELECT `Product Name` as Product, SUM(`Quantity`) as totalQuantity, SUM(`Profit`) as totalProfit FROM `SuperStore_DataBase` GROUP BY `Product Name`", engine)

    # Convert the DataFrame to a list of dictionaries for JSON serialization
    data = df.to_dict(orient="records")

    return jsonify(data)

@app.route("/get-sales-intensity2-data")
def get_sales_intensity2_data():
    # Query the database to get quantity sold and profit by product
    df = pd.read_sql("SELECT `Product Name` as Product, SUM(`Discount`) as totalDiscounts , SUM(`Profit`) as totalProfit FROM `SuperStore_DataBase` GROUP BY `Product Name`", engine)

    # Convert the DataFrame to a list of dictionaries for JSON serialization
    data = df.to_dict(orient="records")

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
