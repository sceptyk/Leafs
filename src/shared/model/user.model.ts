export interface User{
    card: Card,
    links: Link[];
}

export interface ILink{
    provider: string;
    data: string;
}

export class Link implements ILink{

    private _provider:string;
    private _data: string;

    get provider():string{
        return this._provider;
    }

    set provider(p:string){
        this._provider = p;
    }

    get data():string{
        return this._data;
    }

    set data(d:string){
        this._data = d;
    }

    constructor(
        provider?: string,
        data?: string
    ){
        this._data = data || "";
        this._provider = provider || "";
    }

    public toJSON():ILink{
        return {
            provider: this._provider,
            data: this._data
        }
    }
}

export interface ICard{
    name: string;
    avatar: string;
    status: string;
}

export class Card implements ICard{

    private _name:string;
    private _avatar:string;
    private _status:string;

    get name():string{
        return this._name;
    }

    set name(n:string){
        this._name = n;
    }

    get avatar():string{
        return this._avatar;
    }

    set avatar(a:string){
        this._avatar = a;
    }

    get status():string{
        return this._status;
    }

    set status(s:string){
        this._status = s;
    }

    constructor(
        avatar?: string,
        name?: string,
        status?: string
    ){
        this._avatar = avatar || "";
        this._name = name || "";
        this._status = status || "";
    }

    public fromObject(card:ICard){
        this._avatar = card.avatar || "";
        this._name = card.name || "";
        this._status = card.status || "";

        return this;
    }

    public toJSON():ICard{
        return {
            avatar: this._avatar,
            name: this._name,
            status: this._status
        }
    }
}