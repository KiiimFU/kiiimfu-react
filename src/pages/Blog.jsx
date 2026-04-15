import { useState } from 'react'

// Pswd for daily security to be fixed.

export default function Blog() {
    const [tab, setTab] = useState('tech')

    const [unlocked, setUnlocked] = useState(false)
    const [pswdInput, setPswdInput] = useState('')
    const [error, setError] = useState(false)


    function checkPassword() {
        if (pswdInput === import.meta.env.VITE_BLOG_PASSWORD) {
            setUnlocked(true)
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
    <div className="py-8">
        {/* Tab buttons */}
        <div className="flex gap-3 mb-6">
        <button
            onClick={() => setTab('tech')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            tab === 'tech'
                ? 'bg-[#8dcff9] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } cursor-pointer`}
        >
            Tech
        </button>
        <button
            onClick={() => setTab('daily')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            tab === 'daily'
                ? 'bg-[#8dcff9] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } cursor-pointer`}
        >
            Daily
        </button>
        </div>

        {/* Content */}
        {tab === 'tech' && (
            <div className="space-y-4">
                <p className="text-sm text-gray-700">
                No tech posts yet. For now, meet my sister's cats — Johny and Alexie!
                </p>
                <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 10 }, (_, i) => (
                    <img
                    key={i}
                    src={`/Cat${i + 1}.jpeg`}
                    alt="Johny or Alexie?"
                    className="w-full rounded-lg object-cover aspect-square"
                    />
                ))}
                </div>
            </div>
        )}

        {tab === 'daily' && (
            <div>
                {!unlocked ? (
                <div className="flex flex-col gap-3 max-w-xs">
                    <p className="text-sm text-gray-600">This section is private. Enter password to continue.</p>
                    <input
                    type="password"
                    placeholder="Password"
                    value={pswdInput}
                    onChange={e => { setPswdInput(e.target.value); setError(false) }}
                    onKeyDown={e => e.key === 'Enter' && checkPassword()}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"
                    />
                    {error && <p className="text-red-400 text-sm">Incorrect password.</p>}
                    <button
                    onClick={checkPassword}
                    className="bg-[#8dcff9] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 cursor-pointer"
                    >
                    Enter
                    </button>
                </div>
                ) : (
                <div>
                    <p className="text-sm text-gray-500">No daily posts yet. Stay tuned!</p>
                </div>
                )}
            </div>
        )}

    </div>
    )
}
