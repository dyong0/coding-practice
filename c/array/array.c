#include "array.h"

#include <stdlib.h>
#include <string.h>

const int DEFAULT_ARR_ELEM_SIZE = 4;
const int DEFAULT_ARR_CAPACITY = 16;

void _resize_array(array_t* arr, int capacity);
int _size_to_capacity(int size);
void _resize_array_if_needed(int size, array_t* arr);
int _rfind_array(void* elem, int from, array_t* arr);	

array_t* create_array(int size, int elem_size)
{
	array_t* arr = (array_t*)malloc(sizeof(array_t));	

	arr->size = size;

	int capacity = _size_to_capacity(size);

	arr->capacity = capacity;
	arr->elem_size = elem_size;
	arr->elems = (void**)malloc(elem_size * capacity);	

	return arr;
}

int get_size_array(array_t* arr)
{
	return arr->size;	
}

int get_capacity_array(array_t* arr)
{
	return arr->capacity;	
}

void push_array(void* elem, array_t* arr)
{
	_resize_array_if_needed(arr->size, arr);

	arr->elems[arr->size] = elem;

	arr->size++;
}

void* at_array(int at, array_t* arr)
{
	return arr->elems[at];
}

void insert_array(void* elem, int at, array_t* arr)
{
	_resize_array_if_needed(arr->size+1, arr);

	memcpy(arr->elems+at+1, arr->elems+at, (arr->size-at)*arr->elem_size);

	arr->elems[at] = elem;

	arr->size++;
}

void prepend_array(void* elem, array_t* arr)
{
	insert_array(elem, 0, arr);
}

void* pop_array(array_t* arr)
{
	arr->size--;

	return arr->elems[arr->size];
}

void delete_array(int at, array_t* arr)
{
	if(arr->size < arr->capacity){
		memcpy(arr->elems+at, arr->elems+at+1, (arr->size-1-at)*arr->elem_size);
	}
	
	_resize_array_if_needed(arr->size-1, arr);

	arr->size--;
}

void remove_array(void* elem, array_t* arr)
{
	int at = arr->size;
	while((at = _rfind_array(elem, at-1, arr)) != -1)
	{
		delete_array(at, arr);
	}
}

int find_array(void* elem, array_t* arr)
{
	int index = 0;
	while(index < arr->size && arr->elems[index] != elem) index++;

	return index != arr->size ? index : -1;
}

void _resize_array(array_t* arr, int capacity)
{
	void** new_elems = (void**)malloc(capacity*arr->elem_size);

	memcpy(new_elems, arr->elems, arr->size * arr->elem_size);
	free(arr->elems);

	arr->elems = new_elems;
}

int _size_to_capacity(int size)
{
	int capacity = DEFAULT_ARR_CAPACITY;
	while(capacity < size) capacity <<= 1;

	return capacity;
}

void _resize_array_if_needed(int size, array_t* arr)
{
	if(arr->capacity > DEFAULT_ARR_CAPACITY && size <= arr->capacity/4){
		_resize_array(arr, _size_to_capacity(size));
		return;
	}

	if(size < arr->capacity) return;

	_resize_array(arr, _size_to_capacity(size));
}

int _rfind_array(void* elem, int from, array_t* arr)
{
	int index = from;
	while(index >= 0 && arr->elems[index] != elem) index--;

	return index;
}
