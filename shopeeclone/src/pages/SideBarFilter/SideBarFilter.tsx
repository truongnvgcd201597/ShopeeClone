import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from '../ProductList/ProductList'
import { Category } from 'src/types/category.type'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.types'
interface SideBarFilterProps {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_min', 'price_max'])
export default function SideBarFilter({ queryConfig, categories }: SideBarFilterProps) {
  const {
    control,
    watch,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const navigate = useNavigate()

  const valueForm = watch()

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({ ...queryConfig, price_max: data.price_max, price_min: data.price_min }).toString()
    })
  })
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        All Categories
      </Link>
      <div className='bg-gray-500 my-4 h-[.8px]'>
        <ul>
          <li className='py-2 pl-2'>
            <Link to={path.home} className='relative px-2 text-orange-500 font-semibold'>
              <svg
                viewBox='0 0 4 7'
                className='shopee-svg-icon shopee-category-list__main-category__caret h-2 w-2 absolute top-6 left-[-10px] fill-orange-500'
              >
                <polygon points='4 3.5 0 0 0 7' />
              </svg>
              Men Fashion
            </Link>
          </li>
          {categories.map((category) => (
            <li className='py-2 pl-2' key={category._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, category: category._id }).toString()
                }}
                className='relative px-2 '
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link to={path.home} className='flex items-center font-bold mt-2 uppercase'>
          <svg
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x={0}
            y={0}
            className='w-4 h-4 fill-current stroke-current'
          >
            <g>
              <polyline
                fill='black'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </g>
          </svg>
          Search filter
        </Link>
        <div className='bg-gray-500 my-4 h-[.8px]'></div>
        <div className='my-5'>
          <div>Price range</div>
          <form className='mt-2' onSubmit={onSubmit}>
            <div className='flex items-start gap-x-2'>
              <Controller
                control={control}
                name='price_min'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      classNameInput='p-1 w-full outline-none border border-gray-300 rounded-sm focus:border-gray-600 focus:shadow'
                      classNameError='hidden'
                      placeholder='FROM'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_max')
                      }}
                    />
                  )
                }}
              />
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      classNameInput='p-1 w-full outline-none border border-gray-300 rounded-sm focus:border-gray-600 focus:shadow'
                      classNameError='hidden'
                      placeholder='TO'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_min')
                      }}
                    />
                  )
                }}
              />
            </div>
            <div className='my-2 text-red-600 min-h-[1.1rem] text-sm text-center'>{errors.price_min?.message}</div>
            <button className='w-full p-2 uppercase bg-orange-600 text-white text-sm hover:bg-orange-400 flex justify-center items-center'>
              Apply
            </button>
          </form>
        </div>
        <div className='bg-gray-500 my-4 h-[.8px]'></div>
        <div className='text-sm'>Reviews</div>
        <ul className='my-3'>
          <li className='py-1 pl-2'>
            <Link to='' className='flex items-center text-sm'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4' key={index}>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
              <span className='ml-2'>(100)</span>
            </Link>
          </li>
          <li className='py-1 pl-2'>
            <Link to='' className='flex items-center text-sm'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4' key={index}>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
              <span className='ml-2'>(100)</span>
            </Link>
          </li>
        </ul>
        <div className='bg-gray-500 my-4 h-[.8px]'></div>
        <button className='w-full p-2 uppercase bg-orange-600 text-white text-sm hover:bg-orange-400 flex justify-center items-center'>
          Delete All
        </button>
      </div>
    </div>
  )
}
