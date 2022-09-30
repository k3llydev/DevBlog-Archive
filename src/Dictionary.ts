/**
 * WARNING
 * 
 * This file contains constants only. Adding or removing elements will alter everything already configured in every file.
 * Recommendation: DO NOT MODIFY.
 * 
 */
const SkillLevels = [
    'Dummies',
    'Beginner',
    'Intermediatte',
    'Advanced',
    'Expert'
];

const Categories = {
    'SoftwareArchitecture': { id: 1, label: 'Software Architecture', abbreviated: 'Software Arch.' },
    'Manuals': { id: 2, label: 'Manual', abbreviated: 'Manual' }
};

const Labels = {
    'JavaScript': { id: 0, label: 'JavaScript', abbreviated: 'js' },
    'MobileBanking': { id: 1, label: 'MobileBanking', abbreviated: 'mobbank' },
    'FrontEnd': { id: 2, label: 'Front-end', abbreviated: 'front' }
};

export const MapLabel = (label: string): TagDetail => {
    const Label = Labels[label];
    if(!Label) throw new Error(`An article provided label "${label}" which is not registered locally.`);
    return Label;
};

export const MapLevel = (level: number): ComplexityDetail => {
    const number = +level;
    const isLevelValid = 0 <= number && number < SkillLevels.length;
    if(!isLevelValid) throw new Error(`An invalid complexity level was provided... (${number})`);
    
    return {
        id: level,
        label: SkillLevels[number]
    };
};

export const MapCategory = (categoryId: string): CategoryDetail => {
    const category = Categories[categoryId];
    if(!category) throw Error('An article provided an invalid category. Or is the category missing in array?');
    return category;
};
