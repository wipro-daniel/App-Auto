from anytree import Node, RenderTree
def createTree(root,children):
    decisionRoot = Node(root)
    for x in range(len(children)):
        children[x] = Node(children[x],parent = decisionRoot)

    return decisionRoot



def printTree(tree):
    print (tree)

