import scripts.nlp.keys
import scripts.nlp.jsonStatements
def processStatement(input):
    keywords = keys.categorisingKeywords()
    bestCount = 0
    bestKey = ""
    for key in keywords:
        count = 0
        for word in keywords[key]:
            if word in input:
                print ("Keyword match found!: ",word)
                count += 1
        if count > bestCount:
            bestCount = count
            bestKey = key

    if bestCount == 0:
        return jsonStatements.noMatch()

    # Find the key with the most amount of matches:
    try:
        nextCategory = keys.nextCategory()
        newKeywords = nextCategory[bestKey]
        bestCount = 0
        bestKey = ""
        for key in newKeywords:
            count = 0
            for word in newKeywords[key]:
                if word in input:
                    print ("Keyword match found!: ", word)
                    count += 1
            if count > bestCount:
                bestCount = count
                bestKey = key

        if bestCount == 0:
            print ("No matches found on second level - Ask default question structure")
        else:
            print ("Match found on second level - ask questions only after second level match")
    except:
        print ("No category found for this input - return current iteration")

    return ""



