import { atom } from "nanostores";

export type LightboxState = {
  isOpen: boolean
  startingIndex: number
}

const defaultLightboxState: LightboxState = { isOpen: false, startingIndex: 0 };
export const lightboxState = atom(defaultLightboxState);