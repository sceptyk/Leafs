import {IBase, CBase} from '../model/base.model';

export interface IInvitation extends IBase{
    uid: string;
}

export class Invitation implements CBase{

    private _id: string;
    private _uid: string;

    get id():string{
        return this._id;
    }

    set id(id:string){
        this._id = id;
    }

    get uid():string{
        return this._uid;
    }

    set uid(uid:string){
        this._uid = uid;
    }

    constructor(o: IInvitation){
        this._id = o.$key;
        this._uid = o.uid;
    }

    public toObject(){
        return {
            uid: this._uid
        }
    }
}