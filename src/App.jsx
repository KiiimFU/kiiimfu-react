import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import FamCalendar from './pages/FamCalendar'
import ChatBubble from './components/ChatBubble'
import SuggestionForm from './components/SuggestionForm'

function App() {
  const [showForm, setShowForm] = useState(false)

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen font-serif">
        <Header onSuggest={() => setShowForm(true)} />
        <main className="flex-1 pt-20 px-6 max-w-4xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/famcalendar" element={<FamCalendar />} />
          </Routes>
        </main>
        <Footer />
        <ChatBubble />
        {showForm && <SuggestionForm onClose={() => setShowForm(false)} />}
      </div>
    </BrowserRouter>
  )
}

export default App
