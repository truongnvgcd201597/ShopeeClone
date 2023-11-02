import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'

interface PaginationProps {
  queryConfig: QueryConfig
  pageSize: number
}
const PAGE_RANGE = 2
export default function Pagination({ queryConfig, pageSize }: PaginationProps) {
  const page = Number(queryConfig.page)
  const paginationRendering = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='mx-2 rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='mx-2 rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        if (page <= PAGE_RANGE * 2 + 1 && pageNumber > page + PAGE_RANGE && pageNumber < pageSize - PAGE_RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > PAGE_RANGE * 2 + 1 && page < pageSize - PAGE_RANGE * 2) {
          if (pageNumber < page - PAGE_RANGE && pageNumber > PAGE_RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + PAGE_RANGE && pageNumber < pageSize - PAGE_RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - PAGE_RANGE * 2 && pageNumber > PAGE_RANGE && pageNumber < page - PAGE_RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
            }}
            className={'p-2 rounded-sm bg-white text-gray-500 hover:bg-slate-200 hover:text-orange-500'}
            key={index}
          >
            {index + 1}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <span className='cursor-not-allowed p-2 rounded-sm bg-white text-gray-500 hover:bg-slate-200'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
          }}
          className='p-2 rounded-sm bg-white text-gray-500 hover:bg-slate-200'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </Link>
      )}

      {paginationRendering()}
      {page === pageSize ? (
        <span className='px-3 py-2 cursor-not-allowed rounded-sm bg-white text-gray-500 hover:bg-slate-200'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
          }}
          className='px-3 py-2 rounded-sm bg-white text-gray-500 hover:bg-slate-200'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </Link>
      )}
    </div>
  )
}
