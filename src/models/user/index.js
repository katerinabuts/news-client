export class User {
    constructor ({name= ``, description=``, id=0, isAdmin=false,email=``,password=``, username=``}) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.isAdmin = isAdmin;
        this.email = email;
        this.password = password;
        this.username = username;
    }
    toJSON() {
        let {name, description, isAdmin, email, password, username, id} = this;
        return {name, description, isAdmin, email, password, username, id};
    }

}