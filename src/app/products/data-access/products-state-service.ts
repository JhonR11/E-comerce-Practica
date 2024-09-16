import { inject, Injectable, signal } from "@angular/core";
import { Product } from "../../shared/interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { ProductService } from "./products.service";
import { catchError, map, of, startWith, Subject, switchMap } from "rxjs";

interface State{
    products: Product[];
    status: "loading" | "success" | "error";
    page: number;
}

@Injectable()
export class ProductStateService{

    private producsService = inject(ProductService);
    private initialState: State = {
        products: [],
        status: "loading" as const,
        page:1,
      };
      changePage$ = new Subject<number>();
      loadProducts$ = this.changePage$.pipe(
        startWith(1),
        switchMap((page)=> this.producsService.getProducts(page)),
        map((products)=>({products, status: "success" as const})),
        catchError(()=> {
            return of ({
                producs: [],
                status: "error" as const,
            });
        }),
    );

    state = signalSlice({
        initialState: this.initialState,
        sources: [
            this.changePage$.pipe(
                map((page)=>({page, status: "loading" as const})),
            ),
            this.loadProducts$
        ],
    })

}