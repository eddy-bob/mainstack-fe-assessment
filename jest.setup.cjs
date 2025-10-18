require('@testing-library/jest-dom')

// Mock fetch globally
global.fetch = jest.fn()

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => {
  return setTimeout(callback, 0)
}

// Mock cancelAnimationFrame
global.cancelAnimationFrame = (id) => {
  clearTimeout(id)
}
