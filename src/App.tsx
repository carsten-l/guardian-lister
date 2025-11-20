import { useState } from 'react'
import ThemeSwitcher from './components/ThemeSwitcher.js';
import useThemeStore from './stores/ThemeStore.js';
import Home from './pages/Home.js';

useThemeStore.subscribe((state) => {
  document.documentElement.setAttribute('data-theme', state.theme);
});

document.documentElement.setAttribute('data-theme', useThemeStore.getState().theme);


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className='mb-8'>
        <div className="container mx-auto flex justify-between items-center py-6 px-8">
          <div className='text-left'>
          <p className='text-xl font-black'>GAL</p>
          <p className='text-xs'>Guardian Article Lister</p>
          </div>
        <ThemeSwitcher />

        </div>
      </header>
      <main>
        <div className="container mx-auto py-6 px-8">

          <Home />

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
          </div>

      </main>
      
    </>
  )
}

export default App
