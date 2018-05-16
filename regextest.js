//var linkParser = /\bhttps?+\S*+\b/
var linkParser = /\bhttps?\S*/

console.log(linkParser);
console.log(linkParser.exec("Hey I reeally like doggogs  cause they"))