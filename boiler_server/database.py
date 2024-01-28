import os

from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import stock_data

load_dotenv()

cluster_user = os.getenv("cluster_user")
cluster_password = os.getenv("cluster_password")
cluster_uri = os.getenv("cluster_uri")
uri = f"mongodb+srv://{cluster_user}:{cluster_password}@{cluster_uri}/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

def read_money(name):
    users = client.users
    profiles = users.profiles

    query = {"name": name}
    document = profiles.find_one(query)
    return document['money']

def read_history(name):
    users = client.users
    profiles = users.profiles

    query = {"name": name}

    document = profiles.find_one(query)
    return document['history']



def read_connections(name):
    users = client.users
    groups = users.groups
    profiles = users.profiles

    connections = set()
    for document in groups.find():
        if name in document['users']:
            for connection in document['users']:
                connections.add(connection)

    scores = []
    for connection in connections:
        score = dict()
        score['name'] = connection
        score['score'] = profiles.find_one({'name': connection})['history'][-1]
        scores.append(score)

    return scores

def read_leaderboard(group):
    users = client.users
    groups = users.groups
    profiles = users.profiles

    query = {"name": group}
    document = groups.find_one(query)

    scores = []
    if document:
        for name in document['users']:
            profile = profiles.find_one({'name': name})
            scores.append({'name': profile['name'], 'score': profile['history'][-1]})

    return sorted(scores, key=lambda d: -d['score'])

def read_user_groups(name):
    users = client.users
    groups = users.groups

    user_groups = []
    for document in groups.find():
        if name in document['users']:
            user_groups.append(document['name'])
    return user_groups

def read_portfolio_history(name):
    users = client.users
    profiles = users.profiles

    query = {'name': name}

    document = profiles.find_one(query)

    assets = dict()
    for asset in document['portfolio']:
        if asset in assets:
            assets[asset] += 1
        else:
            assets[asset] = 1

    to_return = {} # formatted so Jason has an easier time
    for asset in assets:
        to_return[asset] = [assets[asset], read_stock_history(asset)]
    
    return to_return

def create_user(name, sub, money=10000):
    query_to_insert = {
        'name': name,
        'sub': sub,
        'money': money,
        'portfolio': [],
        'history': [money for _ in range(read_day())],
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
    users = client.users
    profiles = users.profiles

    query = {"name": name}
    document = profiles.find_one(query)

    if document:
        price = read_stock_price(ticker_symbol)
        if document['money'] > price:
            new_money = document['money'] - price
            new_portfolio = document['portfolio'] + [ticker_symbol]
            user_update = {"$set": {"money": new_money, "portfolio": new_portfolio}}
            profiles.update_one(query, user_update)

def sell_stock(name, ticker_symbol):
    users = client.users
    profiles = users.profiles

    query = {"name": name}
    document = profiles.find_one(query)

    if document:
        price = read_stock_price(ticker_symbol)
        if ticker_symbol in document['portfolio']:
            new_money = document['money'] + price
            new_portfolio = document['portfolio']
            new_portfolio.remove(ticker_symbol)
            user_update = {"$set": {"money": new_money, "portfolio": new_portfolio}}
            profiles.update_one(query, user_update)

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

    day = read_day()
    if document:
        return document["prices"][day]
    else:
        create_stock(ticker_symbol)
        return read_stock_price(ticker_symbol)

def read_stock_history(ticker_symbol):
    stocks = client.stocks
    prices = stocks.prices

    query = {"ticker_symbol": ticker_symbol}

    document = prices.find_one(query)

    if document:
        return document["prices"][:read_day()]
    else:
        create_stock(ticker_symbol)
        return read_stock_history(ticker_symbol)

def create_group(group_name, user_name):
    users = client.users
    groups = users.groups

    query = {"name": group_name}

    document = groups.find_one(query)

    if not document:
        groups.insert_one({"name": group_name, "owner": user_name, "users": [user_name]})

def read_groups():
    users = client.users
    groups = users.groups

    groups_available = []
    for document in groups.find():
        groups_available.append(document['name'])
    return groups_available

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
    users = client.users
    profiles = users.profiles

    for document in profiles.find():
        portfolio = document['portfolio']
        portfolio_value = 0
        for asset in portfolio:
            portfolio_value += read_stock_price(asset)
        total_value = portfolio_value + document['money']
        new_history = document['history'] + [total_value]
        update = {"$set": {"history": new_history}}
        profiles.update_one({'_id': document['_id']}, update)
    
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
