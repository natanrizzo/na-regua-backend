export class ProductModel {
    constructor(
        public name: string,
        public salePrice: number,
        public profit: number,
        public id?: string,
    ) {}
}