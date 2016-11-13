#pragma once

#include <string.h>

static const int DEFAULT_ARR_SIZE = 32;

template <typename T>
class Array
{
	public:
		Array();
		Array(int size);
		~Array();
		int size();
		int capacity();
		void push(T item);
		T at(int index);
		T pop();
		void insert(int index, T item);
		void prepend(T item);
		void erase(int index);
		void remove(T item);
		int find(T item);
		void resize(int newCapacity);

	private:
		T* _items;
		int _size;
		int _capacity;

		void _shift(int index, int diff);
		void _resize_if_needed(int newSize);
};


	template <typename T>
Array<T>::Array()
	: Array(0)
{}

	template <typename T>
Array<T>::Array(int capacity)
{
	_capacity = capacity > DEFAULT_ARR_SIZE ? capacity : DEFAULT_ARR_SIZE; 
	_size = 0;
	_items = new T[_capacity];
}

	template <typename T>
Array<T>::~Array()
{
	delete _items;
}

	template <typename T>
int Array<T>::size()
{
	return _size;
}

	template <typename T>
int Array<T>::capacity()
{
	return _capacity;
}

	template <typename T>
void Array<T>::push(T item)
{
	_resize_if_needed(_size+1);

	_items[_size] = item;
	_size++;
}

	template <typename T>
T Array<T>::at(int index)
{
	return _items[index];
}

	template <typename T>
T Array<T>::pop()
{
	T lastItem = _items[_size-1];
	_size--;

	_resize_if_needed(_size);

	return lastItem;
}

	template <typename T>
void Array<T>::insert(int index, T item)
{
	_resize_if_needed(_size+1);

	_shift(index, 1);

	_items[index] = item;
	_size++;
}

	template <typename T>
void Array<T>::prepend(T item)
{
	_resize_if_needed(_size+1);

	_shift(0, 1);

	_items[0] = item;
	_size++;
}

	template <typename T>
void Array<T>::erase(int index)
{
	if(index == _size-1)
	{
		_size--;

		_resize_if_needed(_size);

		return;
	}

	_shift(index, -1);

	_size--;

	_resize_if_needed(_size);
}

	template <typename T>
void Array<T>::remove(T item)
{
	for(int i=_size-1; i >= 0; i--)
	{
		if(_items[i] != item) continue;

		_shift(i, -1);
		_size--;
	}
}

	template <typename T>
int Array<T>::find(T item)
{
	for(int i=0; i < _size; i++)
	{
		if(_items[i] == item) return i;
	}

	return -1;
}

	template <typename T>
void Array<T>::resize(int newCapacity)
{
	if(_capacity == newCapacity) return;

	if(newCapacity < DEFAULT_ARR_SIZE) return;

	_capacity = newCapacity;
	_size = newCapacity < _size ? newCapacity : _size;
}

	template <typename T>
void Array<T>::_shift(int index, int diff)
{
	memcpy(_items+index, _items+index-diff, (_size-index-1) * sizeof(T));
}

	template <typename T>
void Array<T>::_resize_if_needed(int newSize)
{
	if(newSize < DEFAULT_ARR_SIZE) return;

	if(newSize < _capacity/4)
	{
		_capacity /= 2;
	}

	if(newSize <= _capacity) return;

	int newCapacity = _capacity;
	while(newCapacity < newSize) newCapacity *= 2;

	auto newItems = new T[newSize];

	memcpy(newItems, _items, _size * sizeof(T));
	delete _items;
	_items = newItems;
}
