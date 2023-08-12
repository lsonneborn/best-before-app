interface Item {
  _id: number;
  name: string;
  inStock: boolean | undefined;
  bestBeforeDate: Date | null;
  storeDays: number;
  category: string;
}
