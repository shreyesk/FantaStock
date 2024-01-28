from flask import Flask, jsonify, request
from yahoo_fin import stock_info as si

import database

app = Flask(__name__)

@app.route('/read_money', methods=['POST'])
def read_money():
    data = request.get_json()
    money = database.read_money(data['name'])
    return jsonify({'money': money})

@app.route('/buy_stock', methods=['POST'])
def buy_stock():
    data = request.get_json()
    database.buy_stock(data['name'], data['ticker_symbol'])
    return jsonify({'message': 'success'})

@app.route('/sell_stock', methods=['POST'])
def sell_stock():
    data = request.get_json()
    database.sell_stock(data['name'], data['ticker_symbol'])
    return jsonify({'message': 'success'})

@app.route('/read_ticker_symbols', methods=['POST'])
def read_ticker_symbols():
    return jsonify({'ticker_symbols': si.tickers_nasdaq()})


@app.route('/read_connections', methods=['POST'])
def read_connections():
    data = request.get_json()
    connections = database.read_connections(data['name'])
    return jsonify({'connections': connections})

@app.route('/read_leaderboard', methods=['POST'])
def read_leaderboard():
    data = request.get_json()
    leaderboard = database.read_leaderboard(data['group'])
    return jsonify({'leaderboard': leaderboard})

@app.route('/read_user_groups', methods=['POST'])
def read_user_groups():
    data = request.get_json()
    groups = database.read_user_groups(data['name'])
    return jsonify({'groups': groups})

@app.route('/join_group', methods=['POST'])
def join_group():
    data = request.get_json()
    database.join_group(data['group_name'], data['user_name'])
    return jsonify({'message': 'success'})

@app.route('/leave_group', methods=['POST'])
def leave_group():
    data = request.get_json()
    database.leave_group(data['group_name'], data['user_name'])
    return jsonify({'message': 'success'})

@app.route('/read_groups', methods=['POST'])
def read_groups():
    groups = database.read_groups()
    # userGroups = database.read_user_groups(data['name'])
    # nonUserGroups = [x for x in groups if x not in userGroups]
    return jsonify({'groups': groups})

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    database.create_user(data['name'], data['sub'])
    return jsonify({'message': 'success'})

@app.route("/create_stock", methods=["POST"])
def create_stock():
    data = request.get_json()
    database.create_stock(data["ticker_symbol"])
    return jsonify({'message': 'success'})

@app.route("/read_history", methods=["POST"])
def read_history():
    data = request.get_json()
    history = database.read_history(data['name']) 
    return jsonify({'history': history, 'xAxis': [i for i in range(len(history))]})

@app.route("/read_portfolio_history", methods=["POST"])
def read_portfolio_history():
    data = request.get_json()
    history = database.read_portfolio_history(data['name']) 
    return jsonify(history)

@app.route("/read_stock_price", methods=["POST"])
def read_stock_price():
    data = request.get_json()
    price = database.read_stock_price(data['ticker_symbol'], data['day']) 
    return jsonify({'price': price})

@app.route("/read_stock_history", methods=["POST"])
def read_stock_history():
    data = request.get_json()
    history = database.read_stock_history(data['ticker_symbol']) 
    return jsonify({"history": history})

if __name__ == '__main__':
    app.run(debug=True, port=3001)
