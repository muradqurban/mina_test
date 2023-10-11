const groupedData = (data,group,select) => {
     return data.reduce((acc, value) => {
        let key = value[group];
        if (!acc[key]) {
            acc[key] = [];
        }
        select === "id" ?  acc[key].push(value.id) : acc[key].push(value.len)
        return acc;
        }, {});
} 

export const firstChart = (data) => {
    const total = data.length
    const group = "status"

    const firstGroup = groupedData(data,group,"id")

    const reduce = Object.keys(firstGroup).map((key) => {
    const a = firstGroup[key];
    const sum = a.reduce((acc, id) => acc + 1, 0);
    return { status: key, sum };
    });


    const result = Object.keys(reduce).map((key) => {
        const a = reduce[key]
        const status = a.status
        const sum = a.sum
        const perc = (a.sum/total * 100).toFixed(2) + "%"
        const info = `${status} (${perc})`
        return {status:info, sum}
    })
    return result;
}

export const secondChart = (data) => {
    const group = "status"

    const firstGroup = groupedData(data,group,"len")
    
    const reduce = Object.keys(firstGroup).map((key) => {
        const a = firstGroup[key];
        const sum = a.reduce((acc, len) => acc + len, 0).toFixed(2);
        return { status: key, sum };
        });

        return reduce

}