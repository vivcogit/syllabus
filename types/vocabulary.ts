export type VocabularyItem = {
    word: string,
    translation: string,
    example: string | undefined,
};

export type VocabularyData = Array<VocabularyItem>;
