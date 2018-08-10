# These words will signify a specific category of decision tree to send to Node
def categorisingKeywords():
    keywords = {
        'Amendment ticket': ["amendment","mendment","amend ment"],
        'ticket': ["test", "mendment", "amend ment"]
    }

    return keywords

def getAmendmentTicketOptions():
    keywords = {
        'address amendment': ["address","addresses","addr"],
        'MPAN amendment': ["mpan","mpan amendment"]
    }
    return keywords

def nextCategory():
    keywords = {
        'Amendment ticket': {'BILLIT':['billit','bill it','billlit'],
                             'SPRITE':["sprite"],
                             'Address amendment': ["address", "addresses", "addr"],
                             'MPAN amendment': ["mpan", "mpan amendment"]}


    }
    return keywords