import { createClient } from '@supabase/supabase-js'
export async function handler(event) {
  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
  const { accountIds, message, scheduledAt, userId } = JSON.parse(event.body)
  const { data, error } = await supabase.from('scheduled_posts').insert({ user_id: userId, account_ids: accountIds, message, scheduled_at: scheduledAt, status: 'queued' }).select()
  if (error) return { statusCode: 400, body: JSON.stringify({ error }) }
  return { statusCode: 200, body: JSON.stringify({ success: true, post: data[0] }) }
}
