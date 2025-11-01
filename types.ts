export interface IndexNode {
  id: string;
  name: string;
  children?: IndexNode[];
}

export interface Chunk {
  chunk_id: string;
  chapter_id: string;
  text: string;
}

export interface RawdaChunk {
  chunk_id: string;
  subject_ar: string;
  hierarchical_level: number;
  text: string;
}

export interface Source {
  book_title: string;
  author: string;
  original_text: string;
}

export type AtomType = 'Sharh' | 'Dalil' | 'Naqd' | 'Muqaranah';
export type AtomSubType = 'روائي' | 'فقهي' | 'أصولي' | 'رجالي' | 'لغوي' | null;

export interface KnowledgeAtom {
  atom_id: string;
  chunk_id: string;
  atom_type: AtomType;
  atom_subtype: AtomSubType;
  summary_ar: string;
  structured_content: { [key: string]: any };
  source: Source;
}