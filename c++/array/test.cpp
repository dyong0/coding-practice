#include "array.h"

#include "../common/test/test_macro.h"

#include <stdio.h>
#include <assert.h>

extern const int DEFAULT_ARR_SIZE;

TEST(automatic_sizing)
{
	Array<int> arr;
	arr.push(10);

	assert(1 == arr.size());
}

TEST(initial_size)
{
	Array<int> arr(20);

	assert(0 == arr.size());
}

TEST(capacity)
{
	Array<int> arr;

	assert(DEFAULT_ARR_SIZE == arr.capacity());
}

TEST(at)
{
	Array<int> arr;
	arr.push(10);

	assert(10 == arr.at(0));
}

TEST(push)
{
	Array<int> arr;
	arr.push(10);

	assert(10 == arr.at(0));
	assert(1 == arr.size());
}

TEST(insert)
{
	Array<int> arr;
	arr.push(1);
	arr.push(3);
	arr.insert(1, 2);

	assert(2 == arr.at(1));
	assert(3 == arr.size());
}

TEST(prepend)
{
	Array<int> arr;
	arr.push(10);
	arr.prepend(1);

	assert(1 == arr.at(0));
	assert(2 == arr.size());
}

TEST(pop)
{
	Array<int> arr;
	arr.push(10);

	assert(10 == arr.pop());
	assert(0 == arr.size());
}

TEST(erase)
{
	Array<int> arr;
	arr.push(10);
	arr.push(20);
	arr.erase(0);

	assert(1 == arr.size());
	assert(20 == arr.at(0));
}

TEST(remove)
{
	Array<int> arr;
	arr.push(10);
	arr.push(20);
	arr.push(10);
	arr.remove(10);

	assert(20 == arr.at(0));
	assert(1 == arr.size());
}

TEST(find_found)
{
	Array<int> arr;
	arr.push(10);
	arr.push(20);
	arr.push(10);

	assert(0 == arr.find(10));
}

TEST(find_not_found)
{
	Array<int> arr;
	arr.push(10);
	arr.push(20);
	arr.push(10);

	assert(-1 == arr.find(30));
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
	RUN_TEST(erase);
	RUN_TEST(remove);
	RUN_TEST(find_found);
	RUN_TEST(find_not_found);
}
