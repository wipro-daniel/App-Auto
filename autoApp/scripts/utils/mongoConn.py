import pymongo
from pymongo import MongoClient

def connect():
    client = MongoClient('localhost',27017)
    # Connect to HCData
    db = client.Hcdata
    # Connect to the correct collection
    collection = db.posts

    # Returning a list of dictionaries with all the data in it
    return collection.find()



    #for obj in collection.find():
     #   print (obj)
    #obj = next(result, None)
    #print (obj)

# Data is reset - Remove after landing page is working
def fillDB(dbData):
    client = MongoClient('localhost',27017)
    # Connect to HCData
    db = client.Hcdata
    # Connect to the correct collection
    collection = db.ahc
    collection.delete_many({})
    #result = collection.insert_one(dbData[0])
    result = collection.insert_many(dbData)
