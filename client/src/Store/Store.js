import { makeAutoObservable } from "mobx";

export default class Store{
    constructor() {
        this._page = 1;
        this._limit = 5;
        this._totalCount = 0;


        makeAutoObservable(this);
    };

    setPage(data) {
        this._page = data;
    };
    setLimit(data){
        this._limit = data;
    };
    setTotalCount(data){
        this._totalCount = data;
    };

    get page(){
        return this._page;
    };
    get limit(){
        return this._limit;
    };
    get totalCount(){
        return this._totalCount;
    };
};