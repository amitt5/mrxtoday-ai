import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const projectId = params?.projectId;

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

    const { data: { user }, error: userError } = await supabaseWithAuth.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data, error } = await supabaseWithAuth
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const projectId = params.projectId;
    const updateData = await request.json();

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

    const { data: { user }, error: userError } = await supabaseWithAuth.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data, error } = await supabaseWithAuth
      .from('projects')
      .update({
        name: updateData.projectName,
        total_respondents: updateData.totalRespondents,
        // project_type: updateData.projectType,
        // min_age: updateData.minAge,
        // max_age: updateData.maxAge,
        // min_male_quota: updateData.minMaleQuota,
        // max_male_quota: updateData.maxMaleQuota,
        // min_female_quota: updateData.minFemaleQuota,
        // max_female_quota: updateData.maxFemaleQuota,
        // min_asu30_quota: updateData.minAsu30Quota,
        // max_asu30_quota: updateData.maxAsu30Quota,
        // min_aso30_quota: updateData.minAso30Quota,
        // max_aso30_quota: updateData.maxAso30Quota,
        // questionnaire: updateData.questionnaire,
      })
      .eq('id', projectId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}
