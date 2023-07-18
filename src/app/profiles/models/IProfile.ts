export interface IProfile{
    _id: string,
    user: string,
    company: string,
    website: string,
    location: string,
    designation: string,
    skills: string[],
    bio: string,
    githubusername: string,
    education: IEducation[],
    experience: IExperience[],
    social: ISocial[]
}

export interface IExperience{
    _id ?: string,
    title: string,
    company: string,
    location: string,
    from: string,
    to: string,
    current: boolean,
    description: string
}

export interface IEducation{
    _id ?: string,
    school: string, 
    degree: string,
    fieldofstudy: string,
    from: string,
    to: string,
    current: boolean,
    description: string
}

export interface ISocial{
    _id ?: string,
    facebook: string,
    instagram: string,
    twitter: string,
    linkedin: string,
    youtube: string
}