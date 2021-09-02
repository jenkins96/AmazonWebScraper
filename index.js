const request = require("request-promise");
const cheerio = require("cheerio");
const { last } = require("cheerio/lib/api/traversing");
const URL =
  "https://www.amazon.com/SteelSeries-Apex-RGB-Gaming-Keyboard/dp/B07ZGDPT4M/ref=sr_1_3?dchild=1&keywords=gaming+keyboard&pd_rd_r=85a5f0c7-58db-402b-940d-7881901258cb&pd_rd_w=Y2xIC&pd_rd_wg=SlTx1&pf_rd_p=5811f97a-f703-4231-aa5f-c344167bfe13&pf_rd_r=Q1M7KZQMNN2DZDG8RXA2&qid=1630447861&sr=8-3";

(async () => {
  const res = await request({
    url: URL,
    headers: {
      Host: "www.amazon.com",
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Cache-Control": "max-age=0",
    },
    gzip: true,
  });
  let $ = cheerio.load(res);
  let productName = $("#productTitle").text().trim();
  let price = $("#priceblock_ourprice").text();
  let imageLink = $("#landingImage").attr("src");
  let aboutInfo = $("#productDescription p").text().trim();
  let breadCrumbs = $("#wayfinding-breadcrumbs_feature_div").text().replace(/\n/g, '').split("›").map(elem => elem.trim());
   
  console.log(`The product name is: ${ productName }`);
  console.log(`This is the price of the product: ${ price }`);
  console.log(`Image link: ${ imageLink }`);
  console.log(`Product Info: ${ aboutInfo }`);
  console.log(breadCrumbs);

})();
