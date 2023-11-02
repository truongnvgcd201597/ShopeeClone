import { ProductListConfig } from 'src/types/product.types'
import { QueryConfig } from '../ProductList/ProductList'
import path from 'src/constants/path'
import { createSearchParams } from 'react-router-dom'

interface SortProductListProps {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductsList({ queryConfig, pageSize }: SortProductListProps) {
  const { sort_by = sort_by.createAt } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({ ...queryConfig, sort_by: sortByValue }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-row flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className='px-2 py-3 bg-orange-600 text-white hover:bg-orange-400 text-center'
            onClick={() => handleSort(sort_by.view)}
          >
            Popular
          </button>
          <button
            className='px-2 py-3 bg-white text-black hover:bg-slate-400 hover:text-white text-center'
            onClick={() => handleSort(sort_by.createAt)}
          >
            Lastest
          </button>
          <button
            className='px-2 py-3 bg-white text-black hover:bg-slate-400 hover:text-white text-center'
            onClick={() => handleSort(sort_by.sold)}
          >
            Best seller
          </button>
          <select className='h-11 px-4 capitalize bg-white text-black text-center text-left' defaultValue=''>
            <option value='' disabled>
              Price
            </option>
            <option value='price:asc'>Price: Lowest to highest</option>
            <option value='price:desc'>Price:Highest to lowest</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange-500'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='shadow rounded-tl-sm px-3 h-10 bg-white hover:bg-slate-200 cursor-not-allowed shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='shadow rounded-tl-sm px-3 h-10 bg-white hover:bg-slate-200 cursor-not-allowed'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
