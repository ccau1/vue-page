export interface TextProperties {
  // the tag type to use
  tagType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small';
  maxLength?: number;
  multiline?: boolean;
}
