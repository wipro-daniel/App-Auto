from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

def searchForContract(input,sheet):
    percentageChance = 0
    stop_words = set(stopwords.words('english'))
    temp_tokens = word_tokenize(input)
    word_tokens = [w for w in temp_tokens if not w in stop_words and w.isalpha()]
    filtered_input = [w for w in word_tokens if not w in stop_words]

    sheetTokens = []
    for row in sheet:
        if row[0] == None:
            break
        token = word_tokenize(row[0].lower())
        filteredRow = [w.lower() for w in token if not w in stop_words and w.isalpha()]
        sheetTokens.append(filteredRow)

    # Find the %
    for rowData in sheetTokens:
        lengthOfInput = len(rowData)
        counter = 0.0
        localPercentage = 0
        found = []
        for word in filtered_input:
            if word in rowData:
                counter += 1
        if counter > 1.0:
            localPercentage = (counter/lengthOfInput)*100.0
        if localPercentage > percentageChance:
            percentageChance = localPercentage

    if percentageChance >70:
        return True
    else:
        return False