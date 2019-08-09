/**
 * This is not a class; just a convenient way for grouping documentation using YUIDoc.
 *
 * This file has javascript related to fetching json files, containing information about our research
 *   and displaying it into the web page.
 *
 * @class Client::elfResearch.js
 */

import htmlEscape from "escape-html";

// Place research projects in the given table (we add a <tbody> to it)
function placeResearch(array, badgeCss, $table){
  const template = "" +
  "<tr>" +
  "  <th scope='row'>YEAR</th>" +
  "  <td class='js-select'><a href='LINK'>TITLE</a></td>" +
  "</tr>";

  array.forEach(elem => {
    let html = template
    .replace("YEAR", elem.beginDate + "-" + elem.endDate)
    .replace("LINK", elem.href)
    .replace("TITLE", htmlEscape(elem.title));

    let row = $(html);
    let td = row.find(".js-select");

    const otherCss = {
      "background-color": "red"
    };

    td.append(" ");
    elem.badges.split(" ").forEach(badge => {
      td.append(
        $("<span class='badge'></span>")
        .text(badge.toUpperCase())
        .css(badgeCss[badge] || otherCss)
      );
      td.append(" ");
    });

    $table.append(row);
  });
}

// Place list of badges in the given table
function placeBadges(badgeTitles, badgeCss, $table){
  const template = "" +
  "<tr>" +
  "   <td>"  +
  "     <span class='badge'>BADGE</span>" +
  "   </td>" +
  "   <td>TITLE</td>" +
  "</tr>";

  for(var abbrv in badgeTitles){
    let row = template
    .replace("BADGE", abbrv.toUpperCase())
    .replace("TITLE", htmlEscape(badgeTitles[abbrv]));

    const otherCss = {
      "background": "red"
    };

    let $elem = $(row);
    $elem.find(".badge").css(badgeCss[abbrv] || otherCss);

    $table.append($elem);
  }
}

/** Returns the content of the given JSON. On error, throws an object containing (xhr, status, err).
 *
 * @param {String} url The url of the JSON to get.
 * @return {Object} The content of the given JSON file.
 * @method jsonResearchProjs
 */
async function getJSON(url){
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
    })
    .done(json => resolve(json))
    .fail((xhr, status, err) => reject({
      xhr,
      status,
      err
    }));
  });
}

/**
 * Lists research projects (and a list of badges) as a table in /sci-projects/.
 *
 * @param {JQuery} $researchTable Table to which to append the generated <tbody> with research projects.
 * @param {JQuery} $badgeTable Table to which to append the badge list.
 * @param {JQuery} $spinnerBox Container to hide after we are finished fetching things from the server. We also add error messages here.
 * @method listResearch
 */
async function listResearch($researchTable, $badgeTable, $spinnerBox){
  var json;
  try {
    json = await getJSON("/json/research-projs.json");
  } catch(obj) {
    $spinnerBox.append("<p>Something went wrong in the server. I am really sorry for that. Please try again later.</p>");
    $spinnerBox.append("<p>Server error: " + obj.err + "</p>");
    return;
  }

  placeResearch(json.research, json.badgeCss, $researchTable);
  placeBadges(json.badgeTitles, json.badgeCss, $badgeTable);
  $spinnerBox.remove();
}

function placeArticles(array, $articleTable){
  let template = "" +
    "<tr>" +
    "  <th scope=\"row\">YEAR</th>" +
    "  <td>CONFERENCE</td>" +
    "  <td><a href=\"LINK\">TITLE</a><br><i>REFERENCE</i></td>" +
    "</tr>";

  array.forEach(elem => {
    let row = template
    .replace("YEAR", elem.year)
    .replace("CONFERENCE", htmlEscape(elem.publishedAt))
    .replace("TITLE", htmlEscape(elem.title))
    .replace("LINK", elem.href)
    .replace("REFERENCE", htmlEscape(elem.harvardRef));
    $articleTable.append($(row));
  });
}

/**
 * Places list of articles in a table in /articles/.
 *
 * @param {JQuery} $articleTable Table to which to add rows with the article data.
 * @param {JQuery} $spinnerBox Element containing the spinner showing 'loading...'
 * @method listArticles
 */
async function listArticles($articleTable, $spinnerBox){
  var json;
  try {
    json = await getJSON("/json/sci-articles.json");
  } catch(obj) {
    $spinnerBox.append("<p>Something went wrong in the server. I am really sorry for that. Please try again later.</p>");
    $spinnerBox.append("<p>Server error: " + obj.err + "</p>");
    return;
  }

  placeArticles(json, $articleTable);
  $spinnerBox.remove();
}

/**
 * Fills the research kanban in index page /.
 *
 */
async function fillResearchKanban($anchors){
  var projs;
  var articles;

  try {
    projs = await getJSON("/json/research-projs.json");
    projs = projs.research;
    articles = await getJSON("/json/sci-articles.json");
  } catch(obj) {
    console.error(obj);
    return;
  }

  var cutTitle = title => {
    if(title.length > 50)
      return title.slice(0, 47) + "...";
    return title;
  };

  var toggleSwitch = true;
  $anchors.each((idx, elem) => {
    let anchor = $(elem);

    if(toggleSwitch){
      let proj = projs.shift();
      anchor.append(
        $("<p>project</p><h4>TEXT</h4>"
        .replace("TEXT", cutTitle(proj.title))
        )
      );
      anchor.attr("href", proj.href);
    } else {
      let article = articles.shift();
      anchor.append(
        $("<p>article</p><h4>TEXT</h4>"
        .replace("TEXT", cutTitle(article.title))
        )
      );
      anchor.attr("href", article.href);
    }

    toggleSwitch = !toggleSwitch;
  });
}

export default {
  getJSON,
  listResearch,
  listArticles,
  fillResearchKanban
};
