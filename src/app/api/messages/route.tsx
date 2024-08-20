import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        // Extract the message data from the request body
        const data = await request.json();

        // Log the data to see its structure (for debugging purposes)
        console.log('Received message data:', data);
        const message = data;
        const listRegex = /^\/list\b/i;

        // Check if the message text matches the regex
        if (listRegex.test(message.text)) {
            await client.query(
                `INSERT INTO messages (
                source_guid, sender_id, user_id, created_at, name, avatar_url, text, attachments, group_id, sender_type, system
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
            )`,
                [
                    message.source_guid,
                    message.sender_id,
                    message.user_id,
                    new Date(message.created_at * 1000), // Convert UNIX timestamp to JavaScript Date object
                    message.name,
                    message.avatar_url,
                    message.text,
                    message.attachments,
                    message.group_id,
                    message.sender_type,
                    message.system,
                ]
            );

            return NextResponse.json({ status: 'success' }, { status: 200 });
        }
        
        // If the message does not match the regex, do not store it
        return NextResponse.json({ status: 'ignored' });
    } catch (error) {
        console.error('Error processing message:', error);
        return NextResponse.json({ status: 'error', message: error }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const result = await client.query('SELECT * FROM messages ORDER BY created_at DESC');
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ status: 'error', message: error }, { status: 500 });
    }
}
