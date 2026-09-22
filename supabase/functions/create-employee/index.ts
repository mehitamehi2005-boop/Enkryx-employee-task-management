import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: corsHeaders });

  const authorization = request.headers.get('Authorization');
  if (!authorization) return Response.json({ error: 'Unauthorized.' }, { status: 401, headers: corsHeaders });

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    return Response.json({ error: 'Server configuration error: missing Supabase environment variables.' }, { status: 500, headers: corsHeaders });
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey);
  const token = authorization.replace(/^Bearer\s+/i, '');
  const { data: authData, error: authError } = await adminClient.auth.getUser(token);
  if (authError || !authData.user) return Response.json({ error: 'Unauthorized.' }, { status: 401, headers: corsHeaders });

  const { data: requester, error: requesterError } = await adminClient.from('employees').select('role').eq('id', authData.user.id).single();
  if (requesterError || requester?.role !== 'admin') {
    return Response.json({ error: 'Administrator access is required.' }, { status: 403, headers: corsHeaders });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request: payload must be valid JSON.' }, { status: 400, headers: corsHeaders });
  }

  const { name, email, password } = body ?? {};
  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.trim() || typeof password !== 'string' || password.length < 8) {
    return Response.json({ error: 'Name, email, and a password of at least 8 characters are required.' }, { status: 400, headers: corsHeaders });
  }

  const { data: created, error: createError } = await adminClient.auth.admin.createUser({
    email: email.trim(),
    password,
    email_confirm: true,
    user_metadata: { name: name.trim(), role: 'employee' },
  });
  if (createError || !created.user) {
    return Response.json({ error: createError?.message ?? 'Unable to create the account.' }, { status: 400, headers: corsHeaders });
  }

  const { data: employee, error: profileError } = await adminClient
    .from('employees')
    .insert({ id: created.user.id, name: name.trim(), email: email.trim(), role: 'employee' })
    .select('id, name, email, role, created_at')
    .single();

  if (profileError) {
    await adminClient.auth.admin.deleteUser(created.user.id);
    return Response.json({ error: profileError.message }, { status: 400, headers: corsHeaders });
  }

  return Response.json({ employee }, { status: 201, headers: corsHeaders });
});
