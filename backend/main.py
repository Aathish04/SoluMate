import json
import os
import requests
from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Define a route using a decorator
@app.get("/")
async def read_root():
    return await SendRequestLLM()


# Define another route with a path parameter
@app.get("/translate")
def preftoen(inlan,outlan,messageContent):
 
    text = messageContent

    headers = {
        'authority': 'demo-api.models.ai4bharat.org',
        'accept': '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        'dnt': '1',
        'origin': 'https://models.ai4bharat.org',
        'referer': 'https://models.ai4bharat.org/',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }

    json_data = {
        'controlConfig': {
            'dataTracking': True,
        },
        'input': [
            {
                'source': text,
            },
        ],
        'config': {
            'serviceId': '',
            'language': {
                'sourceLanguage': inlan,
                'targetLanguage': outlan,
                'targetScriptCode': None,
                'sourceScriptCode': None,
            },
        },
    }

    response = requests.post('https://demo-api.models.ai4bharat.org/inference/translation/v2', headers=headers, json=json_data)

    # Note: json_data will not be serialized by requests
    # exactly as it was in the original request.
    #data = '{"controlConfig":{"dataTracking":true},"input":[{"source":"Hello"}],"config":{"serviceId":"","language":{"sourceLanguage":"en","targetLanguage":"hi","targetScriptCode":null,"sourceScriptCode":null}}}'
    #response = requests.post('https://demo-api.models.ai4bharat.org/inference/translation/v2', headers=headers, data=data)
    # response = requests.post(
    # API_URL,
    # json={"text": text,"source_language": "en","target_language": lan},
    # )
    return json.loads(response.text)

@app.post("/stt")
async def stt(request: Request):
    body = await request.body()
    jsonip = json.loads(body)
    
    lan = jsonip["Language"]
    audio = jsonip["messageContent"]

    headers = {
        'authority': 'demo-api.models.ai4bharat.org',
        'accept': '*/*',
        'accept-language': 'en-GB,en-IN;q=0.9,en-US;q=0.8,en;q=0.7',
        'content-type': 'application/json',
        'dnt': '1',
        'origin': 'https://models.ai4bharat.org',
        'referer': 'https://models.ai4bharat.org/',
        'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    }

    json_data = {
        'config': {
            'language': {
                'sourceLanguage': lan,
            },
            'transcriptionFormat': {
                'value': 'transcript',
            },
            'audioFormat': 'wav',
            'samplingRate': '16000',
            'postProcessors': None,
        },
        'audio': [
            {
                'audioContent': audio 
                },
        ],
        'controlConfig': {
            'dataTracking': True,
        },
    }

    response = requests.post('https://demo-api.models.ai4bharat.org/inference/asr/conformer', headers=headers, json=json_data)
    return response.json()

async def SendRequestLLM():
    text = "The grievance cell for tamil nadu is located in adayar chennai. You will have to travel there and file our complaint"
    prompt = f"Give the JSON of complaintRegistrationModes destinationLocation detailedResponseText given the following text: {text}",
    with open("llm/grammar.gbnf") as f:
        grammar = f.read()

    res = requests.post(
        url=os.getenv("LLM_API_BASE")+"/completions",
        json={
        "prompt" : prompt,
        "grammar" : grammar,
        "max_tokens":0 # 0 is infinity
        }
    )
    outjson = res.json()["choices"][0]["text"]
    
    print(outjson)
    outjson = json.loads(outjson)
    return outjson

    