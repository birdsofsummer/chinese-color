const init_loading=()=>{
    let target= document.querySelector('.loading')
    var spinner = new Spin.Spinner().spin();
    target.appendChild(spinner.el);
    return (stop="")=> stop ? spinner.stop() : spinner.spin(target)
}
const loading=init_loading()
const log=console.log
const say=x=>y=>console.log(x,y)

const get=async (u="/",d={})=>{
    loading()
    let r=await superagent
            .get(u)
            .query(d)
            .type("json")
            .catch(e=>{
                console.log('eeee',e)
                loading("stop")
            })
    loading("stop")
    r.data=JSON.parse(r.text)
    return r
}
const post=async(u,d={})=>{
    loading()
    let r=await superagent
            .post(u)
            .send(d)
            .type("json")
            .catch(e=>{
                console.log('eeee',e)
                loading("stop")
            })

    loading("stop")
    r.data=JSON.parse(r.text)
    return r
}


const send_msg=(d={})=>post("/msg",d)

const init_color=async ()=>Promise.all([
    "/json/color.json",
    "/json/color1.json",
    '/json/color2.json',
    '/json/color3.json'
].map(get))

const store=(k,v)=>{
    if (k && v){
        return localforage.setItem(k,v)
    }else if (k){
        return localforage.getItem(k)
    }else{
        localforage.iterate(console.log)
        return localforage.keys()
    }
}

export {
    get,
    post,
    send_msg,
    init_color,
    loading,
    store,
    //router,
}


