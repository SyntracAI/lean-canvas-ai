from typing import Dict, List
from redis import Redis

canvas_collection = 'lean-canvas'

class CanvasTemplateRepo:
    def __init__(self, redis: Redis):
        self.redis = redis

    def addTemplate(self, id: str, title: str, body: Dict[str, object]):
        self.redis.json().set(canvas_collection, '.', [], nx=True)
        self.redis.json().arrappend(canvas_collection, '.', {
          "id": id,
          "title": title,
        })
        self.redis.json().set(id, '.', {
          "id": id,
          "market": body["market"],
          "problem": body["problem"],
          "template": body["template"],
          "verified": body["verified"],
        }, nx=True)

    def getTemplate(self, id: str):
        value = self.redis.json().get(id, '.')
        return value

    def verifyKey(self, id: str, key: str):
        path = 'verified'
        value = self.redis.json().get(id, path)
        value[key] = not value.get(key)
        self.redis.json().set(id, path, value)
        return value

    def updateTemplateKey(self, id: str, key: str, body: str | List[str]):
        path = "template.{}".format(key)
        self.redis.json().set(id, path, body)
