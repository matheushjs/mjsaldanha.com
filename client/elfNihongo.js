
const gDefaultText = "After a short period of waiting, as though a curse had been lifted, my freedom of movement returned. I quietly slid out of the bed, and without making a sound opened the door. By the moonlight shining in from the window, I made my way down the corridor. The season was well into summer, but the wood floor was still sticky and cold under my bare feet. Very soon, just a little more. My parents' bedroom was just past the bend in the corridor. While facing down its opponent with a sharp glint in its eye so as to render him unable to move, it simultaneously approached at a calm pace, projecting a complete lack of hostility by the sound from its throat. Humans who simultaneously received these contradictory messages, become unable to quickly determine how best to react. This Technique that the ImpureCats make use of when hunting people was called a 'Double Bind' (two fold restriction).* He would go as far as running away over that kind of thing?";

function fillTextarea($elem, defaultText){
  const key = $elem.attr("id");

  // Check if storage is filled, if default text is given.
  if(defaultText && localStorage.getItem(key) != null){
    $elem.val(defaultText);
  }

  const value = localStorage.getItem(key);
  if(value != null){
    $elem.val(value);
  }
}

function updateStorage($elem){
  const key = $elem.attr("id");
  localStorage.setItem(key, $elem.val());
}

$(document).ready(() => {
  var pasteArea = $("#input-paste-area");
  var writeArea = $("#input-write-area");

  fillTextarea(pasteArea, gDefaultText);
  fillTextarea(writeArea);

  pasteArea.on("paste keypress", () => {
    updateStorage($("#input-paste-area"));
    return true;
  });

  writeArea.on("paste keypress", () => {
    updateStorage($("#input-write-area"));
    return true;
  });
});