// === Command Setup ===
// "Emulating" /bin/
builtin = {
  "clear": {"exec": cmd_clear, "desc": "Clears the console."},
  "echo": {"exec": cmd_echo, "desc": "Prints the content provided to it"},
  "help": {"exec": cmd_help, "desc": "Shows this help message"},
  "vmsh": {"exec": cmd_vmsh, "desc": "Runs the command in VM Shell"},
//  "man": {"exec": cmd_man, "desc": "Returns detailed information on a specific command"},
  "info": {"exec": cmd_info, "desc": "Provides information about the software. Type `info -h` for more options"},
  "export": {"exec": cmd_export, "desc": "Reads and writes environment variables"},
  "pwd": {"exec": cmd_pwd, "desc": "Prints the working directory"},
  "display": {"exec": cmd_display, "desc": "Connect to a virtual display"},
  "color": {"exec": cmd_color, "desc": "Change color"}
//  "cd": {"exec": cmd_cd, "desc": "Changes the directory"}
}

// "Emulating" /usr/bin/
usr_bin = {
  "todo": {"exec": cmd_todo, "desc": "Prints the TODO List for BrowserLinux", "ver": "0.1"},
  "eval": {"exec": cmd_eval, "desc": "Evaluates a JS expression", "ver": "0.1"},
  "whoami": {"exec": cmd_whoami, "desc": "Print the current user", "ver": "0.1"},
  "search": {"exec": cmd_search, "desc": "Search the internet", "ver": "0.1"},
  "reload": {"exec": cmd_reload, "desc": "Reload the browser window", "ver": "0.1"},
  "open": {"exec": cmd_open, "desc": "Open a webpage", "ver": "0.1"},
  "curl": {"exec": cmd_curl, "desc": "CURL", "ver": "0.1"},
  "blpm": {"exec": cmd_blpm, "desc": "BrowserLinux Package Manager", "ver": "0.1"}
}





// === Environment Variables ===
env = {
  "USERDIR": "/home/user/",
  "DIR": "/home/user/",
  "USERNAME": "user"
}

// === Background Functions ===
// Function to parse terminal commands.
function parse(command) {
  // Splits commands between the "&&" operator
  andcmds = command.split("&&");
  for (andcmd in andcmds) {
    // Separates commands that have pipes. Returns a single list item if there is no pipe
    pipecmds = andcmds[andcmd].trim().split("|");
    o = "";
    for (pipecmd in pipecmds) {
      // Get and clean up command
      fullcommand = pipecmds[pipecmd].trim().split(" ");
      cmd = fullcommand.shift()

      // Runs commands if in /bin/ or /usr/bin/ and returns an error if not
      if (cmd == "") {}
      else if (cmd in builtin) {
        o = builtin[cmd].exec(fullcommand.join(" ")+o);
      } else if (cmd in usr_bin) {
        o = usr_bin[cmd].exec(fullcommand.join(" ")+o);
      } else {
        print(color("vmsh: <strong>"+cmd.split("<br>").join(" ")+"</strong>: command not found", "red"), true);
        return "";
      }
    }
    print(o);
  }
  return "";
}


// Function that prints to the terminal
function print(output, html=false) {
  // Ignores empty stings
  if(!(output=="" || output=="<br>" || output=="\n" || output==undefined)){
    // Prints to the terminal after replacing all fake newlines with real newlines
    cmdprompt.innerHTML += "<br>" + output.split("\n").join("<br>").split("\\n").join("<br>").split("\\t").join("<div class='tab'></div>");
  }
}



// === Commands ===
// "echo" command to print a string
function cmd_echo(args) {
  return args;
}

// Clears the terminal
function cmd_clear(args) {
  cmdprompt.innerHTML = "";
}

// Prints a help message
function cmd_help(args) {
  // Checks arguments
  if (args == "--usr") {
    // Prints /usr/bin/ commands
    text = color("Showing the following "+color(Object.keys(usr_bin).length, "yellow")+" user commands:<br>--------", "green");
    for (x in usr_bin) {
      text += "<br>" + color(x, "yellow") + tab() + tab() + usr_bin[x].desc;
    }
  } else {
    // Prints /bin/ commands
    text = color("Showing the following "+color(Object.keys(builtin).length, "yellow")+" builtin commands:<br>--------", "green");
    for (x in builtin) {
      text += "<br>" + color(x, "yellow") + tab() + tab() + builtin[x].desc;
    }
    text += "<br>" + color("--------", "green") + "<br>" + color("Type `help --usr` to view all", "green") + " " + color(Object.keys(usr_bin).length, "yellow") + " " + color("user commands.", "green")
  }
  return text;
}

/* disabled `man`
function cmd_man(args) {
  return "There are currently no manpages. Check later."
}
*/

// Pseudo-`bash` command `vmsh`
function cmd_vmsh(args) {
  parse(args);
}

// Command with info about BrowserLinux project
function cmd_info(args) {
  if (args == ""){
    // Prints information about the projectf
    return color("BrowserLinux is a free and open source project aiming to get a linux environment into the standard user's browser. It is licensed under the GPLv3 license. The git repository is located at https://github.com/Froggo8311/BrowserLinux", "blue");
  } else if (args == "--contributors") {
    // Prints contributors
    return color("Currently the only contributor is Froggo. How about you help out!<br>Type `info --gh` to go to the github page.", "orange");
  } else if (args == "--gh") {
    // Opens the GitHub
    window.open("https://github.com/Froggo8311/BrowserLinux", "_blank");
  } else if (args == "--help" || args == "-h") {
    // Prints arguments
    return color("-h --help", "yellow")+tab()+tab()+"Displays this help message.\n"+color("--contributors", "yellow")+ tab() + tab() +"Lists the contributors\n"+color("--gh", "yellow") + tab() + tab() + "Opens the GitHub page in a new tab.";
  } else {
    // Returns error for unknown argument
    return color("info has no command '"+bold(args)+"'. Type `info --help` for help on this command.", "red");
  }
}

// Command for reading and writing to environment variables
function cmd_export(args) {
  // Checks arguments
  if(args=="") {
    // Prints environment variables
    text = "";
    for(envvar in env) {
      text += color(envvar, "yellow") + " = " + color(env[envvar], "orange") + "<br>";
    }
    return text.substring(0, text.length-4).trim();
  } else if (args.includes("-u") || args.includes("--unset")) {
    // unset environment variable
  } else if (args == "-h" || args == "--help") {
    // Prints help message
    return color("export [variable]=[value]", "yellow") + tab() + tab() + "Sets an environment variable`export [variable]` Returns the value of an environment variable<br>`export` Returns all variables and values<br><br>-h --help Displays this help message"
  } else if (args.includes("=")) {
    // Sets an environment variable
    statement = args.split("=");
    env[statement[0].toUpperCase().trim()] = statement[1].trim();
    return statement[0].toUpperCase().trim() + " = " + statement[1].trim();
  } else {
    // Prints a specific environment variable
    return env[args.toUpperCase().trim()];
  }
}

// Prints a todo list for the BrowserLinux project. Could be moved to `info --todo`.
function cmd_todo(args) {
  return "TODO List:<br>- Add env var fetch using `$VARIABLE`<br>- Add useful environment variables<br>- Make pipes less buggy when using `vmsh` as it is a problem instigator<br>- Fix `cd` command<br>- Add `wget`/`curl` command<br>- Maybe add python/c compiler (!!)";
}

// Reloads the BrowserLinux webpage
function cmd_reload(args) {
  location.reload();
}

// Prints the working directory
function cmd_pwd(args) {
  return env["DIR"];
}

// Changes the working directory
function cmd_cd(args) {
  if(args == "" || args == "~") {
    env["DIR"] = env["USERDIR"];
  } else if (args[0] == "/") {
    env["DIR"] = args;
  } else if (args[0] == "~") {
    env["DIR"] = env["USERDIR"] + args.substring(1);
  } else if (args == "..") {
    dirlist = env["DIR"].substring(0,-1).split("/");
    dirlist.pop();
    env["DIR"] = dirlist.join("/");
  } else if (args == ".") {
  } else {
    env["DIR"] += "/" + args;
  }

  if (env["DIR"].substring(-1)!="/") {env["DIR"]+="/"}
}

// A virtual display. Not an immediate concern, but could potentially be a feature later on.
function cmd_display(args) {
  if (args == "") {
    return "This command closes this terminal and opens a graphical display. " + color("The graphical display currently does nothing.", "orange") + "<br>" + color("Use `display --yes` to switch to the graphical display.", "yellow");
  } else if (args == "--yes" || args == "-y") {
    return color("Not yet implemented.", "yellow");
  } else if (args == "-h" || args == "--help") {
    return "`-h` `--help`"+tab()+"Shows this help message<br>`--yes` `-y`"+tab()+"Opens the graphical display";
  } else {
    return color("display has no command '"+args+"'. Type `display --help` for help on this command.", "red");
  }
}

/* Disabled `cmdset`
function cmd_cmdset(args) {
  if (args == "" || args == "-h" || args == "--help") {
    return "USAGE: `cmdset [ENVVAR] as [command name] as [description]`";
  } else if (args.includes(" as ")) {
    kw = args.split(" as ");
    constructed = {
      "exec": function(args) { cmd_vmsh(env[kw[1].trim().toUpperCase()]); },
      "desc": kw[2].trim()
    }
    usr_bin[kw[0].trim()] = constructed;
    delete(env[kw[1].trim()]);
    return kw[1].trim().toUpperCase() + ": "+ kw[2].trim();
  }
}
*/

// Search the internet with DuckDuckGo in the user's browser
function cmd_search(args) {
  window.open("https://duckduckgo.com/?q="+args, "_blank");
}

// Evaluates a javascript expression. Can be used for math
function cmd_eval(args) {
  if (args != "") {
    try {
      return color(Function('"use strict"; return (' + String(args) + ')')(), "yellow");
    } catch (err) {
      return color("eval: "+err, "red");
    }
  } else {
    
  }
}

// Prints the current user's name
function cmd_whoami(args) {
  return env["USERNAME"];
}

// Opens a webpage in the user's browser
function cmd_open(args){
  window.open(args, "_blank")
}

// Changes the color of input text in the terminal
function cmd_color(args) {
  consolecolor=args;
}

// A work-in-progress function to fetch the content of a webpage using a GET request
function cmd_curl(args) {
  var req = new XMLHttpRequest();
  req.open("GET", args);
  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 0 || (req.status >= 200 && req.status < 400)) {
        print(req.responseText);
      } else {
        return print(color("curl: ", "red"));
      }
    }
  }
}

// BrowserLinux Package Manager
function cmd_blpm(args) {
  arglist = args.split(" ");
  blpmcmd = arglist.shift();
  if (blpmcmd == "install") {
    return "nope :/";
  } else if (blpmcmd == "remove" || blpmcmd == "purge") {
    for (i in arglist) {
      if (arglist[i] in usr_bin) {
        print("Removing "+arglist[i]+"...");
        delete(usr_bin[arglist[i]]);
        print("Done.");
      } else {
        return "blpm: could not find package '"+arglist[i]+"'";
      }
    }
    return "Finished removing packages.";
  } else if (blpmcmd == "list") {
    for (i in usr_bin) {
      print(color(i, "yellow")+tab()+"v"+usr_bin[i].ver);
    }
  } else if (args == "--help" || args == "-h") {
    return color("-h --help", "yellow") + tab() + tab() + "Shows this help message\n" + color("install [packages]", "yellow") + tab() + tab() + "Installs a package\n" + color("remove [packages]", "yellow") + tab() + tab() + "Uninstalls a package\n" + color("purge [packages]", "yellow") + tab() + tab() + "Uninstalls a package";
  } else {
    return color("blpm has no command '"+bold(blpmcmd)+"'. Type `blpm --help` for help on this command.", "red");
  }
}