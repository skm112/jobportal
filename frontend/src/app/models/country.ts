
export class Country {
    name:string;
    id:number=0;
    _id: string;
    

    copy():Country{
        let obj=new Country();
        obj.name=this.name;
        obj._id=this._id;
        return obj;
    }
    clear(){
        this.name="";
        this.id=0;
    }
}
