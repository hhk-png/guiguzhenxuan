import {defineStore} from 'pinia'
import { reqC1 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/types'
import type { CategoryState } from './types/type'

const useCategoryStore = defineStore('Category', {
  state(): CategoryState {
    return {
      c1Arr: [],
      c1Id: ''
    }
  },
  actions: {
    async getC1() {
      const result: CategoryResponseData = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    }
  },
  getters: {

  }
})

export default useCategoryStore
