// import { useStore } from "@nanostores/react";
import { lightboxState } from "./store";
import LightboxCmp from "./Lightbox";


export default function Gallery({ photoUrls }: { photoUrls: string[] }) {
  return <>
    <LightboxCmp photoUrls={photoUrls}/>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {photoUrls.map((url, idx) => (
        <li key={idx}>
          <button 
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => lightboxState.set({ isOpen: true, startingIndex: idx })}
          >
            <img src={url} alt={`Gallery Image ${idx + 1}`}/>
          </button>
        </li>
      ))}
    </ul>
  </>
}
