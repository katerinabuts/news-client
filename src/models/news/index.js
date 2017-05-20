export class News {
    constructor ({title= ``, description=``, id = 0, user_id = 0, created_at= null}) {
        this.title = title;
        this.description = description;
        this.id = id;
        this.user_id = user_id;
        this.created_at = Date(created_at) || Date.now();
    }
    toJSON() {
         let {title, description, id, user_id, created_at} = this;
         return {title, description, id, user_id, created_at};
    }
}