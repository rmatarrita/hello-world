#include <iostream>
#include <fstream>
#include <vector>
#include <stack>
#include <list>
#include <map>
#include <string>
#include <ctype.h>

using namespace std;

/* A binary tree node has data, pointer to left child 
and a pointer to right child */
struct Node 
{ 
	int data; 
	struct Node* left, *right; 
	Node(int data) 
	{ 
		this->data = data; 
		left = right = NULL; 
	} 
}; 

/* Given a binary tree, print its nodes according to the 
"bottom-up" postorder traversal. */

std::map<int,list<int>> listOfLevels;

void treeListOfDepths(struct Node* node, int level) 
{ 
    if (node == NULL) 
		return; 
    list<int>* currentLevel = &listOfLevels[level];
    currentLevel->push_back(node->data);
	treeListOfDepths(node->left, level+1); 
	treeListOfDepths(node->right, level+1); 
} 

void treeListBreadFirstSearch(struct Node* node)
{
	list<list<Node*>*> levels;
	list<Node*> *nextLevel = new list<Node*>();

	nextLevel->push_back(node);
	while (nextLevel->size() > 0)
	{
		levels.push_back(nextLevel);
		list<Node*> *currentLevel = nextLevel;
		nextLevel = new list<Node*>();
		for (list<Node*>::const_iterator it = currentLevel->begin(); it != currentLevel->end(); it++)
		{
			//struct Node* current = *it;
			if ((*it)->left != NULL)
			{
				nextLevel->push_back((*it)->left);
			}
			if ((*it)->right != NULL)
			{
				nextLevel->push_back((*it)->right);
			}
		}
	}
}

/* Driver program to test above functions*/
int main() 
{ 
    string pause;

	struct Node *root = new Node(1); 
	root->left			 = new Node(2); 
	root->right		 = new Node(3); 
	root->left->left	 = new Node(4); 
	root->left->right = new Node(5); 

	cout << "\nCreation of lists:\n"; 

	treeListOfDepths(root, 1); 

	treeListBreadFirstSearch(root);

    map<int, list<int>>::iterator it;
    for (it = listOfLevels.begin(); it != listOfLevels.end(); it++)
    {
        cout << "Level:" << it->first << " \n"; 
        list<int>::const_iterator it2;
        for (it2 = it->second.begin(); it2 != it->second.end(); it2++)
        {
            cout << *it2 << ",";
        }
        cout << "\n";
    }

    std::cin >> pause;
	return 0; 
} 

