import { redirect } from 'next/navigation'

import { InboxScreen } from '@/components/screens/inbox-screen'
import { listMailbox } from '@/lib/mailbox/queries'
import { isMailboxOwner } from '@/lib/mailbox/session'

export default async function MailboxPage() {
  if (!(await isMailboxOwner())) redirect('/mailbox/open')
  const postcards = await listMailbox()
  return <InboxScreen postcards={postcards} />
}
