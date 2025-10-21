import { useState, useEffect } from 'react'

// 미디어 쿼리를 감지하는 커스텀 훅
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    
    const listener = () => setMatches(media.matches)
    
    // 이벤트 리스너 추가
    media.addEventListener('change', listener)
    
    // 클린업
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// 자주 사용하는 브레이크포인트 훅
export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1025px)')
}

