from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import os
from dotenv import load_dotenv

import stock_data

load_dotenv()

cluster_user = os.getenv("cluster_user")
cluster_password = os.getenv("cluster_password")
cluster_uri = os.getenv("cluster_uri")
uri = f"mongodb+srv://{cluster_user}:{cluster_password}@{cluster_uri}/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

def verify_user(username_try, password_try):
    users = client.users
    logins = users.logins

    query = {"username": username_try, "password": password_try}

    document = logins.find_one(query)

    return True if document else False

def create_user(name, sub, money=10000):
    query_to_insert = {
        'name': name,
        'sub': sub,
        'money': money,
        'portfolio': [],
        'history': [],
        'connections': [] 
    }

    users = client.users
    profiles = users.profiles

    query = {"name": name}

    document = profiles.find_one(query)

    # only create user if user not exists
    if not document:
        profiles.insert_one(query_to_insert)

def create_stock(ticker_symbol):
    stocks = client.stocks
    prices = stocks.prices

    query = {"ticker_symbol": ticker_symbol}

    document = prices.find_one(query)

    if not document:
        stock_prices = stock_data.get_stock_price(ticker_symbol)
        prices.insert_one({"ticker_symbol": ticker_symbol, "prices": stock_prices})

def read_stock(ticker_symbol, day):
    stocks = client.stocks
    prices = stocks.prices

    query = {"ticker_symbol": ticker_symbol}

    document = prices.find_one(query)

    if document:
        return document["prices"][day]
    else:
        create_stock(ticker_symbol)
        return read_stock(ticker_symbol, day)