import datetime
import pymongo
from pymongo import MongoClient




def loadData():
    now = datetime.date.today()
    now = datetime.datetime.combine(now,datetime.time())

    client = MongoClient('localhost',27017)
    # Connect to HCData
    db = client.Hcdata
    # Connect to the correct collection
    collection = db.ahc

    #result = collection.find("{'Created date': {'$gte' : new ISODate('2017-07-15 07:27:41.497Z'}}")
    query = {'Created date' : {'$gte': now}}
    result = collection.find(query)

    parseToNode = []
    for row in result:
        parseToNode.append(row)
    print (parseToNode)

    






loadData()
