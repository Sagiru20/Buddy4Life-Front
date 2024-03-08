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