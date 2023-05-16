import pandas as pd
import numpy as np
from tqdm.notebook import tqdm
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, jsonify
import pyodbc
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

server = 'ZDIG'
database = 'MarketPlace'
username = 'zdig'
password = 'raedwes21'

connection = pyodbc.connect('DRIVER={SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+password)
query = "SELECT [article_id],[prod_name],[product_type_no],[product_group_name] ,[colour_group_code] ,[department_no]     ,[index_name],[garment_group_no] FROM produits"
articles = pd.read_sql(query, connection).astype(int, errors='ignore')
articles = articles.set_index('article_id')


prod_name_enc = LabelEncoder()
group_name_enc = LabelEncoder()
index_enc = LabelEncoder()

articles['prod_name'] = prod_name_enc.fit_transform(articles['prod_name'])
articles['product_group_name'] = group_name_enc.fit_transform(articles['product_group_name'])
articles['index_name'] = index_enc.fit_transform(articles['index_name'])

article_vectors = articles.values
article_ids = articles.index.values
article_data = {"id": article_ids, "vector": article_vectors}

class CosineSimilarityIndex():
    def __init__(self, article_vectors, labels):
        self.article_vectors = article_vectors.astype('float32')
        self.labels = labels
        
    def query(self, vector, k=5):
        similarities = cosine_similarity([vector], self.article_vectors).flatten()
        indices = similarities.argsort()[::-1][:k]
        return [self.labels[i] for i in indices]

index = CosineSimilarityIndex(article_data['vector'], article_data['id'])

similar_items_dict = {"item": [], "similar_items": []}
for x in range(len(article_data['vector'])):
    similar_items = index.query(article_data['vector'][x])
    similar_items_dict['item'].append(article_data['id'][x])
    similar_items_dict['similar_items'].append([item for item in similar_items if item != article_data['id'][x]])
similarities_df = pd.DataFrame(similar_items_dict)

def get_similar_items(item):
    similar_items = similarities_df.loc[similarities_df['item'] == item, 'similar_items'].iloc[0]
    return list(map(str, similar_items))

@app.route('/get_similar_items/<int:item>', methods=['GET'])
def get_similar_items_api(item):
    if item is None:
        return "Error: No item provided. Please specify an item."
    else:
        similar_items = get_similar_items(item)
        return similar_items

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)