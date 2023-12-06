import ProductItem from 'src/pages/ProductList/components/ProductItems'
import SideBarFilter from '../SideBarFilter'
import SortProductsList from './components/SortProductsList'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProduct } from 'src/api/product.api'
import Pagination from 'src/components/Pagination'
import { Product, ProductListConfig } from 'src/types/product.types'
import { getCategories } from 'src/api/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function ProductList() {
  const queryConfig = useQueryConfig()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => getProduct(queryConfig as ProductListConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  return (
    <div className='bg-gray-200 py-6 min-h-full'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <SideBarFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} />
          </div>
          <div className='col-span-9'>
            <SortProductsList queryConfig={queryConfig} pageSize={productsData?.data.data.pagination.page_size} />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {productsData &&
                productsData?.data.data.products.map((productItem: Product) => (
                  <div className='col-span-1' key={productItem._id}>
                    <ProductItem product={productItem} />
                  </div>
                ))}
            </div>
            <Pagination queryConfig={queryConfig} pageSize={productsData?.data.data.pagination.page_size} />
          </div>
        </div>
      </div>
    </div>
  )
}
