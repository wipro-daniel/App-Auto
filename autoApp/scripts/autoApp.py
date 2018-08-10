import sys
import nlp.findKeywords
import hardCodeTemp

def processInput():
    test = True
    hardCode = True
    # Wait for data to be sent from node module (Which should be taken from angular)
    if test:
        lines = "systems that are green"
    else:
        lines = sys.argv


    # Check that Node has given a answer that can be processed
    if len(lines) > 1:
        # Convert to lowercase - NLP does not process capital letters
        lines = lines.lower()
        if hardCode:
            print (hardCodeTemp.deleteASAP(lines))
        else:
            json = nlp.findKeywords.processStatement(lines)
            print (json)


    else:
        print ("Data is not possible to process")

processInput()