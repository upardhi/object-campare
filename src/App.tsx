import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

const TABS = ['Spring', 'Tween', 'Drag'] as const
type Tab = (typeof TABS)[number]

const INITIAL_CARDS = [
  { id: 1, label: 'Layout animation' },
  { id: 2, label: 'Enter / exit' },
]

function App() {
  const [tab, setTab] = useState<Tab>('Spring')
  const [cards, setCards] = useState(INITIAL_CARDS)
  const reduceMotion = useReducedMotion()

  // When the OS asks for reduced motion, collapse durations instead of
  // animating position and scale.
  const transition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 400, damping: 30 }

  return (
    <main>
      <motion.header
        initial={{ opacity: 0, y: reduceMotion ? 0 : -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="logos">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
        <h1>Vite + React + TypeScript</h1>
        <p>
          Animated with <code>framer-motion</code>. Edit <code>src/App.tsx</code> and
          save to test HMR.
        </p>
      </motion.header>

      <section className="panel">
        <h2>Shared layout</h2>
        <div className="tabs" role="tablist">
          {TABS.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={tab === name}
              className={tab === name ? 'tab active' : 'tab'}
              onClick={() => setTab(name)}
            >
              {tab === name && (
                <motion.span
                  layoutId="tab-pill"
                  className="pill"
                  transition={transition}
                />
              )}
              <span className="tab-label">{name}</span>
            </button>
          ))}
        </div>

        <motion.div
          className="stage"
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {tab === 'Drag' ? (
            <motion.div
              className="box draggable"
              drag
              dragConstraints={{ left: -80, right: 80, top: -40, bottom: 40 }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.1 }}
            >
              drag me
            </motion.div>
          ) : (
            <motion.div
              className="box"
              animate={{ rotate: tab === 'Spring' ? 0 : 180 }}
              transition={
                tab === 'Spring'
                  ? transition
                  : { duration: reduceMotion ? 0 : 0.6, ease: 'easeInOut' }
              }
              whileHover={{ scale: reduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: reduceMotion ? 1 : 0.95 }}
            >
              {tab.toLowerCase()}
            </motion.div>
          )}
        </motion.div>
      </section>

      <section className="panel">
        <h2>Enter &amp; exit</h2>
        <div className="actions">
          <button
            type="button"
            onClick={() =>
              setCards((prev) => {
                // Derive the id from state so the updater stays pure: React
                // runs it twice under StrictMode in development.
                const id = prev.reduce((max, c) => Math.max(max, c.id), 0) + 1
                return [...prev, { id, label: `Card ${id}` }]
              })
            }
          >
            Add card
          </button>
          <button
            type="button"
            onClick={() => setCards((prev) => prev.slice(0, -1))}
            disabled={cards.length === 0}
          >
            Remove card
          </button>
        </div>

        <motion.ul className="cards" layout transition={transition}>
          <AnimatePresence initial={false} mode="popLayout">
            {cards.map((card) => (
              <motion.li
                key={card.id}
                layout
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
                transition={transition}
              >
                {card.label}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>
    </main>
  )
}

export default App
