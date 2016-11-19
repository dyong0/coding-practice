#pragma once

#include <stdbool.h>

typedef struct _listnode_t
{
	void* value;
	struct _listnode_t* pnext;
	struct _listnode_t* pprev;
} listnode_t;

typedef struct _list_t
{
	listnode_t* phead;
	listnode_t* ptail;
	int size;
} list_t;


list_t* create_list();
int size_list(list_t* plist);
bool empty_list(list_t* plist);
void* value_at_list(int index, list_t* plist);
void push_front_list(void* value, list_t* plist);
void push_back_list(void* value, list_t* plist);
void* pop_back_list(list_t* plist);
void* front_list(list_t* plist);
void* back_list(list_t* plist);
void insert_list(void* value, int index, list_t* plist);
void erase_list(int index, list_t* plist);
void* value_n_from_end(int rindex, list_t* plist);
void reverse_list(list_t* plist);
void remove_value_list(void* value, list_t* plist);
