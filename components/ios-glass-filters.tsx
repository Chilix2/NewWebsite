'use client'

import { useEffect } from 'react'

export default function IOSGlassFilters() {
  useEffect(() => {
    // Set to track which elements already have listeners attached
    const elementsWithListeners = new WeakSet<Element>()
    
    // Map to store spotlight elements for each glass container
    const spotlightElements = new WeakMap<Element, HTMLDivElement>()
    
    const handleMouseEnter = (element: Element) => {
      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }
      
      // Find the SVG filter element and then the displacement map inside it
      const svg = document.querySelector('.ios-glass-svg-filters')
      const displacementMap = svg?.querySelector('#frosted-filter') as SVGElement | null
      const animateElement = displacementMap?.querySelector('animate[attributeName="scale"]')
      if (animateElement) {
        (animateElement as any).beginElement()
      }
      
      // Show spotlight effect
      const spotlightElement = spotlightElements.get(element)
      if (spotlightElement) {
        spotlightElement.style.opacity = '1'
        spotlightElement.style.display = 'block'
      } else {
        // Spotlight element might not be in map, try to find it
        const existingSpotlight = element.querySelector('.glass-spotlight-effect') as HTMLDivElement
        if (existingSpotlight) {
          existingSpotlight.style.opacity = '1'
          existingSpotlight.style.display = 'block'
          spotlightElements.set(element, existingSpotlight)
        }
      }
    }

    const handleMouseLeave = (element: Element) => {
      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }
      
      // Find the SVG filter element and then the displacement map inside it
      const svg = document.querySelector('.ios-glass-svg-filters')
      const displacementMap = svg?.querySelector('#frosted-filter') as SVGElement | null
      const animateElements = displacementMap?.querySelectorAll('animate[attributeName="scale"]')
      if (animateElements && animateElements.length > 1) {
        (animateElements[1] as any).beginElement()
      }
      
      // Hide spotlight effect
      const spotlightElement = spotlightElements.get(element)
      if (spotlightElement) {
        spotlightElement.style.opacity = '0'
      } else {
        // Try to find it if not in map
        const existingSpotlight = element.querySelector('.glass-spotlight-effect') as HTMLDivElement
        if (existingSpotlight) {
          existingSpotlight.style.opacity = '0'
        }
      }
    }
    
    // Optimized mouse move handler with RAF and throttling
    let mouseMoveRAF: number | null = null
    let lastMouseMoveTime = 0
    const handleMouseMove = (element: Element, e: MouseEvent) => {
      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }
      
      // Performance throttling - limit to 60fps
      const now = performance.now()
      if (now - lastMouseMoveTime < 16) return // ~60fps
      
      // Cancel previous RAF if exists
      if (mouseMoveRAF) {
        cancelAnimationFrame(mouseMoveRAF)
      }
      
      mouseMoveRAF = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        const spotlightElement = spotlightElements.get(element)
        if (spotlightElement) {
          // Use CSS custom properties for better performance
          spotlightElement.style.setProperty('--spotlight-x', `${x}px`)
          spotlightElement.style.setProperty('--spotlight-y', `${y}px`)
          spotlightElement.style.background = `radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255, 255, 255, 0.15), transparent 40%)`
        }
        
        lastMouseMoveTime = now
        mouseMoveRAF = null
      })
    }

    // Function to create spotlight element for glass container
    const createSpotlightElement = (element: Element): HTMLDivElement => {
      // Check if spotlight element already exists
      const existingSpotlight = element.querySelector('.glass-spotlight-effect') as HTMLDivElement
      if (existingSpotlight) {
        // Ensure it has the proper styles
        existingSpotlight.style.setProperty('--spotlight-x', '50%')
        existingSpotlight.style.setProperty('--spotlight-y', '50%')
        return existingSpotlight
      }
      
      const spotlight = document.createElement('div')
      spotlight.className = 'glass-spotlight-effect'
      
      // Set initial CSS custom properties for performance
      spotlight.style.setProperty('--spotlight-x', '50%')
      spotlight.style.setProperty('--spotlight-y', '50%')
      
      spotlight.style.cssText = `
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        border-radius: inherit;
        background: radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255, 255, 255, 0.15), transparent 40%);
        z-index: 1;
        will-change: opacity, background;
        transform: translateZ(0);
      `
      
      // Ensure the parent element has relative positioning
      const computedStyle = window.getComputedStyle(element)
      if (computedStyle.position === 'static') {
        (element as HTMLElement).style.position = 'relative'
      }
      
      // Note: We use inset: 0 instead of -1px to work with overflow-hidden parents
      // The spotlight will still work perfectly within the element bounds
      
      // Add performance optimization class
      element.classList.add('glass-container-optimized')
      
      element.appendChild(spotlight)
      return spotlight
    }

    // Function to attach listeners to glass elements
    const attachListenersToElements = () => {
      const glassElements = document.querySelectorAll('.glass-panel-ultimate, .glass-card-neon-5')
      glassElements.forEach(element => {
        // Only attach if not already attached
        if (!elementsWithListeners.has(element)) {
          // Create or get existing spotlight element
          const spotlightElement = createSpotlightElement(element)
          spotlightElements.set(element, spotlightElement)
          
          const enterHandler = () => handleMouseEnter(element)
          const leaveHandler = () => handleMouseLeave(element)
          const moveHandler = (e: MouseEvent) => handleMouseMove(element, e)
          
          element.addEventListener('mouseenter', enterHandler, { passive: true })
          element.addEventListener('mouseleave', leaveHandler, { passive: true })
          element.addEventListener('mousemove', moveHandler, { passive: true })
          
          elementsWithListeners.add(element)
          
          // Store handlers for cleanup
          ;(element as any).__glassEnterHandler = enterHandler
          ;(element as any).__glassLeaveHandler = leaveHandler
          ;(element as any).__glassMoveHandler = moveHandler
        } else {
          // Element already has listeners, but ensure spotlight is in the map
          const existingSpotlight = element.querySelector('.glass-spotlight-effect') as HTMLDivElement
          if (existingSpotlight && !spotlightElements.has(element)) {
            spotlightElements.set(element, existingSpotlight)
          }
        }
      })
    }

    // Initial attachment after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      attachListenersToElements()
    }, 100)
    
    // Also try immediately in case DOM is already ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      attachListenersToElements()
    }

    // Debounce function to avoid excessive calls
    let debounceTimer: NodeJS.Timeout | null = null
    const debouncedAttach = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        attachListenersToElements()
      }, 50)
    }

    // Use MutationObserver to watch for new elements being added
    const observer = new MutationObserver((mutations) => {
      // Check for added nodes with glass classes
      const hasAddedNodes = mutations.some(mutation => 
        mutation.addedNodes.length > 0 && 
        Array.from(mutation.addedNodes).some(node => 
          node.nodeType === Node.ELEMENT_NODE && 
          ((node as Element).classList?.contains('glass-panel-ultimate') || 
           (node as Element).classList?.contains('glass-card-neon-5') ||
           (node as Element).querySelector?.('.glass-panel-ultimate, .glass-card-neon-5'))
        )
      )
      
      // Also check for attribute changes (class additions)
      const hasClassChanges = mutations.some(mutation => 
        mutation.type === 'attributes' && 
        mutation.attributeName === 'class' &&
        ((mutation.target as Element).classList?.contains('glass-panel-ultimate') || 
         (mutation.target as Element).classList?.contains('glass-card-neon-5'))
      )
      
      if (hasAddedNodes || hasClassChanges) {
        debouncedAttach()
      }
    })

    // Start observing the document body for added nodes
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    }

    return () => {
      clearTimeout(timeoutId)
      if (debounceTimer) clearTimeout(debounceTimer)
      observer.disconnect()
      
      // Clean up all listeners and spotlight elements
      const glassElements = document.querySelectorAll('.glass-panel-ultimate, .glass-card-neon-5')
      glassElements.forEach(element => {
        const enterHandler = (element as any).__glassEnterHandler
        const leaveHandler = (element as any).__glassLeaveHandler
        const moveHandler = (element as any).__glassMoveHandler
        
        if (enterHandler) {
          element.removeEventListener('mouseenter', enterHandler)
        }
        if (leaveHandler) {
          element.removeEventListener('mouseleave', leaveHandler)
        }
        if (moveHandler) {
          element.removeEventListener('mousemove', moveHandler)
        }
        
        // Remove spotlight element
        const spotlightElement = spotlightElements.get(element)
        if (spotlightElement && spotlightElement.parentNode) {
          spotlightElement.parentNode.removeChild(spotlightElement)
        }
      })
      
      // Clear RAF if exists
      if (mouseMoveRAF) {
        cancelAnimationFrame(mouseMoveRAF)
      }
    }
  }, [])

  return (
    <svg 
      className="ios-glass-svg-filters" 
      style={{ position: 'fixed', width: 0, height: 0, pointerEvents: 'none', zIndex: -1 }}
    >
      <defs>
        <filter id="frosted" primitiveUnits="objectBoundingBox">
          <feImage 
            href="data:image/png;base64,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" 
            x="0" 
            y="0" 
            width="1" 
            height="1" 
            result="map"
          />
          <feGaussianBlur 
            in="SourceGraphic" 
            stdDeviation="0.015" 
            result="blur"
          />
          <feDisplacementMap 
            id="frosted-filter"
            in="blur" 
            in2="map" 
            scale="1" 
            xChannelSelector="R" 
            yChannelSelector="G"
          >
            <animate 
              attributeName="scale" 
              to="1.2" 
              dur="0.25s" 
              begin="indefinite" 
              fill="freeze"
            />
            <animate 
              attributeName="scale" 
              to="1" 
              dur="0.25s" 
              begin="indefinite" 
              fill="freeze"
            />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  )
}

