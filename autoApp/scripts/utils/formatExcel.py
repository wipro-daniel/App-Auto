import json
def formatSheet(sheet):
    counter = 0
    headers = []
    currentApp = ""
    newSheet = []
    redSigns = ["Not Completed","No jobs are in error"]

    for row in sheet:

        # Find headers just incase
        if counter == 0:
            headers = row
        else:
            if row[0] != None:
                currentApp = row[0]
            else:
                row[0] = currentApp
            #if row[2] in redSigns:
             #   row.append("Red")
            #else:
             #   row.append("Green")
            newSheet.append(row)
        counter += 1

    # Adding status is for now
    #headers.append("Status")
    return headers,newSheet

def createJsonFromSheet(headers,sheets):
    jsonStorage = []
    currentApplication = ""

    appDict = {}
    applicationStorage = []
    counter = 0

    for row in sheets:
        # If the rows are in a new application type
        if currentApplication != row[0]:
            # Set the dictionary entry to the application dictionary
            if counter !=0:
                appDict[currentApplication] = applicationStorage
                applicationStorage = []
            # If its the first row - set a application
            currentApplication = row[0]
        newDict = {}
        for header in range(len(headers)):
            newDict[headers[header]] = row[header]
        applicationStorage.append(newDict)
        counter +=1
    # Then there is only one instance of values
    if sheets != []:
        appDict[currentApplication] = applicationStorage

    #print (appDict)
    jsonStorage.append(appDict)

    return (json.dumps(jsonStorage))

# This gives the application name as first in the data
def createJsonFromSheet2(headers,sheets):
    jsonStorage = []
    currentApplication = ""

    appDict = {}
    applicationStorage = []
    counter = 0

    for row in sheets:
        # If the rows are in a new application type
        if currentApplication != row[0]:
            # Set the dictionary entry to the application dictionary
            if counter !=0:
                appDict[currentApplication] = applicationStorage
                applicationStorage = []
            # If its the first row - set a application
            currentApplication = row[0]
        newDict = {}
        for header in range(len(headers)):
            newDict[headers[header]] = row[header]
        applicationStorage.append(newDict)
        counter +=1
    # Then there is only one instance of values
    if sheets != []:
        appDict[currentApplication] = applicationStorage

    #print (appDict)
    jsonStorage.append(appDict)

    return jsonStorage

def createJsonFromSheet3(headers,sheets):
    jsonStorage = []
    currentApplication = ""
    colour = sheets[0][3].upper()
    appDict = {}
    applicationStorage = []
    counter = 0

    for row in sheets:
        newDict = {}
        for header in range(len(headers)):
            newDict[headers[header]] = row[header]
        applicationStorage.append(newDict)
        counter +=1
    # Then there is only one instance of values
    if sheets != []:
        appDict[colour] = applicationStorage

    #print (appDict)
    jsonStorage.append(appDict)

    return jsonStorage

def selectSheets(headers,sheets,requirements):
    selectedRows = []
    for row in sheets:
        for value in row:
            # If a match is found
            if value.lower() in requirements:
                selectedRows.append(row)
                break

def selectSheetsSimple(headers,sheets,requirements):
    selectedRows = []
    for row in sheets:
        if row[len(row)-1].lower() in requirements:
            selectedRows.append(row)
    #print selectedRows
    return selectedRows

def selectSheetsComplex(headers,sheets):
    selectedRows = []
    dontTake = []
    for row in sheets:
        if row[len(row)-1].lower() == "red":
            dontTake.append(row[0])
    return dontTake





