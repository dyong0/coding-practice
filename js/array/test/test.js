import {expect} from 'chai'
import CArray from '../src'

describe('CArray', () => {
	var arr

	beforeEach(()=> {
		arr = new CArray()
	})

	it('should not be null', () =>{
		expect(CArray).to.not.be.null
	})

	describe('#size()', () => {
		it('should return the number of its items', () => {
			expect(arr.size()).to.equal(0)
			arr.push(1)
			arr.push(2)
			expect(arr.size()).to.equal(2)
		})
	})

	describe('#capacity()', () => {
		it('should return its capacity', () => {
			expect(arr.capacity()).to.equal(0)
			arr.push(1)
			arr.push(2)
			expect(arr.capacity()).to.equal(2)
		})
	})

	describe('#isEmpty()', () => {
		it('should return a boolean representing if empty or not', () => {
			expect(arr.isEmpty()).to.equal(true)
			arr.push(1)
			arr.push(2)
			expect(arr.isEmpty()).to.equal(false)
		})
	})

	describe('#at(index)', () => {
		it('should return the item at the index', () => {
			arr.push(1)
			expect(arr.at(0)).to.equal(1)
		})
	})

	describe('#push(item)', () => {
		it('should append an item', () => {
			arr.push(1)
			arr.push(2)
			expect(arr.at(1)).to.equal(2)
		})
	})

	describe('#insert(index, item)', () => {
		it('should insert an item at the index', () => {
			arr.push(1)
			arr.push(3)
			arr.insert(1, 2)
			expect(arr.at(1)).to.equal(2)
		})
	})

	describe('#prepend(item)', () => {
		it('should prepend an item', () => {
			arr.prepend(1)
			arr.prepend(2)
			expect(arr.at(0)).to.equal(2)
		})
	})

	describe('#pop()', () => {
		it('should pop the last item', () => {
			arr.push(1)
			arr.push(2)
			expect(arr.pop()).to.equal(2)
			expect(arr.size()).to.equal(1)
		})
	})

	describe('#delete(index)', () => {
		it('should delete the item at the index', () => {
			arr.push(1)
			arr.push(2)
			arr.delete(0)
			expect(arr.size()).to.equal(1)
			expect(arr.at(0)).to.equal(2)
		})
	})

	describe('#remove(item)', () => {
		it('should remove the item from itself', () => {
			arr.push(1)
			arr.push(2)
			arr.push(1)
			arr.remove(1)
			expect(arr.size()).to.equal(1)
			expect(arr.at(0)).to.equal(2)
		})
	})

	describe('#find(item)', () => {
		it('should return the index of its item', () => {
			arr.push(1)
			arr.push(2)
			arr.push(1)
			expect(arr.find(1)).to.equal(0)
		})

		it('should return -1 if not found', () => {
			arr.push(1)
			expect(arr.find(3)).to.equal(-1)
		})
	})

	describe('#resize(newCapacity)', () => {
		it('should resize its size with new size', () => {
			arr.resize(10)
			expect(arr.capacity()).to.equal(10)
			expect(arr.size()).to.equal(0)
		})
	})

})
