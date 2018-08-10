import json
from scripts.utils import excelUtil, formatExcel
outputJson = {
    "billit":{"Text": "BILLIT selected",
              "Options":
                  [{"Option": "Address amendment",
                    "SELECT":
                        [{"Text": "TEXT BOX"}]},
                   {"Option": "Other option",
                    "SELECT":
                        [{"Text": "TEXT BOX"}]}
                      ]},
    "sprite":{"Text":"SPRITE selected",
              "Options":
                  [{"Option": "MPAN amendment",
                    "SELECT":
                        [{"Text": "TEXT BOX"}]},
                   {"Option": "Hedgebook option",
                    "SELECT":
                        [{"Text": "TEXT BOX"}]}]},
    "address":{"Text": "TEXT BOX"},
    "mpan":{"Text": "TEXT BOX"},
    "hedgebook":{"Text": "TEXT BOX"},
    "amendment":
                  {"Text": "You have two options for amendment tickets",
                   "Options":
                       [{"Option": "BILLIT",
                         "SELECT":
                                [{"Text":"BILLIT selected",
                                "Options": [{"Option": "Address amendment",
                                             "SELECT":
                                                 [{"Text": "TEXT BOX"}]},
                                            {"Option": "Other option",
                                             "SELECT": [{"Text": "TEXT BOX"}]}
                                                        ]}]},
                        {"Option": "SPRITE",
                         "SELECT":
                                [{"Text":"SPRITE selected",
                                "Options": [{"Option": "MPAN amendment",
                                             "SELECT":
                                                 [{"Text": "TEXT BOX"}]},
                                            {"Option": "Hedgebook option",
                                             "SELECT":
                                                 [{"Text": "TEXT BOX"}]}
                                            ]}]}
                        ]
                   }

    }




# Input is lower case string
def deleteASAP(input):
    amendment = ["amendment", "mendment", "amend ment"]
    BILLIT =['billit', 'bill it', 'billlit']
    SPRITE = ["sprite"]
    Address = ["address", "addresses", "addr"]
    MPAN = ["mpan", "mpan amendment"]
    Hedgebook = ["hedgebook","hedge book"]
    HealthCheck = ["health check","health","check"]
    Colour = ["red","green"]
    Failure = ["failed","failures"]
    Success = ["passed","completed","green"]

    keywords = [amendment,BILLIT,SPRITE,Address,MPAN,Hedgebook,HealthCheck,Colour]

    currentJSONOutput = lookThroughLists(keywords,input)

    # Then a health check question
    if currentJSONOutput in Colour or currentJSONOutput in HealthCheck:
        colour = ""
        if currentJSONOutput not in Colour:
            for x in Failure:
                if x in input:
                    colour = "red"
            if colour == "":
                colour = "green"


            currentJSONOutput = colour
            
            new = []

            matchedKeywords = findKeywordMatches(keywords,input)
            sheet = excelUtil.importExcel("D:\\App-auto\\autoApp\\data\\HealthCheckDemo.xlsx")
            headers,formattedSheet = formatExcel.formatSheet(sheet)
            formattedSheet2 = formatExcel.selectSheetsSimple(headers,formattedSheet,colour)
            for x in Success:
                if x in input:
                    dontTake = formatExcel.selectSheetsComplex(headers,formattedSheet)
                    
                    for row in formattedSheet2:
                        if row[0] not in dontTake:
                            new.append(row)
            if new == []:
                new = formattedSheet2
        else:
            new = []

            matchedKeywords = findKeywordMatches(keywords,input)
            sheet = excelUtil.importExcel("D:\\App-auto\\autoApp\\data\\HealthCheckDemo.xlsx")
            headers,formattedSheet = formatExcel.formatSheet(sheet)
            formattedSheet2 = formatExcel.selectSheetsSimple(headers,formattedSheet,matchedKeywords)
            
            for x in Success:
                if x in input:
                    dontTake = formatExcel.selectSheetsComplex(headers,formattedSheet)
                    
                    for row in formattedSheet2:
                        if row[0] not in dontTake:
                            new.append(row)
            if new == []:
                new = formattedSheet2
                    
        test = formatExcel.createJsonFromSheet2(headers,new)
        tempBillit = {}
        tempBillit['BILLIT'] = test
        
        
                
        return (json.dumps(tempBillit))
        #return formatExcel.createJsonFromSheet(headers,new)



    # No matches found - send back JSON
    if currentJSONOutput == "":
         output = {
            "Error": "No matches found for this query - Can you reword your query - "
                     "This statement has been logged for manual review"}
         currentJSONOutput = [output]
         return json.dumps(currentJSONOutput)


    return json.dumps(outputJson[currentJSONOutput])


def lookThroughLists(lists,input):
    #print (lists)
    currentJSONOutput = ""
    for list in lists:
        for x in list:
            if x in input:
                currentJSONOutput = list[0]

    return currentJSONOutput

def findKeywordMatches(lists,input):
    matchingKeywords = []
    for list in lists:
        for value in list:
            if value in input:
                matchingKeywords.append(value)
    return matchingKeywords
