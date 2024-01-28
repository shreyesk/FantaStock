import database

from flask import Flask, jsonify, request

app = Flask(__name__)

# example get request
@app.route('/default_greet')
def hello():
    return jsonify({"message": "Hello, World!"})

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    database.create_user(data['name'], data['sub'])

# example of sending a post request with data as a json
@app.route('/greet', methods=['POST'])
def greet():
    data = request.get_json()

    if 'name' in data:
        return jsonify({'message': f'Hello, {data["name"]}!'})
    else:
        return jsonify({'error': 'Missing "name" parameter'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=3001)