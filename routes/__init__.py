from flask import Blueprint

routes = Blueprint('routes', __name__)

from .user import *
from .event import *
from .ads import *
from .topics import *
from .posts import *
from .likes import *
from .sponsors import *
from .user_sets import *
