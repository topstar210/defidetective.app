export const myFunctions = {
    filterNav: (items, role) => {
        let realItems = [];
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if (element.role && role !== 'success') continue;
            realItems.push(element);
        }
        return realItems;
    },

    AdsAry: (advertises, type) => {
        let ads_roi = {
            level_1:[],
            level_2:[],
            level_3:[]
        };
        let ads_token = {
            level_1:[],
            level_2:[],
            level_3:[]
        };
        for (let i = 0; i < advertises.length; i++) {
            if (!advertises[i]['kind']) {
                ads_roi[`level_${advertises[i]['level']}`].push({
                    img: advertises[i]['image'],
                    link: advertises[i]['link']
                })
            } else {
                ads_token[`level_${advertises[i]['level']}`].push({
                    img: advertises[i]['image'],
                    link: advertises[i]['link']
                })
            }
        }
        if(type === "R"){
            return ads_roi;
        } else return ads_token;
    }
}