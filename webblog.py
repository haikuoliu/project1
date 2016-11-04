from flask import Flask
from flask import request, send_from_directory
from routes import *


app = Flask(__name__, static_url_path='')
app.register_blueprint(routes)
conn = connectdb()  # get connection


@app.route('/')
def hello_world():
    return app.send_static_file('index.html')


@app.route('/img/<path:path>')
def img(path):
    return send_from_directory('static/img', path)


if __name__ == "__main__":
    import click
    @click.command()
    @click.option('--debug', is_flag=True)
    @click.option('--threaded', is_flag=True)
    @click.argument('HOST', default='127.0.0.1')
    @click.argument('PORT', default=8080, type=int)
    def run(debug, threaded, host, port):
        HOST, PORT = host, port
        print "running on %s:%d" % (HOST, PORT)
        app.run(host=HOST, port=PORT, debug=debug, threaded=threaded)
    run()
