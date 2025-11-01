import { IndexNode, Chunk, KnowledgeAtom, RawdaChunk } from '../types';

const MOCK_DELAY = 500;

// --- PUBLIC-FACING MOCK DATA ---

const indexData: IndexNode[] = [
  {
    id: 'intro',
    name: 'المقدمة',
    children: [
      { id: 'intro-1', name: 'الفصل الأول: في تعريف الفقه' },
      { id: 'intro-2', name: 'الفصل الثاني: في موضوع الفقه' },
    ],
  },
  {
    id: 'kitab_tahara',
    name: 'كتاب الطهارة',
    children: [
      {
        id: 'bab_miyah',
        name: 'الباب الأول: المياه',
        children: [
          { id: 'ch1-sec1', name: 'القسم الأول: الماء المطلق' },
          { id: 'ch1-sec2', name: 'القسم الثاني: الماء المضاف' },
        ],
      },
      { id: 'bab_wudu', name: 'الباب الثاني: الوضوء' },
    ],
  },
  {
    id: 'kitab_salah',
    name: 'كتاب الصلاة',
    children: [
        { id: 'ch2-sec1', name: 'الفصل الأول: في أعداد الصلوات' },
        { id: 'ch2-sec2', name: 'الفصل الثاني: في أوقات الصلوات' },
    ],
  }
];

const chunksData: Record<string, Chunk[]> = {
  'ch1-sec1': [
    { chunk_id: 'c1s1_1', chapter_id: 'ch1-sec1', text: 'الماء المطلق هو ما يصح إطلاق اسم الماء عليه من دون إضافة شيء إليه، وهو على أقسام.' },
    { chunk_id: 'c1s1_2', chapter_id: 'ch1-sec1', text: 'من أقسامه: الجاري، والنابع، والبئر، والمطر، والكر، والقليل. ولكل منها أحكام تخصه.' },
    { chunk_id: 'c1s1_3', chapter_id: 'ch1-sec1', text: 'لا ينجس الماء الجاري بملاقاة النجاسة ما لم يتغير أحد أوصافه الثلاثة: اللون أو الطعم أو الرائحة.' },
  ],
  'ch1-sec2': [
    { chunk_id: 'c1s2_1', chapter_id: 'ch1-sec2', text: 'الماء المضاف هو المعتصر من الأجسام، كماء الرمان وماء الورد، أو الممزوج بشيء آخر.' },
    { chunk_id: 'c1s2_2', chapter_id: 'ch1-sec2', text: 'هذا النوع من الماء لا يرفع الحدث ولا يزيل الخبث، ويتنجس بملاقاة قليل من النجاسة.' },
  ],
};

const atomsData: Record<string, KnowledgeAtom[]> = {
    'c1s1_2': [
        { atom_id: 'atom1', chunk_id: 'c1s1_2', atom_type: 'Sharh', atom_subtype: null, summary_ar: 'شرح مفهوم الكر عند الفقهاء وأبعاده.', structured_content: { "التعريف": "الكر هو مقدار معين من الماء...", "الأبعاد": "اختلف في تحديده بالأبعاد، والمشهور..." }, source: { book_title: 'جواهر الكلام', author: 'النجفي', original_text: 'النص الأصلي من كتاب جواهر الكلام حول الكر...' } },
        { atom_id: 'atom2', chunk_id: 'c1s1_2', atom_type: 'Dalil', atom_subtype: 'روائي', summary_ar: 'رواية صحيحة عن الإمام الصادق (ع) في تحديد الكر.', structured_content: { "سند الرواية": "محمد بن يعقوب عن...", "متن الرواية": "الماء إذا بلغ قدر كر لم ينجسه شيء." }, source: { book_title: 'الكافي', author: 'الكليني', original_text: 'النص الأصلي للرواية من كتاب الكافي...' } },
    ],
    'c1s1_3': [
        { atom_id: 'atom3', chunk_id: 'c1s1_3', atom_type: 'Naqd', atom_subtype: null, summary_ar: 'نقد الرأي القائل بأن الماء الجاري لا ينجس مطلقاً.', structured_content: { "المناقشة": "قد يقال إن إطلاق عدم التنجيس معارض بالعمومات...", "الجواب": "يمكن الجواب بأن..." }, source: { book_title: 'مستمسك العروة الوثقى', author: 'السيد الحكيم', original_text: 'النص الأصلي من المستمسك...' } },
        { atom_id: 'atom4', chunk_id: 'c1s1_3', atom_type: 'Muqaranah', atom_subtype: 'فقهي', summary_ar: 'مقارنة بين رأي المشهور ورأي بعض المتقدمين في المسألة.', structured_content: { "رأي المشهور": "عدم التنجس إلا بالتغير.", "الرأي الآخر": "التنجس بمجرد الملاقاة." }, source: { book_title: 'الخلاف', author: 'الشيخ الطوسي', original_text: 'النص الأصلي من كتاب الخلاف...' } },
        { atom_id: 'atom5', chunk_id: 'c1s1_3', atom_type: 'Dalil', atom_subtype: 'أصولي', summary_ar: 'دليل أصولي يتعلق باستصحاب الطهارة في الماء الجاري.', structured_content: { "تقريب الاستدلال": "الماء كان طاهراً وشككنا في بقاء طهارته..." }, source: { book_title: 'كفاية الأصول', author: 'الآخوند الخراساني', original_text: 'النص الأصلي من كفاية الأصول...' } },
    ]
};


// --- ADMIN MOCK DATA ---
let adminChunksData: RawdaChunk[] = [
    { chunk_id: 'c1s1_1', subject_ar: 'تعريف الماء المطلق', hierarchical_level: 1, text: 'الماء المطلق هو ما يصح إطلاق اسم الماء عليه من دون إضافة شيء إليه، وهو على أقسام.' },
    { chunk_id: 'c1s1_2', subject_ar: 'أقسام الماء المطلق', hierarchical_level: 2, text: 'من أقسامه: الجاري، والنابع، والبئر، والمطر، والكر، والقليل. ولكل منها أحكام تخصه.' },
    { chunk_id: 'c1s1_3', subject_ar: 'حكم الماء الجاري', hierarchical_level: 2, text: 'لا ينجس الماء الجاري بملاقاة النجاسة ما لم يتغير أحد أوصافه الثلاثة: اللون أو الطعم أو الرائحة.' },
];

let adminAtomsData: KnowledgeAtom[] = Object.values(atomsData).flat();

// --- API FUNCTIONS ---

const simulateFetch = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));
}

export const fetchIndex = (): Promise<IndexNode[]> => simulateFetch(indexData);
export const fetchChunks = (chapterId: string): Promise<Chunk[]> => simulateFetch(chunksData[chapterId] || []);
export const fetchAtoms = (chunkId: string): Promise<KnowledgeAtom[]> => simulateFetch(atomsData[chunkId] || []);

// --- ADMIN API FUNCTIONS ---

export const login = (user: string, pass: string): Promise<{token: string}> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user === 'admin' && pass === 'admin') {
                resolve({ token: 'fake-jwt-token-for-admin-user' });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, MOCK_DELAY);
    });
};

export const fetchAdminChunks = (): Promise<RawdaChunk[]> => simulateFetch([...adminChunksData]);

export const uploadAdminChunks = (newChunks: RawdaChunk[]): Promise<{ message: string, count: number }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            newChunks.forEach(newChunk => {
                const index = adminChunksData.findIndex(c => c.chunk_id === newChunk.chunk_id);
                if (index !== -1) {
                    adminChunksData[index] = newChunk; // Update
                } else {
                    adminChunksData.push(newChunk); // Insert
                }
            });
            resolve({ message: 'Bulk upload successful', count: newChunks.length });
        }, MOCK_DELAY);
    });
};

export const deleteAdminChunk = (chunkId: string): Promise<{ message: string }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            adminChunksData = adminChunksData.filter(c => c.chunk_id !== chunkId);
            resolve({ message: 'Chunk deleted successfully' });
        }, MOCK_DELAY);
    });
};

export const fetchAdminAtoms = (filters: { [key: string]: string } = {}): Promise<KnowledgeAtom[]> => {
    let results = [...adminAtomsData];
    if (filters.chunk_id) {
        results = results.filter(a => a.chunk_id.includes(filters.chunk_id));
    }
    if (filters.atom_type) {
        results = results.filter(a => a.atom_type === filters.atom_type);
    }
    if (filters.book_title) {
        results = results.filter(a => a.source.book_title.includes(filters.book_title));
    }
    return simulateFetch(results);
};

export const updateAdminAtom = (atomId: string, updatedAtom: KnowledgeAtom): Promise<KnowledgeAtom> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = adminAtomsData.findIndex(a => a.atom_id === atomId);
            if (index !== -1) {
                adminAtomsData[index] = updatedAtom;
                resolve(updatedAtom);
            } else {
                reject(new Error('Atom not found'));
            }
        }, MOCK_DELAY);
    });
};

export const deleteAdminAtom = (atomId: string): Promise<{ message: string }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            adminAtomsData = adminAtomsData.filter(a => a.atom_id !== atomId);
            resolve({ message: 'Atom deleted successfully' });
        }, MOCK_DELAY);
    });
};