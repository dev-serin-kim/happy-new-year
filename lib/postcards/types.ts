import type { StampKey } from './rules'

// One postcard on the wall. Private postcards carry no nickname, message, or reply.
export type WallPostcard =
  | { id: string; isPublic: true; stamp: StampKey; createdAt: string; nickname: string; message: string; reply: string | null }
  | { id: string; isPublic: false; stamp: StampKey; createdAt: string }

// A private postcard opened from the secret box.
export type SecretPostcard = {
  id: string
  stamp: StampKey
  createdAt: string
  nickname: string
  message: string
  reply: string | null
}
