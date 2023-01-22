from flask import Flask, jsonify,send_from_directory, Response,request
from flask_cors import CORS, cross_origin
import os
import json
# import jsonify
import spacy
nlp = spacy.load("en_core_web_sm")
text = "This tutorial is about Natural Language Processing in spaCy. I am learning spacy and Flask. this is so interesting"
doc = nlp(text)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


react_folder = 'frontend'
directory= os.getcwd()+ f'/{react_folder}/build/static'

@app.route('/')
@cross_origin()
def index():
    ''' User will call with with thier id to store the symbol as registered'''
    path= os.getcwd()+ f'/{react_folder}/build'
    print(path)
    return send_from_directory(directory=path,path='index.html')

@app.route('/sentace-separator', methods = ['POST'])
@cross_origin()
def sentaceSeparator(): 
    data = request.get_json()
    data  = data['data']
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(data)
    doc_list = list(doc.sents)[:100]
    sentances = []
    for item in doc_list:
        sent = {
            "id": len(sentances)+1,
            "text": str(item)
        }
        sentances.append(sent)
    return jsonify(sentances)

@app.route('/static/<folder>/<file>')
def css(folder,file):
    ''' User will call with with thier id to store the symbol as registered'''
    path = folder+'/'+file
    return send_from_directory(directory=directory,path=path)
# @app.route("/")
# def hello_world():
#     sentence1 = list(doc.sents)
#     sent1 = sentence1[0]
#     fruits = ["apple", "banana"]

#     sents3 =[]
#     for s in sent1:
#         sents3.append(str(s))
#     print(sents3)
#     testing = json.dumps(sents3)
#     # 

#     # print(type(data))

   
#     # print(json.dumps(mysent))

#     blogs = [
#         {
#         'id': 1,
#         'title': 'Title 1',
#         'descriptoin': 'descriptoin 1'},
#          {
#         'id': 2,
#         'title': 'Title 2',
#         'descriptoin': 'descriptoin 2'}
#     ]
#     # return json.dumps(output)
#     # return blogs
#     # print(type(blogs))
#     # print(type(output))
#     # return jsonify(text)
#     return testing



if __name__ == "__main__":
    app.run(debug=True)