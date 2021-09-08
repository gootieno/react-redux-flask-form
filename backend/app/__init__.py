from app.models import db
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
import os
from app.routes import bp


app = Flask(__name__)
CORS(app)
app.config.from_mapping({
  'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL'),
  'SQLALCHEMY_TRACK_MODIFICATIONS': False,
})
app.register_blueprint(bp)
db.init_app(app)
Migrate(app, db)
