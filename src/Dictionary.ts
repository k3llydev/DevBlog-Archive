/**
 * WARNING
 * 
 * Consider that this file is for constants. Adding or removing elements will alter everything already configured in every file.
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
    'SoftwareArchitecture': { id: 1, label: 'Software Architecture', abbreviated: 'Software Arch.' }
};

export const MapLevel = (level: number): ComplexityDetail => {
    const number = +level;
    const isLevelValid = 0 <= number && number < SkillLevels.length;
    if(!isLevelValid) throw new TypeError(`An invalid complexity level was provided... (${number})`);
    
    return {
        id: level,
        label: SkillLevels[number]
    };
};

export const MapCategory = (categoryId: string): CategoryDetail => {
    const category = Categories[categoryId];
    if(!category) throw TypeError('An article provided an invalid category. Or is the category missing in array?');
    return category;
};
