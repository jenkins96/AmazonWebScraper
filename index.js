const request = require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");
const { last } = require("cheerio/lib/api/traversing");
const URLS = [
  "https://www.amazon.com/SteelSeries-Apex-RGB-Gaming-Keyboard/dp/B07ZGDPT4M/ref=sr_1_3?dchild=1&keywords=gaming+keyboard&pd_rd_r=85a5f0c7-58db-402b-940d-7881901258cb&pd_rd_w=Y2xIC&pd_rd_wg=SlTx1&pf_rd_p=5811f97a-f703-4231-aa5f-c344167bfe13&pf_rd_r=Q1M7KZQMNN2DZDG8RXA2&qid=1630447861&sr=8-3",
  "https://www.amazon.com/Logitech-Surround-Gaming-Headset-Leatherette/dp/B07MRMHML9/ref=pd_sim_cpf_related_desktop_5/130-1623326-1367638?pd_rd_w=kFSHG&pf_rd_p=f5f88d3f-9df9-48a7-80ac-d60b833190f4&pf_rd_r=CQWAR41BSRMC63N201Z4&pd_rd_r=3ce2ea5f-da62-4e09-a276-7025f71ee6a2&pd_rd_wg=fWacb&pd_rd_i=B07MRMHML9&psc=1"
];

(async () => {
  const itemsData = [];
  for(let item of URLS){

  const res = await request({
    url: item,
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
   
  itemsData.push({
    productName,
    price,
    imageLink,
    aboutInfo,
    breadCrumbs
  })
  
  }
  fs.writeFileSync('./data.json', JSON.stringify(itemsData), 'utf-8');
  console.log(itemsData);

})();
