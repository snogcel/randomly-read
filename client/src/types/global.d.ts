// Global type declarations for client-side

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

// Extend Window interface for any global variables
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    gtag?: (...args: any[]) => void;
  }
}

// Module declarations for packages without types
declare module 'medium-draft' {
  export const MediumDraftEditor: any;
  export const createEditorState: any;
  export const Block: any;
  export const Inline: any;
}

declare module 'draft-convert' {
  export const convertToHTML: any;
  export const convertFromHTML: any;
}

declare module 'draft-js-import-html' {
  export const stateFromHTML: any;
}

declare module 'react-fader' {
  export const Fader: any;
}

declare module 'react-awesome-button' {
  export const AwesomeButton: any;
}

declare module 'react-render-html' {
  const renderHTML: (html: string) => React.ReactElement;
  export default renderHTML;
}

declare module 'pretty-ms' {
  const prettyMs: (milliseconds: number, options?: any) => string;
  export default prettyMs;
}

declare module 'rc-slider' {
  export const Slider: any;
  export const Range: any;
}

declare module 'sentencer' {
  export const make: (template: string) => string;
  export const configure: (config: any) => void;
}

export {};