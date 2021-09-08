from flask import Blueprint, request
from app.models import User

bp = Blueprint('users', __name__, url_prefix='/users')

@bp.route('/add')
def add_user():
    data = request.json

    user = User(first_name=data['firstName'], last_name=data['lastName'], email=data['email'])
    
    payload = {'user', user}
    return payload