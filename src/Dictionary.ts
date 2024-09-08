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

export const Categories = {
    'SoftwareArchitecture': { id: 1, label: 'Software Architecture', abbreviated: 'software-arch' },
    'Instructives': { id: 2, label: 'Instructives', abbreviated: 'instructives' },
    'BestPractices': { id: 3, label: 'Best Practices', abbreviated: 'best-practices' },
    'Algorithms': { id: 4, label: 'Algorithms', abbreviated: 'algorithms' }
};

export const Labels = {
    'JavaScript': { id: 0, label: 'JavaScript', abbreviated: 'javascript' },
    'MobileHybrid': { id: 1, label: 'MobileHybrid', abbreviated: 'mobile-hybrid' },
    'FrontEnd': { id: 2, label: 'Front-end', abbreviated: 'front-end' },
    'BackEnd': { id: 3, label: 'Back-end', abbreviated: 'back-end' },
    'HowTo': { id: 4, label: 'HowTo', abbreviated: 'how-to' },
    'DevBlog': { id: 5, label: 'DevBlog', abbreviated: 'dev-blog' },
    'CodingChallenges': { id: 6, label: 'Coding challenges', abbreviated: 'coding-challenges' },
    'Tools': { id: 7, label: 'Tools', abbreviated: 'tools' }
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
