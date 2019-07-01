export default {
    filters:{
        date(v){
            var time = new Date(v);
            var timeStr = time.getFullYear()+"-"+
                (time.getMonth()+1).toString().padStart(2,"0")+"-"+
                time.getDate().toString().padStart(2,"0")+ " "+
                time.getHours().toString().padStart(2,"0")+":"+
                time.getMinutes().toString().padStart(2,"0")+":"+
                time.getSeconds().toString().padStart(2,"0");
            return timeStr;
        },
        currency(v,n=2){
            return "￥"+Number(v).toFixed(n);
        },
        img(v) {
            return "/ele/" + v;
        },
        isHot(v) {
            return v === "true" ? "是" : "否";
        },
        isTop(v) {
            return v === "true" ? "是" : "否";
        }

    },
    install(Vue){
        for(let key in this.filters){
            Vue.filter(key,this.filters[key])
        }
    }

}
