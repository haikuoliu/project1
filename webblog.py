  # try:
  #   g.conn = engine.connect()
  # except:
  #   print "uh oh, problem connecting to database"
  #   import traceback; traceback.print_exc()
  #   g.conn = None

  # try:
  #   g.conn.close()
  # except Exception as e:
  #   pass



# @app.route('/add', methods=['POST'])
# def add():
#   name = request.form['name']
#   print name
#   cmd = 'INSERT INTO test(name) VALUES (:name1), (:name2)';
#   g.conn.execute(text(cmd), name1 = name, name2 = name);
#   return redirect('/')

from flask import Flask
from flask import request
from sqlalchemy import *
import json
from routes import *

# handle db connection
def connectdb():
    host = "104.196.175.120"
    password = "che2q"
    user = "hl3023"
    url = "postgresql://%s:%s@%s/postgres" % (user, password, host)
    db = create_engine(url)
    conn = db.connect()
    if conn: print "connected to db"
    else: print "connection failed"
    return conn;


app = Flask(__name__, static_url_path='')
app.register_blueprint(routes)
conn = connectdb()  # get connection


@app.route('/')
def hello_world():
    return app.send_static_file('index.html')


if __name__ == "__main__":
    import click
    @click.command()
    @click.option('--debug', is_flag=True)
    @click.option('--threaded', is_flag=True)
    @click.argument('HOST', default='0.0.0.0')
    @click.argument('PORT', default=8111, type=int)
    def run(debug, threaded, host, port):
        HOST, PORT = host, port
        print "running on %s:%d" % (HOST, PORT)
        app.run(host=HOST, port=PORT, debug=debug, threaded=threaded)
    run()
