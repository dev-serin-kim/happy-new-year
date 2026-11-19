import { MailboxOpenScreen } from '@/components/screens/mailbox-open-screen'
import { getPostcardCounts } from '@/lib/postcards/queries'

export default async function MailboxOpenPage() {
  const { total } = await getPostcardCounts()
  return <MailboxOpenScreen total={total} />
}
