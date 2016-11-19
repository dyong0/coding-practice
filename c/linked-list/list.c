#include "list.h"

#include <stdlib.h>

listnode_t* _create_node(void* value);
listnode_t* _node_at(int index, listnode_t* pstart_node);
void _delete_node(listnode_t* pnode, list_t* plist);

list_t* create_list()
{
	list_t* plist = (list_t*)malloc(sizeof(list_t));
	plist->ptail = NULL;
	plist->phead = NULL;
	plist->size = 0;

	return plist;
}

int size_list(list_t* plist)
{
	return plist->size;
}

bool empty_list(list_t* plist)
{
	return 0 == plist->size;
}

void* value_at_list(int index, list_t* plist)
{
	if(index >= plist->size) return NULL;

	listnode_t* pnode = _node_at(index, plist->phead);

	if(pnode == NULL) return NULL;

	return pnode->value;
}

void push_front_list(void* value, list_t* plist)
{
	listnode_t* pnew_node = _create_node(value);

	if(plist->size == 0)
	{
		plist->phead = pnew_node;
	}
	else
	{
		pnew_node->pnext = plist->phead;
		plist->phead->pprev = pnew_node;
	}

	plist->phead = pnew_node;

	plist->size++;
}

void push_back_list(void* value, list_t* plist)
{
	listnode_t* pnew_node = _create_node(value);

	if(plist->size == 0)
	{
		plist->phead = pnew_node;
	}
	else
	{
		pnew_node->pprev = plist->ptail;
		plist->ptail->pnext = pnew_node;
	}

	plist->ptail = pnew_node;

	plist->size++;
}

void* pop_back_list(list_t* plist)
{
	if(plist->size == 0 || plist->ptail == NULL) return NULL;

	void* pvalue = plist->ptail->value;
	_delete_node(plist->ptail, plist);

	return pvalue;
}

void* front_list(list_t* plist)
{
	if(plist->phead == NULL) return NULL;

	return plist->phead->value;
}

void* back_list(list_t* plist)
{
	if(plist->ptail == NULL) return NULL;

	return plist->ptail->value;
}

void insert_list(void* value, int index, list_t* plist)
{
	listnode_t* pnext = _node_at(index, plist->phead);

	if(pnext == NULL) return;

	listnode_t* pnew_node = _create_node(value);

	pnext->pprev->pnext = pnew_node;
	pnew_node->pprev = pnext->pprev;
	pnew_node->pnext = pnext;
	pnext->pprev = pnew_node;

	plist->size++;
}

void erase_list(int index, list_t* plist)
{
	listnode_t* pnode_to_erase = _node_at(index, plist->phead);		

	if(pnode_to_erase == NULL) return;

	_delete_node(pnode_to_erase, plist);
}

void* value_n_from_end(int rindex, list_t* plist)
{
	if(plist->ptail == NULL) return NULL;

	listnode_t* pnode = plist->ptail;
	for(int i=rindex; pnode != NULL && i > 0; i--)
	{
		pnode = pnode->pprev;
	}

	return pnode->value; 
}

void reverse_list(list_t* plist)
{
	if(plist->phead == NULL || plist->size == 0) return;

	listnode_t* pnode = plist->phead;
	plist->ptail = pnode;
	while(pnode != NULL)
	{
		listnode_t* pnext = pnode->pnext;
		pnode->pnext = pnode->pprev;
		pnode->pprev = pnext;

		if(pnext == NULL) plist->phead = pnode;

		pnode = pnext;
	}
}

void remove_value_list(void* value, list_t* plist)
{
	if(plist->phead == NULL || plist->size == 0) return;

	listnode_t* pnode = plist->phead;
	while(pnode != NULL)
	{
		if(pnode->value == value) 
		{
			_delete_node(pnode, plist);

			return;
		}

		pnode = pnode->pprev;
	}
}

listnode_t* _create_node(void* value)
{
	listnode_t* pnew_node = (listnode_t*)malloc(sizeof(listnode_t));
	pnew_node->value = value;
	pnew_node->pnext = NULL;
	pnew_node->pprev = NULL;

	return pnew_node;
}

listnode_t* _node_at(int index, listnode_t* pstart_node)
{
	listnode_t* pnode = pstart_node;	
	for(int i=0; pnode != NULL && i < index; ++i)
	{
		pnode = pnode->pnext;
	}

	return pnode;
}

void _delete_node(listnode_t* pnode, list_t* plist)
{
	if(pnode == NULL) return;

	if(pnode->pprev != NULL) pnode->pprev->pnext = pnode->pnext;
	if(pnode->pnext != NULL) pnode->pnext->pprev = pnode->pprev;

	if(plist->phead == pnode) plist->phead = plist->phead->pnext != NULL ? plist->phead->pnext : NULL;
	if(plist->ptail == pnode) plist->ptail = plist->ptail->pprev != NULL ? plist->ptail->pprev : NULL;

	plist->size--;

	free(pnode);
}
