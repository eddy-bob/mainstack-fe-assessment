import { Routes, Route } from 'react-router-dom'
import { Header } from './components/header'
import HomePage from './pages/home-page'
import AnalyticsPage from './pages/analytics-page'
import RevenuePage from './pages/revenue-page'
import CrmPage from './pages/crm-page'
import AppsPage from './pages/apps-page'

function App() {
  return (
    <div  className="flex flex-col ml-2" >
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<div className="sm:px-20 px-5 " ><HomePage /></div>} />
          <Route path="/analytics" element={<div className="sm:px-20 px-5 " ><AnalyticsPage /></div>} />
          <Route path="/revenue" element={<div className="sm:px-20 px-5 " ><RevenuePage /></div>} />
          <Route path="/crm" element={<div className="sm:px-20 px-5 " ><CrmPage /></div>} />
          <Route path="/apps" element={<div className="sm:px-20 px-5 " ><AppsPage /></div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
