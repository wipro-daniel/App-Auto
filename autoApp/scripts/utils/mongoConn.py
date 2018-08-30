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
