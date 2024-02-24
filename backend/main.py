import json
import os
import requests
from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import pyttsx3

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
    print("hello")
    return await SendRequestLLM()


# Define another route with a path parameter
@app.get("/translate")
async def preftoen(inlan,outlan,messageContent):
 
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


async def stt(lan,audio):
    # body = await request.body()
    # jsonip = json.loads(body)
    
    # lan = jsonip["Language"]
    # audio = jsonip["messageContent"]

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

async def SendRequesttoParser():
    # 
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
    
    outjson = json.loads(outjson)
    return outjson

@app.post("/Generator")
async def SendRequesttoGenerator(request : Request):
    jsonip = await request.json()
    # print(body)
    # jsonip = json.loads(body)
    Language = jsonip["Language"]
    Location = jsonip["Location"]
    Age= jsonip["Age"]
    messageContent = jsonip["messageContent"]
    mimetype=jsonip["mimetype"]

    headers = {
    'accept': 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
    }

    if mimetype!="text":
        # audio
        transcribedata = '{"user": "user", "query": messageContent}'
        transcribedata = transcribedata.replace("messageContent",messageContent)

        response = await stt(Language,messageContent)
        print(response)
        print(response.text)
        messageContent = response["output"][0]["source"]

    if Language!="en":
        translatedata = '{"user": "user", "query": messageContent}'
        translatedata = translatedata.replace("messageContent",messageContent)
        response = await preftoen(outlan="en",inlan=Language,messageContent=messageContent)
        # response=response.json()
        print(response)
        messageContent = response["output"][0]["target"]
        

    data = {"user": "user", "query": messageContent +f"The user's age is {Age} and they live in {Location}"}
    data = json.dumps(data)
    # data = data.replace(messageContent, '"' + "messageContent"+". The user's age is " + Age+" and they live in "+Location+'"')
    print(data)

    response =  requests.post('http://192.168.241.184:5001/', headers=headers, json=json.loads(data))
    messageContent = response.text
    response = response.text
    
    
    # response = "ho"
    print(response)

    # response={"freetext":messageContent+". The user's age is " + Age+" and they live in "+Location,"Navigation":None}
    # response =  requests.post(' http://192.168.241.184:5001/', headers=headers, data=data)
    if Language!="en":
        translatedata = '{"user": "user", "query": messageContent}'
        translatedata = translatedata.replace("messageContent",response)
        response = await preftoen(outlan=Language,inlan="en",messageContent=messageContent)
        # response=response.json()
        print(response)
        response = response["output"][0]["target"]
        
    if mimetype!="text":
        return
        response = Sendtranscribedata(messageContent,Language)
    
    
    return {"freetext":response}

def Sendtranscribedata(messageContent, language):
    if language!="en":
        #translate before audio convertion 
        pass

    request_url = "https://demo-api.models.ai4bharat.org/inference/tts"
    headers = {
    'authority': 'demo-api.models.ai4bharat.org',
    'accept': '*/*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'content-type': 'application/json',
    'dnt': '1',
    'origin': 'https://models.ai4bharat.org',
    'referer': 'https://models.ai4bharat.org/',
    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    }

    json_data = {
        'controlConfig': {
            'dataTracking': True,
        },
        'input': [
            {
                'source': messageContent,
            },
        ],
        'config': {
            'gender': 'male',
            'language': {
                'sourceLanguage': language,
            },
        },
    }
        

    response = requests.post('https://demo-api.models.ai4bharat.org/inference/tts', headers=headers, json=json_data)
    # f = open("file1.txt","w")
    response = response.json()["audio"][0]["audioContent"]
    return response


