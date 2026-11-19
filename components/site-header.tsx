import Link from 'next/link'

import { LogoutButton } from '@/components/logout-button'
import { buttonVariants } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'

export async function SiteHeader() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const isSignedIn = Boolean(data?.claims)

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-heading font-semibold">
          happy-new-year
        </Link>
        <nav className="flex items-center gap-2">
          {isSignedIn ? (
            <>
              <Link href="/settings" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                Settings
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/auth/login" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
