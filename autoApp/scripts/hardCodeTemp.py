import json
from scripts.utils import excelUtil, formatExcel,mongoConn
from scripts.nlp import processSentences

outputJson = {
    "billit": {"Text": "BILLIT selected",
               "Options":
                   [{"Option": "Address amendment",
                     "SELECT":
                         [{"Text": "TEXT BOX"}]},
                    {"Option": "Other option",
                     "SELECT":
                         [{"Text": "TEXT BOX"}]}
                    ]},
    "sprite": {"Text": "SPRITE selected",
               "Options":
                   [{"Option": "MPAN amendment",
                     "SELECT":
                         [{"Text": "TEXT BOX"}]},
                    {"Option": "Hedgebook option",
                     "SELECT":
                         [{"Text": "TEXT BOX"}]}]},
    "address": {"Text": "TEXT BOX"},
    "mpan": {"Text": "TEXT BOX"},
    "hedgebook": {"Text": "TEXT BOX"},
    "amendment":
        {"Text": "You have two options for amendment tickets",
         "Options":
             [{"Option": "BILLIT",
               "SELECT":
                   [{"Text": "BILLIT selected",
                     "Options": [{"Option": "Address amendment",
                                  "SELECT":
                                      [{"Text": "TEXT BOX"}]},
                                 {"Option": "Other option",
                                  "SELECT": [{"Text": "TEXT BOX"}]}
                                 ]}]},
              {"Option": "SPRITE",
               "SELECT":
                   [{"Text": "SPRITE selected",
                     "Options": [{"Option": "MPAN amendment",
                                  "SELECT":
                                      [{"Text": "TEXT BOX"}]},
                                 {"Option": "Hedgebook option",
                                  "SELECT":
                                      [{"Text": "TEXT BOX"}]}
                                 ]}]}
              ]
         },
    "contract":
        {"SPRITE":
             [{"Text": "You have searched for a SPRITE contract status change. CTRS_CODE status (open/sent) first letter should be in CAPITAL","Labels": ["Enter Code","Enter CTRS_CODE:"]}]
        }
}


# Input is lower case string
def deleteASAP(input):
    import os
    full_path = os.path.realpath(__file__)
    path = (os.path.dirname(os.path.dirname(full_path)))
    folder = "data"
    fil = "HealthCheckDemo.xlsx"
    conFile = "contractStatusExamples.xlsx"
    file = (os.path.join(path, folder, fil))
    contractFile = (os.path.join(path, folder, conFile))


    amendment = ["amendment", "mendment", "amend ment"]
    BILLIT = ['billit', 'bill it', 'billlit']
    SPRITE = ["sprite"]
    Address = ["address", "addresses", "addr"]
    MPAN = ["mpan", "mpan amendment"]
    Hedgebook = ["hedgebook", "hedge book"]
    HealthCheck = ["health check", "health", "check","healthcheck"]
    Colour = ["red", "green"]
    Failure = ["failed", "failures"]
    Success = ["passed", "completed", "green"]

    keywords = [amendment, BILLIT, SPRITE, Address, MPAN, Hedgebook, HealthCheck, Colour]
    currentJSONOutput = lookThroughLists(keywords, input)

    contractStatements = excelUtil.importExcel(contractFile)
    if processSentences.searchForContract(input,contractStatements):
        return json.dumps(outputJson["contract"])
   # Healthy = HealthCheck + Failure + Success

    # Then a health check question
    if currentJSONOutput in Colour or currentJSONOutput in HealthCheck:
        #print ("Here")
        colour = ""
        if currentJSONOutput not in Colour:
            for x in Failure:
                if x in input:
                    colour = "red"
            if colour == "":
                colour = "green"

            currentJSONOutput = colour
            """
            new = []

            matchedKeywords = findKeywordMatches(keywords, input)
            # MONGODB Data is a list of Dictionaries
            data = mongoConn.connect()
            newData = []
            newData.append(obj.keys())
            for obj in data:
                newData.append(obj.values())
                
                
            #sheet = excelUtil.importExcel(file)
            headers, formattedSheet = formatExcel.formatSheet(newData)
            formattedSheet2 = formatExcel.selectSheetsSimple(headers, formattedSheet, colour)
            for x in Success:
                if x in input:
                    dontTake = formatExcel.selectSheetsComplex(headers, formattedSheet)

                    for row in formattedSheet2:
                        if row[0] not in dontTake:
                            new.append(row)
            if new == []:
                new = formattedSheet2
                """
        if True:
            new = []

            matchedKeywords = findKeywordMatches(keywords, input)
            matchedKeywords = colour
            # MONGODB Data is a list of Dictionaries
            data = mongoConn.connect()
            newData = []
            temp = list(data[0].keys())
            counter = 0
            newTemp = []
            for x in temp:          
                if counter == 0 or counter == len(temp)-1:
                    pass
                else:
                    newTemp.append(x)
                counter +=1                
            newData.append(newTemp)
            for obj in data:
                temp = (list(obj.values()))
                counter = 0
                newTemp = []
                for x in temp:
                    if counter == 0 or counter == len(temp)-1:
                        pass
                    else:
                        newTemp.append(x)
                    counter +=1
                newData.append(newTemp)
            
                    
            #print (newData)
            #sheet = excelUtil.importExcel(file)
            headers, formattedSheet = formatExcel.formatSheet(newData)
            formattedSheet2 = formatExcel.selectSheetsSimple(headers, formattedSheet, matchedKeywords)

            for x in Success:
                if x in input:
                    dontTake = formatExcel.selectSheetsComplex(headers, formattedSheet)

                    for row in formattedSheet2:
                        if row[0] not in dontTake:
                            new.append(row)
            if new == []:
                new = formattedSheet2

        test = formatExcel.createJsonFromSheet3(headers, new)
        #tempBillit = {}
        #tempBillit['BILLIT'] = test

        return (json.dumps(test))
        # return formatExcel.createJsonFromSheet(headers,new)

    # No matches found - send back JSON
    if currentJSONOutput == "":
        output = {
            "Error": "No matches found for this query - Can you reword your query - "
                     "This statement has been logged for manual review"}
        currentJSONOutput = [output]
        return json.dumps(currentJSONOutput)

    return json.dumps(outputJson[currentJSONOutput])


def lookThroughLists(lists, input):
    # print (lists)
    currentJSONOutput = ""
    for list in lists:
        for x in list:
            if x in input:
                currentJSONOutput = list[0]

    return currentJSONOutput


def findKeywordMatches(lists, input):
    matchingKeywords = []
    for list in lists:
        for value in list:
            if value in input:
                matchingKeywords.append(value)
    return matchingKeywords
