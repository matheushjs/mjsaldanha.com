/**
 * This is not a class; just a convenient way for grouping documentation using YUIDoc.
 *
 * This file has javascript related to fetching json files, containing information about our research
 *   and displaying it into the web page.
 *
 * @class Client::elfResearch.js
 */

// Place research projects in the given table (we add a <tbody> to it)
function placeResearch(array, badgeCss, $table){
  var tbody = $("<tbody></tbody>");
  array.forEach(elem => {
    let tr = $("<tr></tr>");

    // Add date to the row
    tr.append(
      $("<th scope='row'></th>")
        .text(elem.beginDate + "-" + elem.endDate)
    );
    
    // Add title + badges to the row
    let td = $("<td></td>");

    // Title
    td.append($("<a></a>").attr("href", elem.href).text(elem.title));
    td.append(" ");

    // Badges
    elem.badges.split(" ").forEach(elem => {
      td.append(
        $("<span class='badge'></span>")
        .text(elem.toUpperCase())
        .css(badgeCss[elem])
      );
      td.append(" ");
    });

    tbody.append(tr.append(td));
  });

  $table.append(tbody);
}

// Place list of badges in the given table
function placeBadges(badgeTitles, badgeCss, $table){
  var tbody = $("<tbody></tbody>");
  
  for(var abbrv in badgeTitles){
    let tr = $("<tr></tr>");
    
    // Add badge to row
    tr.append(
      $("<td></td>").append(
        $("<span class='badge'></span>")
        .text(abbrv.toUpperCase())
        .css(badgeCss[abbrv])
      )
    );

    // Add title of the badge to the row
    tr.append($("<td></td>").text(badgeTitles[abbrv]));
    
    tbody.append(tr);
  }

  $table.append(tbody);
}

/**
 * Lists research projects (and a list of badges) as a table in /sci-projects/.
 * 
 * @param {JQuery} $table Table to which to append the generated <tbody>.
 * @method listResearch
 */
/* exported listResearch */
function listResearch($researchTable, $badgeTable){
  $.ajax({
    url: "/json/research-projs.json",
    type: "GET",
    dataType: "json",
  })
  .done(json => {
    placeResearch(json.research, json.badgeCss, $researchTable);
    placeBadges(json.badgeTitles, json.badgeCss, $badgeTable);
  })
  .fail((xhr, status, err) => {
    console.log("Something went wrong in the server. I am really sorry for that. Please try again later.");
    console.log("Server error: " + err);
  })
  .always(() => console.log("Finished"));
}

export default {
  listResearch
};