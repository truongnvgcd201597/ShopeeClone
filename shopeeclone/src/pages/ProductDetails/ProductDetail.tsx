import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct, getProductDetail } from 'src/api/product.api'
import InputNumber from 'src/components/InputNumber'
import ProductRating from 'src/components/ProductRating'
import { Product, ProductListConfig } from 'src/types/product.types'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, salesPriceBeforeDiscount } from 'src/utils/utils'
import ProductItem from '../ProductList/components/ProductItems'

export default function ProductDetail() {
  const { nameId } = useParams<{ nameId: string }>()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProductDetail(id as string)
  })

  const product = productDetailData?.data.data

  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => getProduct(queryConfig),
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const [activeImages, setActiveImages] = useState('')

  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImages(product.images[0])
    }
  }, [product])
  const currentImage = useMemo(
    () => (product ? product?.images.slice(...currentIndexImage) : []),
    [product, currentIndexImage]
  )

  const imageActiveHover = (img: string) => {
    setActiveImages(img)
  }

  const nextSlider = () => {
    if (currentIndexImage[1] < (product as Product)?.images.length) {
      setCurrentIndexImage([currentIndexImage[0] + 1, currentIndexImage[1] + 1])
    }
  }

  const prevSlider = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage([currentIndexImage[0] - 1, currentIndexImage[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const { offsetX, offsetY } = event.nativeEvent

    const imageZoomHover = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = imageZoomHover

    const top = offsetX * (1 - naturalHeight / rect.height)
    const left = offsetY * (1 - naturalHeight / rect.height)

    imageZoomHover.style.width = naturalWidth + 'px'
    imageZoomHover.style.height = naturalHeight + 'px'
    imageZoomHover.style.maxWidth = 'unset'
    imageZoomHover.style.top = top + 'px'
    imageZoomHover.style.left = left + 'px'
  }

  const resetZoomImage = () => {
    imageRef.current?.removeAttribute('style')
  }

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] shadow overflow-hidden'
                onMouseMove={handleZoom}
                onMouseLeave={resetZoomImage}
              >
                <img
                  src={activeImages}
                  alt={product?.name}
                  className='object-cover absolute top-0 left-0 w-full h-full'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-6 bg-slate-200 -translate-y-1/2 hover:bg-slate-300 flex items-center justify-center'
                  onClick={prevSlider}
                >
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
                {currentImage.map((image, index) => {
                  const isActive = image === activeImages

                  return (
                    <div
                      className='relative w-full pt-[100%] shadow cursor-zoom-in'
                      key={index}
                      onMouseEnter={() => imageActiveHover(image)}
                    >
                      <img src={image} alt='' className='object-cover absolute top-0 left-0 w-full h-full' />
                      {isActive && (
                        <div className='absolute inset-0 bg-tranparent border-2 border-orange-500 rounded-sm'></div>
                      )}
                    </div>
                  )
                })}

                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-6 bg-slate-200 -translate-y-1/2 hover:bg-slate-300 flex items-center justify-center'
                  onClick={nextSlider}
                >
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
            <div className='col-span-7'>
              <h1 className='text-xl text-gray-700 font-medium uppercase'>{product?.name}</h1>
              <div className='mt-2 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product?.rating}</span>
                  <ProductRating
                    rating={product?.rating as number}
                    activeClassname='fill-orange text-orange h-4 w-4'
                    nonActiveClassname='fill-current text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-400'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product?.sold as number)}</span>
                  <span className='ml-1 text-gray-500'>Sold</span>
                </div>
              </div>
              <div className='mt-4 flex items-center bg-gray px-5 py-4'>
                <div className='text-gray-500 line-through'>
                  ₫{formatCurrency(product?.price_before_discount as number)}
                </div>
                <div className='ml-3 text-4xl font-medium text-orange-600'>
                  ₫{formatCurrency(product?.price as number)}
                </div>
                <div className='text-sm ml-4 p-2 bg-orange-500 text-white uppercase'>
                  {salesPriceBeforeDiscount(product?.price_before_discount as number, product?.price as number)} sale
                  off
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Number</div>
                <div className='ml-10 flex items-center'>
                  <button className='flex h-8 w-8 items-center justify-center border border-orange-500 rounded-sm hover:bg-gray-100'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
                    </svg>
                  </button>
                  <InputNumber
                    value={1}
                    classNameError='hidden'
                    classNameInput='border px-2 w-[40px] text-center h-8'
                    className='mx-2'
                  />
                  <button className='flex h-8 w-8 items-center justify-center border border-orange-500 rounded-sm hover:bg-gray-100'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
                    </svg>
                  </button>
                </div>
                <div className='ml-6 text-sm text-gray-600'>{product?.quantity} Product Available</div>
              </div>
              <div className='mt-4 flex items-cente'>
                <button className='flex h-12 rounded-sm border p-3 bg-orange-100 text-orange-600 justify-center items-center hover:bg-orange-200 border-orange-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6 text-orange-600 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                  Add To Cart
                </button>
                <button
                  className='flex h-12 rounded-sm border p-3 bg-orange-600 text-white justify-center items-center ml-4
                  hover:bg-orange-400'
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow-sm'>
          <div className='rounded bg-gray-50 p-4 text-lg uppercase text-slate-700'>Product Details</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div dangerouslySetInnerHTML={{ __html: product?.description as string }}></div>
          </div>
        </div>
        <h1 className='text-2xl font-weight my-5'>Similar Product</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
          {productsData &&
            productsData?.data.data.products.map((productItem: Product) => (
              <div className='col-span-1' key={productItem._id}>
                <ProductItem product={productItem} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
