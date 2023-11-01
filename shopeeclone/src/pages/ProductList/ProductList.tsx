import ProductItem from 'src/pages/ProductItems'
import SideBarFilter from '../SideBarFilter'
import SortProductsList from '../SortProductsList'
import { useQuery } from '@tanstack/react-query'
import { getProduct } from 'src/api/product.api'
import useQueryParms from 'src/hooks/useQueryParms'

export default function ProductList() {
  const queryParams = useQueryParms()
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => getProduct(queryParams)
  })

  console.log(data)

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <SideBarFilter />
          </div>
          <div className='col-span-9'>
            <SortProductsList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {Array(30)
                .fill(0)
                .map((_, index) => (
                  <div className='col-span-1' key={index}>
                    <ProductItem />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
