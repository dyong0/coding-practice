#define TEST(name) void _test_##name ()
#define RUN_TEST(name) printf("[TEST]%s\n", #name); _test_##name()

