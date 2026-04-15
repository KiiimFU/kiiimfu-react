import {useState, useRef, useEffect} from 'react'
import {GoogleGenerativeAI} from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)


export default function ChatBubble() {

    const [open, setOpen] = useState(false)

    const [msg, setMsg] = useState([{role:'bot', text:"Hiiii, welcome to Kimberly's website! What do you want to know about me?"}])

    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    },[msg])

    const SYSTEM_PROMPT = `You are an AI ambassador for Kimberly Fu, a Computer Science student at the University of Toronto (ASIP stream, Class of 2028). 
        Your goal is to represent her technical expertise and research interests to recruiters and lab leads.

        Key Information for Kimberly:
        - Research Interests: Intelligent Assistive Technology, Digital Twin applications in healthcare/pharmaceuticals, and Social Network Analysis (specifically power law distributions and influence models).
        - Academic Background: Strong focus on Algorithm Design (CSC373), Network Complexity, and Data Modeling.
        - Key Projects: 
            * Neurological Patient Care System (MLP model for health prediction).
            * ML Random Forest Model (Survey-based prediction with 70.24% accuracy).
            * FamCalendar (PWA with secure iCloud integration).
            * Guangzhou Anchoracademy (Co-founder, supported 400+ students).
        - Technical Skills: Python (ML libraries), Java, JavaScript (React/Node), Flask, PostgreSQL.
        - Leadership/Extracurriculars: Math Outreach TA, Piano (ABRSM Grade 8), Basketball (City Champion & Coach).

        Guidelines:
        - If asked about research or labs, emphasize her interest in applying digital twins to clinical operations.
        - Tone: Professional, academically curious, and friendly.
        - Keep responses concise (under 3 sentences unless asked for detail).
        - Contact: kimberlyfu006@gmail.com | GitHub: KiiimFU.`

    return (
        <>
            <button onClick={() => setOpen(o => !o)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-[#8dcff9] rounded-full flex items-center justify-center text-2xl shadow-lg z-50 hover:scale-110 transition-transform cursor-pointer">
                💬

            </button>

            {/* if open is false, nothing renders, if true, the window renders */}
            {open && (
                <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-xl z-50 flex flex-col border border-[#8dcff9]">
                {/* Header */}
                <div className="bg-[#8dcff9] text-white font-bold px-4 py-3 rounded-t-xl flex justify-between items-center">
                <span>Ask about Kim!</span>
                <button onClick={() => setOpen(false)} className="hover:scale-125 transition-transform cursor-pointer">✕</button>
                </div>

                {/* Messages area - empty for now */}
                <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
                {msg.map((m, i) => (
                    <div key={i} className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                    m.role === 'user'
                        ? 'self-end bg-white border border-gray-200 text-black rounded-br-none'
                        : 'self-start bg-[#2a2a2a] text-white rounded-bl-none'
                    }`}>
                    {m.text}
                    <div ref={bottomRef} />
                    </div>
                ))}
                {loading && (
                    <div className="self-start bg-[#2a2a2a] text-white px-3 py-2 rounded-xl text-sm rounded-bl-none animate-pulse">
                        Thinking...
                    </div>
                )}
                </div>


                {/* Input area */}
                <div className="flex border-t border-gray-200 p-2 gap-2">
                    <input
                        className="flex-1 text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none"
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-[#7ab8e0] text-white text-sm px-3 py-2 rounded-lg font-bold hover:scale-105 transition-transform cursor-pointer"
                    >
                        Send
                    </button>
                </div>
                </div>
            )}
        </>
    )

    async function sendMessage() {
    if (!input.trim()) {return}
    const userText = input.trim()
    setInput('')
    setMsg(prev => [...prev, { role: 'user', text: userText }])
    setLoading(true)

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash', systemInstruction: SYSTEM_PROMPT })
        const chat = model.startChat({
            history: msg
                .filter((_,i) => i !== 0)
                .map(m => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.text }]
            })),
            // systemInstruction: SYSTEM_PROMPT,
        })
        const result = await chat.sendMessage(userText)
        setMsg(prev => [...prev, { role: 'bot', text: result.response.text() }])
    } 
    catch (e) {
        console.error(e)
        setMsg(prev => [...prev, { role: 'bot', text: 'Sorry, something went wrong. Try again!' }])
    } 
    finally {
        setLoading(false)
    }
}

}
