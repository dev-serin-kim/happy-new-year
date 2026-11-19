import { HomeScreen } from '@/components/screens/home-screen'
import { getPostcardCounts } from '@/lib/postcards/queries'

export default async function Home() {
  const { total, publicCount } = await getPostcardCounts()
  return <HomeScreen total={total} publicCount={publicCount} />
}
