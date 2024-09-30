import axios from "axios";
import cheerio from "cheerio";
import 'dotenv/config';

const URLBase = process.env.URLBase;
const notebookFilter = process.env.notebookFilter;

async function getURLsToVisit(url) {
    const pageHTML = await axios.get(url);

    const $ = cheerio.load(pageHTML.data);

    var paginationURLsToVisit = [];

    var paginationURL = '';

    var maxPages = 0;
    $(".page-link").each((index, element) => {
        if(element.name == 'a'){
            paginationURL = $(element).attr("href");
            const pageNumber = Number(paginationURL.substring(paginationURL.indexOf("=") + 1));
            maxPages = pageNumber > maxPages ? pageNumber : maxPages ;
        }
    });

    paginationURLsToVisit.push(url);
    for(var count = 2; count <= maxPages; count++){
        paginationURLsToVisit.push(url + '?page=' + count);
    }

    // paginationURLsToVisit = [... new Set(paginationURLsToVisit)];

    return paginationURLsToVisit;
};

async function getProducts(URLsToVisit){
    var notebooks = [];

    var nameNotebook = '';

    for(const url of URLsToVisit){
        var pageHTML = await axios.get(url);

        var $ = cheerio.load(pageHTML.data);

        $("a.title").each((index, element) => {
            nameNotebook = ($(element).attr("title")).toLowerCase();
            if(nameNotebook.includes(notebookFilter))
                notebooks.push(nameNotebook);
        });
    }

    return notebooks;
};

export async function getNotebooks(){
    const URLsToVisit = await getURLsToVisit(URLBase);
    const products = await getProducts(URLsToVisit);
    console.log(products);
    return products;
};

// connect();

// getNotebooks();
//     .then(() => {
//         process.exit(0);
//     })
//     .catch((e) => {
//         // logging the error message
//         console.error(e);

//         process.exit(1);
//     });
