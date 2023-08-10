interface Item {
  _id: number;
  name: string;
  inStock: boolean | undefined;
  bestBeforeDate: Date;
  storeDays: number;
  category: string;
}
