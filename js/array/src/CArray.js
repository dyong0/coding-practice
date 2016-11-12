class CArray {
	constructor() {
		this._items = {}
		this._length = 0
		this._capacity = 0
	}

	size() {
		return this._length
	}

	capacity() {
		return this._capacity
	}

	isEmpty() {
		return this._length === 0
	}

	at(index) {
		return this._items[index]
	}

	push(item) {
		this._items[this._length] = item
		++this._length
		++this._capacity
	}

	insert(index, item) {
		if(index < this._length-1) {
			this._shift(index, 1)
		}

		this._items[index] = item
		++this._length
		++this._capacity
	}

	prepend(item) {
		this._shift(0, 1)

		this._items[0] = item
		++this._length
		++this._capacity
	}

	pop() {
		let popedItem = this._items[this._length-1]
		--this._length

		return popedItem
	}

	delete(index) {
		if(index === this._length-1) {
			--this._length
			return
		}

		this._shift(index, -1)

		--this._length
	}

	remove(item) {
		for(let i=this._length-1; i >= 0; --i) {
			if(this._items[i] === item) {
				this._shift(i, -1)
				--this._length
			}
		}
	}

	find(item) {
		for(let i=0; i < this._length; ++i) {
			if(this._items[i] === item) {
				return i
			}
		}

		return -1
	}

	resize(newCapacity) {
		this._capacity = newCapacity

		if(this._length	> newCapacity) {
			this._length = newCapacity
		}
	}

	_shift(at, diff) {
		if(diff > 0) {
			for(let i=at; i < at+diff; ++i) {
				this._items[i+1] = this._items[i]
			}
		}

		for(let i=at; i > at+diff; --i) {
			this._items[i] = this._items[i+1]
		}
	}
}


export default CArray
