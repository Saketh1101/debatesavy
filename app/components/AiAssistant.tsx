'use client';

import { useState, useRef, useEffect } from 'react';

interface AiAssistantProps {
    debateId: string;
    debateMode: 'friendly' | 'famous' | 'online';
    personalityName?: string;
}

export function AiAssistant({ debateId, debateMode, personalityName }: AiAssistantProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
        {
            role: 'assistant',
            content: `Hi! I'm your AI debate assistant. I'm here to help you improve your arguments and provide real-time feedback. Ask me anything about the debate or request suggestions!`
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                'That\'s a great point! Consider adding specific evidence to strengthen your argument.',
                'Interesting perspective! Have you considered the counterargument about...?',
                'Excellent delivery! Your argument structure is getting stronger.',
                'Your argument covers the main points well. Try adding a real-world example next time.',
                'You\'re on the right track! This logic flows well with your previous statement.',
                'Strong evidence! Now address the potential counterargument to make it even more convincing.',
                `${personalityName ? `${personalityName} might argue...` : 'Your opponent might argue...'} Have you thought about...?`,
                'That\'s persuasive! The connection between your points is clear and logical.',
                'Good attempt! Let me suggest a stronger way to phrase that argument...',
                'Great argumentation! This shows clear critical thinking.'
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40 group text-2xl font-bold"
                title="Open AI Assistant"
            >
                🤖
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 bg-slate-900 border-2 border-blue-500 rounded-lg shadow-2xl flex flex-col z-50 max-h-96 animate-in slide-in-from-bottom">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 rounded-t-lg flex justify-between items-center">
                        <div>
                            <h3 className="text-white font-bold">AI Debate Assistant</h3>
                            <p className="text-blue-100 text-xs">Always here to help</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-blue-100 transition-colors p-1 hover:bg-white/10 rounded text-lg font-bold"
                            title="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom`}
                            >
                                <div
                                    className={`max-w-xs px-4 py-2.5 rounded-lg transition-all ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                                        : 'bg-slate-800 text-gray-100 rounded-bl-none border border-slate-700'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800 text-gray-100 px-4 py-2 rounded-lg rounded-bl-none border border-slate-700">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="border-t border-slate-700 p-3 rounded-b-lg bg-slate-800/50">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-slate-800 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 border border-slate-700 transition-colors"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-all disabled:opacity-50 font-semibold text-sm hover:scale-105 active:scale-95"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
