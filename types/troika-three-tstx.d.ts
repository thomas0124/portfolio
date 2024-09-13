declare module 'troika-three-text' {
  import { Object3D } from 'three'

  export class Text extends Object3D {
    text: string
    fontSize: number
    color: number | string
    anchorX: number | string
    anchorY: number | string
    textAlign: string
    font: string
    maxWidth: number
    lineHeight: number
    letterSpacing: number
    overflowWrap: string
    whiteSpace: string
    outlineWidth: number
    outlineColor: number | string
    strokeWidth: number
    strokeColor: number | string
    fillOpacity: number
    strokeOpacity: number
    sync: () => void
    dispose: () => void
  }
}
