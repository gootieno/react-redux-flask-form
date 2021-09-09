from flask import Blueprint, request
from app.models import User, db


bp = Blueprint('users', __name__, url_prefix='/users')

@bp.route('/add', methods=["POST"])
def add_user():
    data = request.json
    print('this is the user data ', data)
    user = User(first_name=data['firstName'], last_name=data['lastName'], email=data['email'])

    db.session.add(user)
    db.session.commit()
    
    payload = {'user': user.to_dict()}

    print(payload)
    return payload