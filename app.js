var md = require( "markdown" ).markdown;
var Upndown = require("upndown");
var und = new Upndown();
var fs = require("fs");
var yargs = require("yargs").argv;

if(yargs.day < 1000) yargs.day = "0" + yargs.day;

var text = fs.readFileSync("../SNU/3-2/"+yargs.class+"/"+yargs.day+".md", "utf8");
var out = fs.readFileSync("../SNU/3-2/Homeworks.md", "utf8");

var tree = md.parse( text );
var out_tree = md.parse(out);

var j=0;
var len = out_tree.length;
for(; j < len; ++j){
    if(out_tree[j][2] === yargs.class){
        for(var k=len+1; k > j+1; --k){
            out_tree[k] = out_tree[k-2];
        }
        break;
    }
}
    
for(var i=0; i < tree.length; ++i){
    if(tree[i][2] === "Homework"){
        out_tree[j+1] = tree[i+1];
        out_tree[j+2] = tree[i+2];
    }
}

var te = md.renderJsonML( md.toHTMLTree(out_tree) );
und.convert(te, function(err, mark){
    if(err) console.log(err);
    else fs.writeFile('../SNU/3-2/Homeworks.md', mark, function(er){
        if(err) console.log(er);    
    });
});