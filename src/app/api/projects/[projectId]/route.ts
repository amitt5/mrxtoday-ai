import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
        }

        // Extract the token from the header
        const token = authHeader.replace('Bearer ', '');
        const { projectId } = await request.json();
        // Create a new Supabase client with the user's token
        const supabaseWithAuth = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                global: {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            }
        );

        // Get the user's ID
        const { data: { user }, error: userError } = await supabaseWithAuth.auth.getUser();
        if (userError || !user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const { data, error } = await supabaseWithAuth
            .from('projects')
            .select('*')
            .eq('user_id', user.id)
            .eq('id', projectId);

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}
