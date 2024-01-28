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

def buy_stock(name, ticker_symbol):
    pass

def create_stock(ticker_symbol):
    stocks = client.stocks
    prices = stocks.prices

    query = {"ticker_symbol": ticker_symbol}

    document = prices.find_one(query)

    if not document:
        stock_prices = stock_data.get_stock_price(ticker_symbol)
        prices.insert_one({"ticker_symbol": ticker_symbol, "prices": stock_prices})

def read_stock_price(ticker_symbol):
    stocks = client.stocks
    prices = stocks.prices

    query = {"ticker_symbol": ticker_symbol}

    document = prices.find_one(query)

    day = get_day()
    if document:
        return document["prices"][day]
    else:
        create_stock(ticker_symbol)
        return read_stock_price(ticker_symbol)

def read_stock_history(ticker_symbol, days):
    stocks = client.stocks
    prices = stocks.prices

    query = {"ticker_symbol": ticker_symbol}

    document = prices.find_one(query)

    if document:
        return document["prices"][:days]
    else:
        create_stock(ticker_symbol)
        return read_stock_history(ticker_symbol, days)

def create_group(group_name, user_name):
    users = client.users
    groups = users.groups

    query = {"name": group_name}

    document = groups.find_one(query)

    if not document:
        groups.insert_one({"name": group_name, "owner": user_name, "users": [user_name]})

def read_group(name):
    users = client.users
    groups = users.groups
    
    query = {"name": name}

    document = groups.find_one(query)

    return document

def join_group(group_name, user_name):
    users = client.users
    groups = users.groups

    query = {"name": group_name}

    document = groups.find_one(query)
    current_users = document['users']

    if document:
        if user_name not in current_users:
            update = {"$set": {"users": current_users + [user_name]}}
            groups.update_one(query, update)


def leave_group(group_name, user_name):
    users = client.users
    groups = users.groups

    query = {"name": group_name}

    document = groups.find_one(query)
    current_users = document['users']

    if document:
        if user_name in current_users:
            new_users = list(set(current_users) - set([user_name]))
            update = {"$set": {"users": new_users}}
            groups.update_one(query, update)

def delete_group(group_name, user_name):
    users = client.users
    groups = users.groups

    query = {"name": group_name}

    document = groups.find_one(query)

    if document:
        if document['owner'] == user_name:
            groups.delete_one(query)

def read_day():
    stocks = client.stocks
    day = stocks.day
    document = day.find_one()
    return document['day']

def increment_day():
    stocks = client.stocks
    day = stocks.day
    document = day.find_one()
    query = {"day": document['day']}
    update = {"$set": {"day": document['day'] + 1}}
    day.update_one(query, update)

def reset_day():
    stocks = client.stocks
    day = stocks.day
    document = day.find_one()
    query = {"day": document['day']}
    update = {"$set": {"day": 0}}
    day.update_one(query, update)