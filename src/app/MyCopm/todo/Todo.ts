export class Todo {
    _id:string;
    srno: number;
    title: string;
    desc: string;
    active: boolean;
    constructor(id:string,srno: number, title: string, desc: string, active: boolean) {
        this._id =id;
        this.srno = srno;
        this.title = title;
        this.desc = desc;
        this.active = active;
    }
}