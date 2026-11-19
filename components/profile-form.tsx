'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

type Profile = {
  id: string
  email: string
  display_name: string | null
  updated_at: string
}

export function ProfileForm({ profile }: { profile: Profile }) {
  const [displayName, setDisplayName] = useState(profile.display_name ?? '')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)
    setError(null)

    const supabase = createClient()
    const { data, error } = await supabase
      .from('profiles')
      .update({ display_name: displayName })
      .eq('id', profile.id)
      .select('id')

    if (error) {
      setError(error.message)
    } else if (!data?.length) {
      setError('Could not update your profile.')
    } else {
      setMessage('Saved.')
      router.refresh()
    }
    setIsSaving(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium text-lg tracking-normal">Settings</CardTitle>
        <CardDescription>Your profile</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={profile.email} readOnly disabled />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="display-name">Display name</Label>
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Last updated <time dateTime={profile.updated_at}>{profile.updated_at}</time>
          </p>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
