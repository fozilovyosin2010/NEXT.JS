export interface Idata {
  id: number;
  isCompleted: boolean;
  images: Iimage[];
  name: string;
  description: string;
}

export interface Iimage {
  id: number;
  imageName: string;
}
