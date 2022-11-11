export const myFunctions = {
    filterNav: (items, role) => {
        let realItems = [];
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if (element.role && role !== 'success') continue;
            realItems.push(element);
        }
        return realItems;
    }
}