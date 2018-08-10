from scripts.nlp import tree
from anytree import Node, RenderTree

# Creating a basic tree from strings works
def testTreeCreation():
    root = "Amendment"
    children = ["SPRITE","BILLIT"]
    testTree = tree.createTree(root,children)
    print(RenderTree(testTree))

    mpan = Node("MPAN Amendment")
    mpan.parent = testTree.descendants



    #testTree2 = tree.createTree(children[0],["MPAN amendment"])
    print(RenderTree(mpan))


testTreeCreation()