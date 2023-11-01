import { Product, ProductListConfig } from 'src/types/product.types'
import { SuccessResponse } from 'src/types/utils.types'
import http from 'src/utils/http'

const URL = 'products'
export const getProduct = (params: ProductListConfig) =>
  http.get<SuccessResponse<ProductListConfig>>(URL, {
    params
  })
export const getProductDetail = (id: string) => http.get<SuccessResponse<Product>>(`${URL}/${id}`)
