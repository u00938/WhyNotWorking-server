const axios = require('axios');
const cheerio = require('cheerio');
const { Tag } = require('./dist/models/Tag');

function getTagData (url) {
    axios.get(url).then(res => {
      const $ = cheerio.load(res.data);
      const $tagData = $('#mainbar');
      try {
        Tag.create({
          tagName: $tagData.find("h1").text().replace("Questions tagged ", "").replace("[", "").replace("]", ""),
          detail: $tagData.find("p").text()
        })
      } catch (error) {
        console.log(error.message)
      }
    })
  }
  
  for(let i = 0; i< 7; i++) {
    axios.get(`https://stackoverflow.com/tags?page=${i}&tab=popular`).then(res => {
      const $ = cheerio.load(res.data);
      const $tagList = $('#tags_list').find('#tags-browser').children('div.s-card');
      $tagList.each(function () {
        getTagData('https://stackoverflow.com' + $(this).find('a:eq(0)').attr('href'))
      })
    }).catch(err => {console.log(err.message)});
  }


