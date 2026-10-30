import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import SplitView from './components/SplitView.jsx'
import Spec from './components/Spec.jsx'
import CtaBand from './components/CtaBand.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Przejdź do treści
      </a>

      <Header />

      <main id="main">
        <Hero />
        <HowItWorks />
        <SplitView />
        <Spec />
        <CtaBand />
      </main>

      <Footer />
    </div>
  )
}
