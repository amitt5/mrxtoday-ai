import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
        }

        // Extract the token from the header
        const token = authHeader.replace('Bearer ', '');
        const { projectName, totalRespondents } = await request.json();
  
        if (!projectName) {
          return NextResponse.json(
            { error: 'ProjectName is required' },
            { status: 400 }
          );
        }

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
          .insert({
            name: projectName,
            total_respondents: totalRespondents,
            user_id: user.id,
          })
          .select()
          .single();
  
        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
      console.error('Error creating Project:', error);
      return NextResponse.json(
        { error: 'Failed to create Project' },
        { status: 500 }
      );
    }
}

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
        }

        // Extract the token from the header
        const token = authHeader.replace('Bearer ', '');

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
            .eq('user_id', user.id);

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
