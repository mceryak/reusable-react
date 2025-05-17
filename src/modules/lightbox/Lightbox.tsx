import "yet-another-react-lightbox/styles.css";

import { useStore } from "@nanostores/react";
import { lightboxState } from "./store.ts";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";


export default function LightboxCmp({ photoUrls }: { photoUrls: string[] }) {
  const $lightboxState = useStore(lightboxState);
  const { isOpen, startingIndex } = $lightboxState;

  return <Lightbox
    open={isOpen}
    plugins={[Zoom, Fullscreen]}
    index={startingIndex}
    close={() => lightboxState.set({ isOpen: false, startingIndex: 0 })}
    slides={photoUrls.map(url => ({ src: url }))}
  />;
}
