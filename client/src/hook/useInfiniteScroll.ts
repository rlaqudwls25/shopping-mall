import { RefObject, useEffect, useRef, useState } from 'react'

const useInfiniteScroll = (fetchMoreProduct: RefObject<HTMLDivElement>) => {
  const observeRef = useRef<IntersectionObserver>()
  const [intersecting, setIntersecting] = useState<boolean>(false)

  useEffect(() => {
    getObserve()
  }, [fetchMoreProduct.current])

  const getObserve = () => {
    if (!fetchMoreProduct.current) {
      return
    }
    getObserver().observe(fetchMoreProduct.current)
  }

  const getObserver = () => {
    if (!observeRef.current) {
      observeRef.current = new IntersectionObserver((entries) => {
        let isIntersect = entries.some((entry) => entry.isIntersecting)
        setIntersecting(isIntersect)
      })
    }

    return observeRef.current
  }

  return intersecting
}

export default useInfiniteScroll
