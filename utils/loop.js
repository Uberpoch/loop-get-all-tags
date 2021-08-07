import { getTags } from 'call.js';
exports.loop = async function(token){
    let url = 'https://v2.api.uberflip.com/tags?limit=50';
    let array = [];
    let totalPages = 0;
    let page = 0;

    do{
      let res = await getTags(token, url);
      totalPages = res.meta.total_pages;
      page++;
      url = url + `?page=${page}`;
      console.log(`called: page ${page} of ${totalPages}`);
      array = array.concat(res.data);
      console.log(`array length: ${array.length}`);
    } while (page < totalPages);
    
    return array;
}