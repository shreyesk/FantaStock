import database

from flask import Flask, jsonify, request

app = Flask(__name__)

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
    return jsonify({'history': history})

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