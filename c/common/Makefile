CC := gcc
CFLAGS := -I. -Wall
SRC := $(wildcard *.c)
OBJ := $(addprefix obj/,$(notdir $(SRC:.c=.o))) 

PRACTICE_NAME := $(notdir $(shell pwd))

compile: $(OBJ)
	$(CC) $(CFLAGS) -c -o $@ $^

obj/%.o: %.c
	$(CC) $(CFLAGS) -c -o $@ $<

init:
	@make clean
	@rm -rf obj test.c
	@mkdir obj
	@echo "#include \"$(PRACTICE_NAME).h\"\n" > test.c
	@cat ../common/test/test.c >> test.c
	@echo "\nThis practice has been initialized. See the following test file.\n"
	@cat test.c

test: $(OBJ)
	make compile
	$(CC) $(CFLAGS) -o test $^ 
	./test

clean:
	@rm -rf obj/* test

.PHONY: init test clean
