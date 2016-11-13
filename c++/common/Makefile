CC := g++
CFLAGS := -I. -Wall -std=c++11
SRC := $(wildcard *.cpp)
OBJ := $(addprefix obj/,$(notdir $(SRC:.cpp=.o))) 

PRACTICE_NAME := $(notdir $(shell pwd))

compile: $(OBJ)
	$(CC) $(CFLAGS) -c -o $@ $^

obj/%.o: %.cpp
	$(CC) $(CFLAGS) -c -o $@ $<

init:
	@make clean
	@rm -rf obj test.cpp
	@mkdir obj
	@echo "#include \"$(PRACTICE_NAME).h\"\n" > test.cpp
	@cat ../common/test/test.cpp >> test.cpp
	@echo "\nThis practice has been initialized. See the following test file.\n"
	@cat test.cpp

test: $(OBJ)
	make compile
	$(CC) $(CFLAGS) -o test $^ 
	./test

clean:
	@rm -rf obj/* test

.PHONY: init test clean
