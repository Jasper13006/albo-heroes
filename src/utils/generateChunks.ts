
export const makeChunks = (data:any[] = [], size:number = 10) => {
    const chunks = [];
    while (data.length) {
      const len = data.length;
      const next = len > size ? size : len;
      chunks.push(data.splice(0, next));
    }
    return chunks;
  };
  