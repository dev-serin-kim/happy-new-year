import { WallScreen } from '@/components/screens/wall-screen'
import { getWallPostcards } from '@/lib/postcards/queries'

export default async function WallPage() {
  const postcards = await getWallPostcards()
  return <WallScreen postcards={postcards} />
}
