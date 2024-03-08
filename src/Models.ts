export enum Gender {
    MALE = "male",
    FEMALE = "female",
}

export enum PostsOwnerShip {
    ALL_POSTS = "All Posts",
    MY_POSTS = "My Posts",
}

export interface IDogInfo {
    name: string;
    breed: string;
    gender: Gender;
    age: number;
    weight?: number;
    height?: number;
    color?: string;
    _id?: string;
}

export interface IComment {
    _id: string;
    authorId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPost {
    _id: string;
    title: string;
    ownerId: string;
    description: string;
    dogInfo: IDogInfo;
    city?: string;
    imageUrl?: string;
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IBreed {
    id: number;
    breedName: string;
    breedType: string;
    breedDescription: string;
    furColor: string;
    origin: string;
    minHeightInches: number;
    maxHeightInches: number;
    minWeightPounds: number;
    maxWeightPounds: number;
    minLifeSpan: number;
    maxLifeSpan: number;
    imgThumb?: string;
    imgSourceURL?: string;
    imgAttribution?: string;
    imgCreativeCommons?: boolean;
}

interface IUserInfo {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    imageUrl?: string;
}
export interface ILoggedUser {
    accessToken: string;
    userInfo?: IUserInfo;
}
