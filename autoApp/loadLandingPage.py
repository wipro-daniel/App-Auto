import datetime
import pymongo
from pymongo import MongoClient
import matplotlib.pyplot as plt
import copy
import json





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
    query2 = {'_id':0,'Application name':1, 'Agent name':1,'Script name':1,'Output':1,'Raw Output':1,'Status':1,'Result':1,'Result Colour':1}
    result = collection.find(query,query2)
    #pieData = copy.deepcopy(result)
    #createCharts(pieData)
    parseToNode = []
    for row in result:
        parseToNode.append(row)
    print (json.dumps(parseToNode))

    


def createCharts(result):
    # Process the data so we can make a piechart
    counterGreen = 0
    counterRed = 0
    
    failedApplications = set()
    totalApplications = set()
    failedApp = {}
    for row in result:
        totalApplications.add(row["Application name"])
        if row["Result Colour"] == "Y" or row["Result Colour"] == "R":
            if row["Application name"] in failedApplications:
                failedApp[row["Application name"]] +=1
            else:
                failedApp[row["Application name"]] =1
            failedApplications.add(row["Application name"])
    print (failedApp)
    print (failedApp.values())

    #print (len(totalApplications),len(failedApplications))
    #print (counterGreen,counterRed,failedApplications)
    counterGreen = len(totalApplications) - len(failedApplications)
    counterRed = len(failedApplications)

    print (counterGreen,counterRed)
    
    # Create Overall Pie chart
    labels = ['Passed', 'Failed']
    sizes = [counterGreen,counterRed]
    colors = ['limegreen', 'red',]
    patches, texts = plt.pie(sizes, colors=colors, shadow=True, startangle=90)
    plt.legend(patches, labels, loc="best")
    plt.axis('equal')
    plt.tight_layout()
    plt.savefig("overallPassRate.png")

    # Create failed application piechart
    plt.title("Failed application distribution")
    plt.figure(figsize = [7,7])
    labels = list(failedApp.keys())
    sizes = list(failedApp.values())
    patches, texts = plt.pie(sizes, shadow=False, startangle=90)
    #plt.subplots_adjust(left=0.0,bottom=0.1,right=0.45)
    plt.legend(patches, labels,bbox_to_anchor =(1.05,1),loc="best",borderaxespad =0.)
    plt.axis('equal')
    plt.tight_layout()
    plt.savefig("redApplications.png")


loadData()
