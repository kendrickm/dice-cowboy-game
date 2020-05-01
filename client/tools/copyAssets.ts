import * as shell from "shelljs";


shell.cp("index.html", "build/")
// Copy all the view templates
shell.cp( "-R", "static", "build/static" );
