import * as shell from "shelljs";


shell.cp("index.html", "build/")
shell.cp("build/static/index.js", "build/index.js")
// Copy all the view templates
// shell.cp( "-R", "static", "build/static" );
