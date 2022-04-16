
export function chunkArray (arr: any[], chunkSize = 5): any {
    const arrayChunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        arrayChunks.push(arr.slice(i, i + chunkSize));
    }
    return arrayChunks;
}