 'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface AiAssistantProps {
    debateId: string;
    debateMode: 'friendly' | 'famous' | 'online';
    personalityName?: string;
}

export const AiAssistant = forwardRef(function AiAssistant({ debateId, debateMode, personalityName }: AiAssistantProps, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [summaryError, setSummaryError] = useState<string | null>(null);
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

    useImperativeHandle(ref, () => ({
        addMessage: (msg: { role: 'user' | 'assistant'; content: string }) => {
            setMessages(prev => [...prev, msg]);
        },
        open: () => setIsOpen(true),
    }));

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Not authenticated. Please login first.');
            }

            const response = await fetch('/api/ai-assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: userMessage,
                    debateId,
                    debateMode,
                    personalityName,
                    debateTopic: debateMode === 'friendly' ? 'Debate' : undefined,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get AI response');
            }

            const data = await response.json();
            const aiResponse = data.response || 'I could not generate a response. Please try again.';

            setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error generating a response. Please try again later.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateSummary = async () => {
        if (isSummaryLoading) return;
        setIsSummaryLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Not authenticated');
            setSummaryError(null);
            const res = await fetch('/api/ai-assistant/summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ debateId }),
            });

            if (!res.ok) {
                const txt = await res.text();
                const msg = `Summary API error: ${txt}`;
                setSummaryError(msg);
                throw new Error(msg);
            }

            const data = await res.json();
            const result = data.result;

            let content = '';
            if (!result) {
                content = 'No summary returned from the server.';
            } else if (result.raw && typeof result.raw === 'string') {
                content = `Summary (raw):\n${result.raw}`;
            } else if (typeof result === 'object') {
                const parts: string[] = [];
                if (result.summary) parts.push(`Summary: ${result.summary}`);
                if (Array.isArray(result.proPoints)) parts.push(`PRO points:\n- ${result.proPoints.join('\n- ')}`);
                if (Array.isArray(result.conPoints)) parts.push(`CON points:\n- ${result.conPoints.join('\n- ')}`);
                if (Array.isArray(result.suggestedRebuttals)) parts.push(`Suggested rebuttals:\n- ${result.suggestedRebuttals.join('\n- ')}`);
                if (parts.length === 0) parts.push(JSON.stringify(result, null, 2));
                content = parts.join('\n\n');
            } else {
                content = String(result);
            }

            setMessages(prev => [...prev, { role: 'assistant', content }]);
        } catch (err) {
            console.error('Summary error:', err);
            if (!summaryError) setSummaryError('Failed to generate summary. Check server logs.');
            setMessages(prev => [...prev, { role: 'assistant', content: 'Failed to generate summary. You can retry.' }]);
        } finally {
            setIsSummaryLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40 group text-lg font-bold"
                title="Open AI Assistant"
            >
                AI
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
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleGenerateSummary}
                                disabled={isSummaryLoading}
                                className="bg-white/10 text-white text-sm px-3 py-1 rounded hover:bg-white/20 disabled:opacity-50"
                                title="Generate debate summary"
                            >
                                {isSummaryLoading ? 'Summarizing...' : 'Generate Summary'}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-blue-100 transition-colors p-1 hover:bg-white/10 rounded text-lg font-bold"
                                title="Close"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    {summaryError && (
                        <div className="px-4 py-2 bg-red-700/10 border-t border-red-600/20 text-sm text-red-200 flex items-center justify-between">
                            <div className="mr-2">{summaryError}</div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleGenerateSummary}
                                    disabled={isSummaryLoading}
                                    className="text-sm bg-red-600/80 hover:bg-red-600 px-2 py-1 rounded disabled:opacity-50"
                                >
                                    {isSummaryLoading ? 'Retrying...' : 'Retry'}
                                </button>
                                <button
                                    onClick={() => setSummaryError(null)}
                                    className="text-sm text-red-200/80 hover:text-white px-2 py-1 rounded"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    )}

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
                                    {msg.content.includes('__VIEW_FULL_ANALYSIS__') ? (
                                        <div>
                                            <p className="text-sm leading-relaxed">{msg.content.replace('__VIEW_FULL_ANALYSIS__', '').trim()}</p>
                                            <div className="mt-2">
                                                <button
                                                    onClick={() => {
                                                        const el = document.getElementById('debate-summary');
                                                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                        setIsOpen(false);
                                                    }}
                                                    className="text-xs bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20"
                                                >
                                                    View full analysis
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                    )}
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
