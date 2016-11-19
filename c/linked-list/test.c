#include "list.h"

#include "../common/test/test_macro.h"

#include <stdio.h>
#include <assert.h>

TEST(automatic_sizing)
{
	list_t* plist = create_list();
	push_back_list((void*)10, plist);

	assert(1 == size_list(plist));
}

TEST(empty)
{
	list_t* plist = create_list();

	assert(true == empty_list(plist));

	push_back_list((void*)10, plist);

	assert(false == empty_list(plist));
}

TEST(value_at)
{
	list_t* plist = create_list();
	push_back_list((void*)10, plist);

	assert((void*)10 == value_at_list(0, plist));
}

TEST(push_back)
{
	list_t* plist = create_list();
	push_back_list((void*)10, plist);
	push_back_list((void*)20, plist);
	push_back_list((void*)30, plist);

	assert((void*)10 == value_at_list(0, plist));
	assert((void*)20 == value_at_list(1, plist));
	assert((void*)30 == value_at_list(2, plist));
	assert(3 == size_list(plist));
}

TEST(push_front)
{
	list_t* plist = create_list();
	push_front_list((void*)10, plist);
	push_front_list((void*)20, plist);
	push_front_list((void*)30, plist);

	assert((void*)30 == value_at_list(0, plist));
	assert((void*)20 == value_at_list(1, plist));
	assert((void*)10 == value_at_list(2, plist));
	assert(3 == size_list(plist));
}

TEST(insert)
{
	list_t* plist = create_list();
	push_back_list((void*)1, plist);
	push_back_list((void*)3, plist);
	insert_list((void*)2, 1, plist);

	assert((void*)2 == value_at_list(1, plist));
	assert(3 == size_list(plist));
}

TEST(pop_back)
{
	list_t* plist = create_list();
	push_back_list((void*)10, plist);

	assert((void*)10 == pop_back_list(plist));
	assert(0 == size_list(plist));
}

TEST(front)
{
	list_t* plist = create_list();
	push_back_list((void*)1, plist);
	push_back_list((void*)3, plist);

	assert((void*)1 == front_list(plist));
}

TEST(back)
{
	list_t* plist = create_list();
	push_back_list((void*)1, plist);
	push_back_list((void*)3, plist);

	assert((void*)3 == back_list(plist));
}

TEST(erase)
{
	list_t* plist = create_list();
	push_back_list((void*)1, plist);
	push_back_list((void*)3, plist);
	erase_list(1, plist);

	assert((void*)1 == back_list(plist));
}

TEST(value_n_from_end)
{
	list_t* plist = create_list();
	push_back_list((void*)1, plist);
	push_back_list((void*)3, plist);

	assert((void*)1 == value_n_from_end(1, plist));
}

TEST(reverse)
{
	list_t* plist = create_list();
	push_back_list((void*)1, plist);
	push_back_list((void*)2, plist);
	push_back_list((void*)3, plist);

	reverse_list(plist);

	assert((void*)3 == value_at_list(0, plist));
	assert((void*)2 == value_at_list(1, plist));
	assert((void*)1 == value_at_list(2, plist));
}

TEST(remove)
{
	list_t* plist = create_list();
	push_back_list((void*)10, plist);
	push_back_list((void*)20, plist);
	push_back_list((void*)10, plist);
	remove_value_list((void*)10, plist);

	assert((void*)20 == value_at_list(0, plist));
	assert(2 == size_list(plist));
}

int main()
{
	RUN_TEST(automatic_sizing);
	RUN_TEST(empty);
	RUN_TEST(value_at);
	RUN_TEST(push_back);
	RUN_TEST(push_front);
	RUN_TEST(insert);
	RUN_TEST(pop_back);
	RUN_TEST(front);
	RUN_TEST(back);
	RUN_TEST(erase);
	RUN_TEST(value_n_from_end);
	RUN_TEST(reverse);
	RUN_TEST(remove);
}
