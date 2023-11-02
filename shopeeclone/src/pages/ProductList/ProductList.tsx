import ProductItem from 'src/pages/ProductItems'
import SideBarFilter from '../SideBarFilter'
import SortProductsList from '../SortProductsList'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProduct } from 'src/api/product.api'
import useQueryParms from 'src/hooks/useQueryParms'
import Pagination from 'src/components/Pagination'
import { Product, ProductListConfig } from 'src/types/product.types'
import { omitBy, isUndefined } from 'lodash'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function ProductList() {
  const queryParams: QueryConfig = useQueryParms()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => getProduct(queryConfig as ProductListConfig),
    keepPreviousData: true
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <SideBarFilter />
          </div>
          <div className='col-span-9'>
            <SortProductsList queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size} />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {data &&
                data?.data.data.products.map((productItem: Product) => (
                  <div className='col-span-1' key={productItem._id}>
                    <ProductItem product={productItem} />
                  </div>
                ))}
            </div>
            <Pagination queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size} />
          </div>
        </div>
      </div>
    </div>
  )
}
