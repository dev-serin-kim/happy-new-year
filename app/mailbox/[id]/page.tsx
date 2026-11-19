import { notFound, redirect } from 'next/navigation'

import { CardDetailScreen } from '@/components/screens/card-detail-screen'
import { openMailboxPostcard } from '@/lib/mailbox/queries'
import { isMailboxOwner } from '@/lib/mailbox/session'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default async function MailboxPostcardPage({ params }: PageProps<'/mailbox/[id]'>) {
  if (!(await isMailboxOwner())) redirect('/mailbox/open')
  const { id } = await params
  const postcard = UUID.test(id) ? await openMailboxPostcard(id) : null
  if (!postcard) notFound()
  return <CardDetailScreen postcard={postcard} />
}
