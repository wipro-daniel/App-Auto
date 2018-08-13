import sys
import scripts.nlp.findKeywords
import scripts.hardCodeTemp

def processInput():
    test = False
    hardCode = True
    lines = ''
    
    # Wait for data to be sent from node module (Which should be taken from angular)
    if test:
        lines = ["","Proposal 0079815586 Please change proposal and account 76150001 status to Sent as this account needs to be Rejected"]
    else:
        lines = sys.argv
    
    # Check that Node has given a answer that can be processed
    if len(lines) > 1:
        lines = lines[1].lower()
        # Convert to lowercase - NLP does not process capital letters
        
        if hardCode:
            print (scripts.hardCodeTemp.deleteASAP(lines))
        else:
            json = scripts.nlp.findKeywords.processStatement(lines)
            print (json)
    else:
        print ("Data is not possible to process")

processInput()
