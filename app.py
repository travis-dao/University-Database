from flask import Flask, render_template, request, jsonify
from unidata import UniversityData

HOME = 'index.html'
DATABASE = 'database.html'
FILTER = 'filter.html'

data = UniversityData()

app = Flask(__name__, template_folder='templates')
@app.route('/')
def index():
    return render_template(HOME)
    
@app.route('/home', methods=['POST'])
def home():
    return render_template(HOME)

@app.route('/database', methods=['POST'])
def database():
    return render_template(DATABASE)

@app.route('/filter', methods=['POST'])
def filter():
    return render_template(FILTER)

@app.route('/api/filter', methods=['POST'])
def filter_map():
    return jsonify(data.return_map_data())

@app.route('/api/database', methods=['POST'])
def return_data():
    global data
    name_input = request.form.get("input")
    closest_name = data.find_name_match(name_input)
    return jsonify(data.return_data(closest_name))

if __name__ == '__main__':
    app.run(debug=True)