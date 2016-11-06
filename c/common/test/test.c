#include "../common/test/test_macro.h"

#include <stdio.h>
#include <assert.h>

TEST(sample_test) {
	assert(3 == 4);
}

int main()
{
	RUN_TEST(sample_test);
}
