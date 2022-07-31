class request {

    static async GetFromGithub(procces){

        let adress = "https://api.github.com/users/"+procces;

        async function Get(url) {
            
            let procces = await fetch(url);
                procces = await procces.json();
                return procces;
            }
        
        const res = await Get(adress);
        return res;
    }

}