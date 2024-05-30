export interface IGuitar {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface IGuitarCart extends IGuitar {
  quantity: number;
}
