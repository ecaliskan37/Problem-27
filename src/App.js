import { Switch } from '@headlessui/react'
import { useRef, useEffect, useState } from 'react'

export default function Toggle() {
  const toggleRef = useRef(true)
  const count = useRef(0)
  const [status, setStatus] = useState(true)
  const [countx, setCountx] = useState(0)

  useEffect(() => {
    toggleRef.current.focus()
    localStorage.removeItem('switch')
  }, [])

  useEffect(() => {
    // toggleRef.current.style.transform = scale(countx)
  }, [countx])

  return (
    <div className="h-screen" data-theme={status ? 'dark' : 'light'}>
      <div
        className="p-8 flex justify-center peer"
        aria-placeholder="MM-DD-YYYY"
      >
        <Switch.Group as="div" className="flex items-center">
          <Switch
            ref={toggleRef}
            checked={toggleRef.current}
            onChange={() => {
              console.log(`Eski = ${toggleRef.current ? 'açık' : 'kapalı'}`)
              toggleRef.current = !toggleRef.current
              console.log(`Yeni = ${toggleRef.current ? 'açık' : 'kapalı'}`)
              if (!toggleRef.current) {
                localStorage.setItem('switch', toggleRef.current)
              }
              count.current = count.current + 1
              setCountx(count.current)
              console.log(`Sayı  ${count.current}`)
              setStatus(toggleRef.current)
            }}
            className={classNames(
              status
                ? 'bg-white/30 w-16 md:backdrop-blur-lg animate-wiggle'
                : 'bg-gray-200 w-11',
              `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus-within:ring-4`
            )}
          >
            {!status ? '🌞' : '🌙'}
            <span
              aria-hidden="true"
              className={classNames(
                status ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              )}
            />
          </Switch>
          {status && (
            <label className="transition-all peer-placeholder-shown:text-lg px-1  peer-placeholder-shown:px-0 bg-white peer-placeholder-shown:bg-transparent peer-placeholder-shown:m-auto">
              Premium Aktif
            </label>
          )}
          <Switch.Label as="span" className="ml-3 text-sm">
            <span className="font-medium text-black">Yıllık fatura</span>{' '}
            <span className="text-gray-500">(%10 Tasarruf Edin)</span>
          </Switch.Label>
        </Switch.Group>
      </div>
    </div>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
