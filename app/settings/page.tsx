import { redirect } from 'next/navigation'

import { ProfileForm } from '@/components/profile-form'
import { createClient } from '@/lib/supabase/server'

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: claims } = await supabase.auth.getClaims()
  if (!claims?.claims) {
    redirect('/mailbox/open')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, display_name, updated_at')
    .eq('id', claims.claims.sub)
    .single()

  if (!profile) {
    redirect('/mailbox/open')
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <div className="w-full max-w-sm">
        <ProfileForm profile={profile} />
      </div>
    </main>
  )
}
