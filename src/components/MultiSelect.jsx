import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const MultiSelect = ({ options = [], value = [], onChange }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)

  const updatePos = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom, left: rect.left, width: rect.width })
    }
  }

  const handleToggle = () => {
    updatePos()
    setOpen((o) => !o)
  }

  useEffect(() => {
    if (!open) return
    const closeOnOutsideClick = (e) => {
      const inTrigger = triggerRef.current?.contains(e.target)
      const inDropdown = dropdownRef.current?.contains(e.target)
      if (!inTrigger && !inDropdown) {
        setOpen(false)
        setSearch('')
      }
    }
    const closeOnScroll = () => { setOpen(false); setSearch('') }
    document.addEventListener('mousedown', closeOnOutsideClick)
    window.addEventListener('scroll', closeOnScroll, true)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      window.removeEventListener('scroll', closeOnScroll, true)
    }
  }, [open])

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  )

  const toggle = (opt) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])
  }

  return (
    <div ref={triggerRef}>
      <div
        className="form-control d-flex flex-wrap gap-1 align-items-center"
        style={{ minHeight: '38px', cursor: 'pointer' }}
        onClick={handleToggle}
      >
        {value.length === 0 ? (
          <span className="text-muted">Select...</span>
        ) : (
          value.map((opt) => (
            <span key={opt} className="badge bg-primary d-flex align-items-center gap-1">
              {opt}
              <button
                type="button"
                className="btn-close btn-close-white"
                style={{ fontSize: '0.5rem' }}
                onClick={(e) => { e.stopPropagation(); toggle(opt) }}
                aria-label={`Remove ${opt}`}
              />
            </span>
          ))
        )}
      </div>

      {open && createPortal(
        <div
          ref={dropdownRef}
          className="border rounded bg-white shadow-sm"
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            width: pos.width,
            zIndex: 9999,
            maxHeight: '250px',
            overflowY: 'auto',
          }}
        >
          <div className="p-2 border-bottom sticky-top bg-white">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          <div>
            {filtered.map((opt) => (
              <label
                key={opt}
                className="d-flex align-items-center gap-2 px-3 py-2"
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <input
                  type="checkbox"
                  className="form-check-input m-0"
                  checked={value.includes(opt)}
                  onChange={() => toggle(opt)}
                />
                {opt}
              </label>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-muted small">No results</div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default MultiSelect
