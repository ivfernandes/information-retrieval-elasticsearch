import pandas as pd
import requests

def calculate_mrr(rankings, relevant_items):
    mrr = 0.0
    for relevant_item in relevant_items:
        if relevant_item in rankings:
            rank = rankings.index(relevant_item) + 1
            mrr += 1.0 / rank
    if mrr > 0:
        mrr /= len(relevant_items)
    return mrr

def retriveResult(query, isV2):
    if isV2:
        url = "http://localhost:3000/api/search/v2?search="
    else: 
        url = "http://localhost:3000/api/search?search="
    
    url = url + str(query)
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print(f"A solicitação GET falhou com status {response.status_code}")

reference = pd.read_csv('reference.csv', delimiter=';')
querys = reference['query']
relevants = reference.drop(["query","title1","title2","title3","title4","title5","title6","title7","Unnamed: 15","Unnamed: 16"], axis=1)
relevants = relevants.fillna('')
for column in relevants.columns:
    relevants[column] = relevants[column].astype(str)

#V1
generalMRR = 0.0
cont = 0
for query in reference['query']:

    result = retriveResult(query, False)
    querysDocIds = [item["_id"] for item in result]
    relevantsDocsId = relevants.iloc[cont].to_list()
    relevantsDocsId =  [str(docId) for docId in relevantsDocsId if docId != '']

    print(querysDocIds)
    print(relevantsDocsId)
    mrr = calculate_mrr(querysDocIds, relevantsDocsId)
    print(f'MRR: {mrr:.5f}')
    generalMRR += mrr
    cont += 1

mrrv1 = generalMRR/len(reference['query'])


#V2
generalMRR = 0.0
cont = 0
for query in reference['query']:

    result = retriveResult(query, True)
    querysDocIds = [item["_id"] for item in result]
    relevantsDocsId = relevants.iloc[cont].to_list()
    relevantsDocsId =  [str(docId) for docId in relevantsDocsId if docId != '']

    print(querysDocIds)
    print(relevantsDocsId)
    mrr = calculate_mrr(querysDocIds, relevantsDocsId)
    print(f'MRR: {mrr:.5f}')
    generalMRR += mrr
    cont += 1

mrrv2 = generalMRR/len(reference['query'])
print(f'MRRV1: {mrrv1:.5f}')
print(f'MRRV2: {mrrv2:.5f}')
