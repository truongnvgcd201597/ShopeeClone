import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.types'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface ProductProps {
  product: ProductType
}
export default function ProductItem({ product }: ProductProps) {
  return (
    <Link to='/'>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md p-1'>
        <div className='relative w-full pt-[100%]'>
          <img src={product.images[0]} alt='' className='absolute top-0 bg-white w-full object-cover' />
          <div className='overflow-hidden p-2'>
            <div className='min-h-[2rem] text-xs line-clamp-2'>{product.name}</div>
            <div className='mt-3 flex items-center'>
              <div className='max-w-[50%] truncate text-gray-500 line-through'>
                <span className='text-xs'>₫</span>
                <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span>
              </div>
              <div className='ml-1 truncate text-orange-500'>
                <span className='text-xs'>₫</span>
                <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span>
              </div>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />{' '}
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>sold</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
