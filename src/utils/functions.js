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
            level_1: [],
            level_2: [],
            level_3: []
        };
        let ads_token = {
            level_1: [],
            level_2: [],
            level_3: []
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
        if (type === "R") {
            return ads_roi;
        } else return ads_token;
    },

    sortData: (data, column, sflag) => {
        data.sort((a, b) => {
            if (column === "tvl") {
                if (sflag) return a[column].substring(1) * 1 - b[column].substring(1) * 1;
                else return b[column].substring(1) * 1 - a[column].substring(1) * 1;
            } else if (column === "website") {
                // console.log(a[column]['props']['children'])
                const nameA = a[column]['props']['children'].toUpperCase(); // ignore upper and lowercase
                const nameB = b[column]['props']['children'].toUpperCase(); // ignore upper and lowercase
                if(sflag){
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                } else {
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                }
                return 0;
            }
        });

        let level_1 = [];
        let level_2 = [];
        let level_3 = [];
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            element['_props']['className'] = element['_props']['className'].replace("split-row-1", "");
            element['_props']['className'] = element['_props']['className'].replace("split-row-2", "");
            element['_props']['className'] = element['_props']['className'].replace("split-row-3", "");

            if (element['_props']['className'].indexOf("level_1") > -1) level_1.push(element);
            else if (element['_props']['className'].indexOf("level_2") > -1) level_2.push(element);
            else level_3.push(element);
        }
        level_1[level_1.length - 1]['_props']['className'] += "split-row-1";
        level_2[level_2.length - 1]['_props']['className'] += "split-row-2";
        return [
            ...level_1,
            ...level_2,
            ...level_3
        ];
    }
}