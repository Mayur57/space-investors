/**
 * Space Investors
 *
 * @summary
 * A mildly amusing remake of the iconic arcade game
 * Space Invaders but with a topical twist. Written in
 * pure HTML/CSS/JavaScript.
 *
 * The website was literally made in a couple of hours as
 * I was bored and may have severe problems. If you find any
 * bugs and/or have a fix for it, consider contributing
 * to the repo.
 *
 * PS: Space Invaders is the best arcade game of all time,
 * this is not a debate, and I will not be entertaining
 * any arguments regarding this.
 *
 * @description
 * JavaScript backend for the game engine and rendering.
 *
 * Draws 15x15 grid and updates the grid divs according to
 * the suitable logic
 *
 * ! You are allowed to use and reference this code as long
 * ! as you provide proper attribution to the author
 *
 * @author Mayur Bhoi (Mayur57 on GitHub)
 *
 * @since 27 June 2021
 *
 * @license MIT
 *
 * */

function encrypt(
  message = "",
  key = ""
) {
  var message = CryptoJS.AES.encrypt(message, key);
  return message.toString();
}

function decrypt(
  message = "",
  key = ""
) {
  var code = CryptoJS.AES.decrypt(message, key);
  var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

  return decryptedMessage;
}

/// WORKAROUND AND A VERY VERY BAD PRACTICE DON'T FUCKING DO IT
 var token = decrypt(
   "U2FsdGVkX19fN5oZ9Vii4zW2XDFueWWbmU8ggttujjJOmRhFzMMa5SmWJ2e2bkHjohTF1NhjlPgMSpyonj1K3w==",
   "shut98128382the8923fuckup"
 );

/**
 * @params  none    None
 * @returns integer Number of commits made in the repository
 */
async function getVersion() {

  const headers = {
    Authorization: `Token ${token}`,
  };

  const owner = "Mayur57";
  const repo = "space-investors";
  let page = 1;
  let commits = 0;
  let lengthFlag = 99;

  do {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?page=${page}&per_page=100`;

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    const result = await response.json();

    commits = commits + result.length;
    lengthFlag = result.length;
    page++;
  } while (lengthFlag != 0);

  return commits;
}

/**
 * @params  none  None
 * @returns Date  Concatenated substring of the date latest commit was made
 */
async function getUpdateDate() {
  const headers = {
    Authorization: `Token ${token}`,
  };
  const owner = "Mayur57";
  const repo = "space-investors";

  const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`;

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  const result = await response.json();

  var date = result[0].commit.author.date;
  console.log(date)
  return date;
}

/**
 * @params  none        None
 * @returns HTML-string Inserts footer info
 */
async function makeFooter() {
  var version = await getVersion();
  var update = await getUpdateDate();
  var subVersion = update.substring(9,19).replaceAll(":", "").substring(2);

  var date = new Date(update);
  const month = date.toLocaleString("default", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  update = month;

  var footer = `
      <p class="copyright">&#169; 2021 Mayur Bhoi</p>
      <p class="versions">Version: 0.${version}-${subVersion} <br> Updated: ${update}</p>
  `;

  document.getElementById("footer").innerHTML = footer;
  document.getElementById("footer").className = "footer";
}

window.onload = function () {
  makeFooter();
};
