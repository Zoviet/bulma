# Sadly IE9+ support for Bulma Framework's Grid system

Bulma is a modern CSS3 Framework uses Flexbox. Unfortunately, some necrophiles has been used IE9-10+, that Bulma "is only partially supported" (https://github.com/jgthms/bulma#browser-support). For my kind, main problem is not a modal dialog or something similar like is discussed - https://github.com/jgthms/bulma/issues/252. It's a tiles and trees of tiles in grid system. Simple solutions like https://github.com/philipwalton/flexbugs#flexbug-3 don't works, especially then tiles tree are deep like: 

is-ancestor>is-parent>is-child>is-child>is-ancestor>is-parent>is-child>is-child>

There is a radical and harsh poor JavaScript solution for this problem based on the .tile's refactoring to the simple block elements with dinamical height sizes. It's supported by IE9+ and work well. 

# Start "Magic Tiles" without any magic with only depressive JS code

Clone a repository,include iefix.js in you project and enjoy :) 
Browser checking included in script, there is no extra checking needed.

Please use a strict tile tree (https://bulma.io/documentation/layout/tiles/#how-it-works-nesting) ancestor>parent>child.

Don't use with iefix anyone CSS hacks like this: 

body {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 1 */
}

It's needed for browser checking. 


