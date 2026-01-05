import React, { useEffect, useRef, useState } from 'react'

type FitTextProps = {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  maxFontSize?: number
  minFontSize?: number
}

export default function FitText({ children, maxFontSize = 70, minFontSize = 12 }: FitTextProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [fontSize, setFontSize] = useState<number>(maxFontSize)

  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return

    const fit = () => {
      // binary search for best font size that fits in one line
      let low = minFontSize
      let high = maxFontSize
      let best = minFontSize

      // ensure nowrap while measuring
      node.style.whiteSpace = 'nowrap'

      while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        node.style.fontSize = mid + 'px'

        // scrollWidth > clientWidth means it overflows
        if (node.scrollWidth <= node.clientWidth) {
          best = mid
          low = mid + 1
        } else {
          high = mid - 1
        }
      }

      setFontSize(best)
      node.style.fontSize = best + 'px'
    }

    fit()

    const ro = new ResizeObserver(() => fit())
    ro.observe(node)
    // also observe window resizes
    window.addEventListener('resize', fit)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [children, maxFontSize, minFontSize])

  // apply the computed fontSize to the wrapper and render the child inside
  return (
    <div ref={wrapperRef} style={{ width: '100%', fontSize: fontSize, lineHeight: 1, overflow: 'hidden' }}>
      {React.cloneElement(children, { style: { ...(children.props.style || {}), fontSize: 'inherit', whiteSpace: 'nowrap', display: 'inline-block' } })}
    </div>
  )
}
