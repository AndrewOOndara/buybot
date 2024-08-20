"use client"

import React, { useEffect, useState } from 'react';
import Post from '@/components/Post/Post';

const MessageList = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/messages');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMessages(data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Messages List</h1>
            <button
                onClick={fetchMessages}
                className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Refresh
            </button>
            <ul className="space-y-6">
                {messages.map((message) => (
                    <li key={message.id}>
                        <Post
                            title={message.text}
                            description={"Some desc"}
                            price={2123123}
                            imageUrl={message.avatar_url}
                            postedAt={''} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
