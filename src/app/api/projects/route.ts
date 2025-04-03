import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('Missing env.SUPABASE_SERVICE_KEY');
}

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
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
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
  
      const { data, error } = await supabaseAdmin
        .from('projects')
        .insert({
          name: projectName,
          total_respondents: totalRespondents,
          user_id: user?.id,
        })
        .select()
        .single();
  
      if (error) throw error;
      console.log('data123', data);
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error creating Project:', error);
      return NextResponse.json(
        { error: 'Failed to create Project' },
        { status: 500 }
      );
    }
  }

// export async function GET(request: Request) {
//     try {
    
//         const { searchParams } = new URL(request.url);
//         const business_id = searchParams.get("business_id");

//         if (business_id) {
//         // Fetch a single business without authentication
//             const { data: business, error } = await supabaseAdmin
//                 .from("businesses")
//                 .select("*")
//                 .eq("id", business_id)
//                 .single();

//             if (error) throw error;
//             return NextResponse.json(business);
//         }

//       // Get the authorization header from the request
//       const authHeader = request.headers.get('Authorization');
//       if (!authHeader) {
//         return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
//       }
  
//       // Extract the token from the header
//       const token = authHeader.replace('Bearer ', '');
      
//       // Verify the token and get the user
//       const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
      
//       if (userError || !user) {
//         console.error('Auth error:', userError);
//         return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
//       }
  
//       const { data: businesses, error: businessesError } = await supabaseAdmin
//       .from('businesses')
//       .select('*')
//       .eq('user_id', user.id);

//         if (businessesError) throw businessesError;
//         console.log('businesses112', businesses);
//       return NextResponse.json(businesses);

//     } catch (error) {
//       console.error('Error fetching business:', error);
//       return NextResponse.json(
//         { error: 'Failed to fetch business' },
//         { status: 500 }
//       );
//     }
// } 

// export async function DELETE(request: Request) {
//     try {
//         const { id } = await request.json();
//         const { data, error } = await supabaseAdmin
//         .from('businesses')
//         .delete()
//         .eq('id', id);

//         if (error) throw error;

//         return NextResponse.json(data);
        
//     } catch (error) {
//         console.error('Error deleting business:', error);
//         return NextResponse.json(
//             { error: 'Failed to delete business' },
//             { status: 500 }
//         );
//     }
// }

