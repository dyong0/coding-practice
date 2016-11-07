#include "array.h"

#include "../common/test/test_macro.h"

#include <stdio.h>
#include <assert.h>

extern const int DEFAULT_ARR_ELEM_SIZE;
extern const int DEFAULT_ARR_CAPACITY;

TEST(automatic_sizing)
{
	array_t* arr = create_array(0, DEFAULT_ARR_ELEM_SIZE);
	push_array((void*)10, arr);

	assert(1 == get_size_array(arr));
}

TEST(initial_size)
{
	array_t* arr = create_array(20, DEFAULT_ARR_ELEM_SIZE);

	assert(20 == get_size_array(arr));
}

TEST(capacity)
{
	array_t* arr = create_array(20, DEFAULT_ARR_ELEM_SIZE);

	assert(32 == get_capacity_array(arr));
}

TEST(at)
{
	array_t* arr = create_array(0, DEFAULT_ARR_ELEM_SIZE);
	push_array((void*)10, arr);

	assert((void*)10 == at_array(0, arr));
}

TEST(push)
{
	array_t* arr = create_array(0, DEFAULT_ARR_ELEM_SIZE);
	push_array((void*)10, arr);

	assert((void*)10 == at_array(0, arr));
	assert(1 == get_size_array(arr));
}

TEST(insert)
{
	array_t* arr = create_array(0, DEFAULT_ARR_ELEM_SIZE);
	push_array((void*)1, arr);
	push_array((void*)3, arr);
	insert_array((void*)2, 1, arr);

	assert((void*)2 == at_array(1, arr));
	assert(3 == get_size_array(arr));
}

TEST(prepend)
{
	array_t* arr = create_array(0, DEFAULT_ARR_ELEM_SIZE);
	push_array((void*)10, arr);
	prepend_array((void*)1, arr);

	assert((void*)1 == at_array(0, arr));
	assert(2 == get_size_array(arr));
}

TEST(pop)
{
	array_t* arr = create_array(0, DEFAULT_ARR_ELEM_SIZE);
	push_array((void*)10, arr);

	assert((void*)10 == pop_array(arr));
	assert(0 == get_size_array(arr));
}

TEST(delete)
{
	array_t* arr = create_array(0, DEFAULT_ARR_ELEM_SIZE);
	push_array((void*)10, arr);
	push_array((void*)20, arr);
	delete_array(0, arr);

	assert((void*)20 == at_array(0, arr));
	assert(1 == get_size_array(arr));
}

TEST(remove)
{
	array_t* arr = create_array(0, DEFAULT_ARR_ELEM_SIZE);
	push_array((void*)10, arr);
	push_array((void*)20, arr);
	push_array((void*)10, arr);
	remove_array((void*)10, arr);

	assert((void*)20 == at_array(0, arr));
	assert(1 == get_size_array(arr));
}

TEST(find_found)
{
	array_t* arr = create_array(0, DEFAULT_ARR_ELEM_SIZE);
	push_array((void*)10, arr);
	push_array((void*)20, arr);
	push_array((void*)10, arr);

	assert(0 == find_array((void*)10, arr));
}

TEST(find_not_found)
{
	array_t* arr = create_array(0, DEFAULT_ARR_ELEM_SIZE);
	push_array((void*)10, arr);
	push_array((void*)20, arr);
	push_array((void*)10, arr);

	assert(-1 == find_array((void*)30, arr));
}

int main()
{
	RUN_TEST(automatic_sizing);
	RUN_TEST(initial_size);
	RUN_TEST(capacity);
	RUN_TEST(at);
	RUN_TEST(push);
	RUN_TEST(insert);
	RUN_TEST(prepend);
	RUN_TEST(pop);
	RUN_TEST(delete);
	RUN_TEST(remove);
	RUN_TEST(find_found);
	RUN_TEST(find_not_found);
}
