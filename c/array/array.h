#pragma once

typedef struct _array_t
{
	int size;
	int capacity;
	int elem_size;

	void** elems;
} array_t;

extern const int DEFAULT_ARR_ELEM_SIZE;
extern const int DEFAULT_ARR_CAPACITY;

array_t* create_array(int size, int elem_size);
int get_size_array(array_t* arr);
int get_capacity_array(array_t* arr);
void push_array(void* elem, array_t* arr);
void* at_array(int at, array_t* arr);
void insert_array(void* elem, int at, array_t* arr);
void prepend_array(void* elem, array_t* arr);
void* pop_array(array_t* arr);
void delete_array(int at, array_t* arr);
void remove_array(void* elem, array_t* arr);
int find_array(void* elem, array_t* arr);
