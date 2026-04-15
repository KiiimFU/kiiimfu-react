import { useState } from 'react'

export default function SuggestionForm({ onClose }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        await fetch('https://formspree.io/f/xnjlnybl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        })
        setSubmitted(true)
    }

    return (
        <div className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-6 w-80 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[#4799cc]">Send a Suggestion</h3>
                    <button onClick={onClose} className="hover:scale-125 transition-transform cursor-pointer">✕</button>
                </div>

                {submitted ? (
                    <p className="text-sm text-gray-700 text-center py-4">Thanks for your suggestion! 😊</p>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            required
                            placeholder="Name *"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Email (optional)"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"
                        />
                        <textarea
                            required
                            placeholder="Your suggestion *"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            rows={3}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none resize-none"
                        />
                        <button
                            type="submit"
                            className="bg-[#8dcff9] text-white py-2 rounded-lg font-medium hover:opacity-90 cursor-pointer"
                        >
                            Send
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
