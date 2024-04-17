import json
from typing import List
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from langchain_community.llms import Ollama
from langchain import PromptTemplate
from pydantic import BaseModel
import uuid
import redis
from langchain_core.messages import HumanMessage
from langchain_core.prompts import ChatPromptTemplate
from syntrac.sdk import Syntrac, set_association_properties
from app.repos.canvas import CanvasTemplateRepo

load_dotenv()

Syntrac.init(
  app_name="lean-canvas",
  )

app = FastAPI()

origins = [
"http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    set_association_properties({
      "action_id": request.headers.get('x-action-id')
    })
    response = await call_next(request)
    return response

llm = Ollama(model="llama2")
redisClient = redis.Redis()
canvas_template_repo = CanvasTemplateRepo(redisClient)

class GenerateRequestBody(BaseModel):
    market: str
    problem: str
@app.post("/generate")
async def generate(body: GenerateRequestBody):
    json_template = {
      "problem": "STRING",
      "solution": "STRING",
      "keyMetrics": "ARRAY<STRING>",
      "uniqueValueProposition": "STRING",
      "unfairAdvantages": "ARRAY<STRING>",
      "channels": "ARRAY<STRING>",
      "customerSegments": "ARRAY<STRING>",
      "costStructures": "ARRAY<STRING>",
      "revenueStreams": "ARRAY<STRING>",
    }
    prompt_template = """Use the following pieces of user input to generate lean canvas template with information in JSON format only using the following template: {json_template}
    User Inputs:
    - Market: {market}
    - Problem: {problem}"""

    PROMPT = PromptTemplate.from_template(
      prompt_template
    )
    prompt = PROMPT.format(
      market=body.market,
      problem=body.problem,
      json_template=json.dumps(json_template)
      )
    canvasStr = await llm.ainvoke(prompt, format='json')
    id = str(uuid.uuid4())
    title = "{}-{}".format(body.market, body.problem)
    canvas_template_repo.addTemplate(id, title, {
      "market": body.market,
      "problem": body.problem,
      "template": json.loads(canvasStr),
      "verified": {},
    })
    return {
      "id": id,
    }

@app.get("/canvas/{id}")
async def getCanvas(id):
    canvas = canvas_template_repo.getTemplate(id)
    return canvas

@app.post("/canvas/{id}/verified/{key}")
async def verifyKey(id, key):
    value = canvas_template_repo.verifyKey(id, key)
    return value

class CanvasTemplateGenerateRequestBody(BaseModel):
    prompt: str
@app.post("/canvas/{id}/template/{key}")
async def canvasTemplateRegenerate(id, key, body: CanvasTemplateGenerateRequestBody):
    json_template = {
      key: "ARRAY<STRING>",
    }
    canvas = redisClient.json().get(id, '.')
    if key == 'solution' or key == 'problem' or key == 'uniqueValueProposition':
        json_template[key] = 'STRING'

    context = "- Market: {}".format(canvas["market"])
    if not canvas["verified"].get("problem"):
        context = context + "\n" + "- {}: {}".format(key, canvas["problem"])

    for key in canvas["verified"]:
        verified = canvas["verified"][key]
        if verified:
            context = context + "\n" + "- {}: {}".format(key, canvas["template"][key])

    messages = [
        HumanMessage(
            content="Given the following context:"
        ),
        HumanMessage(
            content="{context}"
        ),
        HumanMessage(
            content="Your response should be different from the current response: {value}"
        ),
        HumanMessage(
            content="Your response requires to follow this json template schema: {json_template}"
        ),
        HumanMessage(
            content="Now, response to this user request: {request}."
        ),
    ]

    prompt_template = ChatPromptTemplate.from_messages(messages)
    PROMPT = PromptTemplate.from_template(
      prompt_template.format()
    )
    prompt = PROMPT.format(
      request=body.prompt,
      context=context,
      key=key,
      value=canvas["template"][key],
      json_template=json.dumps(json_template)
      )

    canvasStr = await llm.ainvoke(prompt, format='json')
    return json.loads(canvasStr)

class CanvasTemplateUpdateRequestBody(BaseModel):
    value: str | List[str]
@app.patch("/canvas/{id}/template/{key}")
async def canvasTemplateUpdate(id, key, body: CanvasTemplateUpdateRequestBody):
    canvas_template_repo.updateTemplateKey(id, key, body.value)
    return {
      key: body.value,
    }
