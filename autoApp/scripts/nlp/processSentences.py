import nltk
#nltk.data.path.append()
nltk.download("punkt")

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize




def searchForContract(input,sheet):
    percentageChance = 0
    lengthOfInput = len(input)
    print (sheet)

    stop_words = set(stopwords.words('english'))

    word_tokens = word_tokenize(input)

    sheetTokens = []
    for row in sheet:
        test = row
        if test[0] == None:
            break
        token = word_tokenize(test[0])
        filteredRow = [w for w in token if not w in stop_words]
        sheetTokens.append(filteredRow)




    filtered_sentence = [w for w in word_tokens if not w in stop_words]


    for row in sheetTokens:
        counter = 0
        localPercentage = 0
        for word in filtered_sentence:
            if word in row:
                counter += 1
        localPercentage = (lengthOfInput/counter)*100
        if localPercentage > percentageChance:
            percentageChance = localPercentage



    print(word_tokens)
    print(filtered_sentence)

    print (sheet)
    print (sheetTokens)


    if percentageChance >70:
        return True
    else:
        return False