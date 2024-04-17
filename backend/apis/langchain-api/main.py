from mangum import Mangum
from app.main import app

def handler(event, context):
    return Mangum(app)(event, context);
