from flask import Flask, render_template, request
from unidata import UniversityData

HOME = 'index.html'
SEARCH = 'search.html'
DISPLAY = 'display.html'
REFERENCE = 'reference.html'

data = UniversityData()

app = Flask(__name__, template_folder='templates')
@app.route('/')
def index():
    return render_template(HOME)

@app.route('/search', methods=['GET', 'POST'])
def search():
    return render_template(SEARCH)

@app.route('/display', methods=['GET', 'POST'])
def display():
    html_input = request.form.get('input')
    print(html_input)

    closest_name_match = data.get_name_match(html_input)

    school_data = {}
    school_data['data'] = data.get_school_data(closest_name_match)
    return render_template(DISPLAY, flask_data=school_data)

@app.route('/reference', methods=['GET', 'POST'])
def reference():
    return render_template(REFERENCE)


if __name__ == '__main__':
    app.run(debug=True)