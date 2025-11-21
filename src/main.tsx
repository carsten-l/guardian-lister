import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import NotFound from './components/NotFound'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import Loading from './components/Loading'

// Create a new router instance
const router = createRouter({ 
  routeTree, 
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: Loading
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
